#!/usr/bin/env python3
"""Chuyển bài viết từ website cũ (ePortal/DNN NewsArticles) sang Markdown cho web mới.

Cách dùng:
    python3 scripts/migrate_articles.py <thư mục HTML bài viết> <thư mục HTML chuyên mục>

- Mỗi bài cũ là một file <articleid>.html đã tải về từ luatvienminh.vn.
- Kết quả: content/bai-viet/<slug>.md, ảnh trong public/images/bai-viet/,
  và src/data/redirects.json (đường dẫn cũ -> mới, dùng cho chuyển hướng 301).
"""
import json
import os
import re
import sys
import unicodedata
import urllib.request
from io import BytesIO

from bs4 import BeautifulSoup, NavigableString, Tag
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_MD = os.path.join(ROOT, "content", "bai-viet")
OUT_IMG = os.path.join(ROOT, "public", "images", "bai-viet")
SITE = "https://www.luatvienminh.vn"

CATEGORY_IDS = {
    "5853": "hon-nhan-gia-dinh",
    "5847": "dat-dai",
    "5856": "hinh-su",
    "5855": "doanh-nghiep",
    "5854": "dan-su-tranh-chap",
    "5857": "viet-kieu-yeu-to-nuoc-ngoai",
}
KEYWORDS = {
    "hon-nhan-gia-dinh": ["ly hôn", "kết hôn", "hôn nhân", "nuôi con", "cấp dưỡng", "vợ chồng", "ngoại tình",
                          "mang thai hộ", "con riêng", "tài sản chung", "khai sinh", "gia đình", "đánh ghen", "ly thân"],
    "dat-dai": ["đất", "sổ đỏ", "sổ hồng", "nhà ở", "nhà đất", "bất động sản", "thuê nhà", "xây dựng", "sang tên", "chung cư"],
    "hinh-su": ["hình sự", "tội", "truy cứu", "khởi tố", "tạm giam", "lừa đảo", "ma túy", "bị can", "bị cáo",
                "mất tích", "án treo", "hối lộ", "vụ án"],
    "doanh-nghiep": ["doanh nghiệp", "kinh doanh", "đầu tư", "thuế", "lao động", "cổ phần", "thương mại", "hóa đơn"],
    "dan-su-tranh-chap": ["thừa kế", "di chúc", "di sản", "hợp đồng", "vay", "bồi thường", "dân sự", "ủy quyền",
                          "đặt cọc", "tranh chấp"],
    "viet-kieu-yeu-to-nuoc-ngoai": ["việt kiều", "quốc tịch", "nước ngoài", "định cư"],
}
MONTHS = {"một": 1, "hai": 2, "ba": 3, "tư": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8, "chín": 9,
          "mười": 10, "mười một": 11, "mười hai": 12}
KEEP_CASE = ["Công ty Luật TNHH Viên Minh", "Luật Viên Minh", "Viên Minh", "Việt Nam", "Tòa án", "Toà án",
             "Quốc hội", "Chính phủ", "Bộ luật", "Luật Hôn nhân và gia đình", "Luật Đất đai", "Luật Doanh nghiệp",
             "Luật Quốc tịch", "Luật Hộ tịch", "Hà Nội", "Sài Gòn", "TP.HCM", "TP. HCM", "Hồ Chí Minh",
             "Hàn Quốc", "Nhật Bản", "Hoa Kỳ", "Trung Quốc", "Jeju", "Việt kiều", "Nghị định", "Nghị quyết",
             "Thông tư", "Đại học", "UBND", "TNHH", "CCCD", "CMND", "BLDS", "BLHS", "QSDĐ", "ĐKKD", "SCB",
             "Vạn Thịnh Phát", "Agribank", "Cục Đăng kiểm", "Cảnh sát biển", "II", "III", "IV", "VI"]

ALLOWED = {"p", "br", "strong", "em", "u", "ul", "ol", "li", "h2", "h3", "h4", "table", "thead", "tbody",
           "tr", "td", "th", "a", "img", "blockquote", "sup", "sub"}
RENAME = {"b": "strong", "i": "em", "h1": "h2"}


def nfc(s):
    return unicodedata.normalize("NFC", s or "")


def text(el):
    return re.sub(r"\s+", " ", nfc(el.get_text(" ") if el else "")).replace(" ", " ").strip()


def slugify(s):
    s = unicodedata.normalize("NFD", nfc(s).lower()).replace("đ", "d")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-{2,}", "-", s)
    if len(s) > 90:
        s = s[:90].rsplit("-", 1)[0]
    return s.strip("-")


def sentence_case(t):
    t = nfc(t).strip()
    letters = re.sub(r"[^A-Za-zÀ-ỹ]", "", t)
    if not letters or sum(1 for c in letters if c.isupper()) / len(letters) < 0.8:
        return t
    s = t.lower()
    s = re.sub(r"(^|[.?!:–—]\s+|[\"“(]\s*)(\S)", lambda m: m.group(1) + m.group(2).upper(), s)
    for k in sorted(KEEP_CASE, key=len, reverse=True):
        s = re.sub(r"(?<![A-Za-zÀ-ỹ])" + re.escape(k.lower()) + r"(?![A-Za-zÀ-ỹ])", k, s)
    return s[:1].upper() + s[1:]


def vn_date(s):
    m = re.search(r"(\d{1,2})\s+Tháng\s+([^\d]+?)\s+(\d{4})", nfc(s))
    if not m:
        return None
    mo = MONTHS.get(m.group(2).strip().lower())
    return f"{m.group(3)}-{mo:02d}-{int(m.group(1)):02d}" if mo else None


def guess_category(title, lead):
    s = (title + " " + title + " " + lead).lower()
    s = re.sub(r"công ty luật( tnhh)? viên minh|luật viên minh", " ", s)
    best, score = None, 0
    for k, words in KEYWORDS.items():
        c = sum(s.count(w) for w in words)
        if c > score:
            best, score = k, c
    return best or "dan-su-tranh-chap"


def save_image(src, aid, idx):
    url = src if src.startswith("http") else SITE + ("" if src.startswith("/") else "/") + src
    url = urllib.parse.quote(url, safe=":/?&=%")
    name = f"{aid}-{idx}.webp"
    path = os.path.join(OUT_IMG, name)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=60).read()
            im = Image.open(BytesIO(data))
            im = im.convert("RGB")
            im.thumbnail((1200, 1200))
            im.save(path, "WEBP", quality=78, method=6)
        except Exception as e:  # ảnh lỗi: bỏ qua, giữ nội dung chữ
            print("  ảnh lỗi", url, e)
            return None, None
    with Image.open(path) as im:
        w, h = im.size
    return f"/images/bai-viet/{name}", (w, h)


def clean_node(node, soup):
    """Bỏ style/thẻ thừa, giữ cấu trúc nội dung."""
    for el in list(node.find_all(True)):
        if el.name in ("script", "style", "iframe", "object", "g:plusone"):
            el.decompose()
    for el in list(node.find_all(True)):
        if el.name in RENAME:
            el.name = RENAME[el.name]
        if el.name in ("div",):
            el.name = "p"
        if el.name not in ALLOWED and el.name != "p":
            el.unwrap()
            continue
        keep = {}
        if el.name == "a" and el.get("href"):
            keep["href"] = el["href"]
        if el.name == "img":
            keep = {k: el.get(k) for k in ("src", "alt") if el.get(k)}
        if el.name in ("td", "th"):
            for k in ("colspan", "rowspan"):
                if el.get(k):
                    keep[k] = el[k]
        el.attrs = keep
    # p lồng p -> tách
    for p in list(node.find_all("p")):
        if p.find("p"):
            p.unwrap()


def split_lines(node, soup):
    """Đoạn chứa nhiều dòng ngăn bởi <br> -> mỗi dòng một đoạn."""
    for p in list(node.find_all("p")):
        if not p.find("br"):
            continue
        groups, cur = [], []
        for c in list(p.contents):
            if isinstance(c, Tag) and c.name == "br":
                groups.append(cur)
                cur = []
            else:
                cur.append(c)
        groups.append(cur)
        new = []
        for g in groups:
            np_ = soup.new_tag("p")
            for c in g:
                np_.append(c.extract() if hasattr(c, "extract") else c)
            new.append(np_)
        for np_ in new:
            p.insert_before(np_)
        p.decompose()


def headings(node):
    for p in list(node.find_all("p")):
        t = text(p)
        strongs = p.find_all("strong")
        st = " ".join(text(s) for s in strongs)
        if not t or len(t) > 170 or not strongs or len(st) < len(t) - 2:
            continue
        if re.match(r"^\d+\.\d+", t) or re.match(r"^[a-zđ]\)\s", t):
            p.name = "h3"
        elif re.match(r"^(\d+|[IVX]+)[.)]\s+\S", t):
            p.name = "h2"
        else:
            continue
        p.clear()
        p.append(t)


def tidy(node):
    for p in list(node.find_all(["p", "li", "h2", "h3"])):
        # bỏ khoảng trắng đầu dòng
        for c in p.contents[:1]:
            if isinstance(c, NavigableString):
                c.replace_with(re.sub(r"^[\s ]+", "", str(c)))
        if not text(p) and not p.find("img") and not p.find("table"):
            p.decompose()
    # bỏ khối liên hệ và đoạn giới thiệu cuối bài
    blocks = node.find_all(["p", "h2", "h3"])
    cut = None
    for b in blocks[-14:]:
        t = text(b)
        if re.match(r"^CÔNG TY LUẬT TNHH VIÊN MINH\s*$", t, re.I) or \
           re.match(r"^Công ty Luật TNHH Viên Minh\s+(cung cấp|chuyên|là|với|có|luôn|hiện)", t, re.I):
            cut = b
            break
    if cut is not None:
        for b in [cut] + list(cut.find_all_next(["p", "h2", "h3", "ul", "ol"])):
            t = text(b)
            if b is cut or re.match(r"^(Lầu|Địa chỉ|Trụ sở|Hotline|Điện thoại|ĐT|Website|Email|CÔNG TY)", t, re.I) or \
               re.match(r"^Công ty Luật TNHH Viên Minh", t, re.I):
                b.decompose()


def migrate(html_path, cat_of):
    aid = os.path.basename(html_path).split(".")[0]
    soup = BeautifulSoup(open(html_path, encoding="utf-8", errors="ignore").read(), "html.parser")
    a = soup.select_one("a.articleTitle")
    body = soup.select_one("td.articleTextCell")
    if not a or not body:
        return None
    raw_title = text(a)
    head_p = a.find_parent("p") or a.parent
    meta = text(head_p).replace(raw_title, "")
    date = vn_date(meta) or "2024-01-01"
    lead_el = soup.select_one("span.SubHead")
    lead = text(lead_el)
    href = a.get("href", "")
    old_slug = href.rstrip("/").split("/")[-1]
    slug = slugify(sentence_case(raw_title)) or slugify(old_slug)

    for fb in body.select("img[src*='facebook_button']"):
        fb.decompose()
    author = ""
    for em in body.find_all(["em", "i"])[:4]:
        t = text(em)
        if re.match(r"^(Luật sư|LS\.?|Thạc sĩ|Ths\.?)\s+\S", t) and len(t) < 60:
            author = t
            em.decompose()
            break

    clean_node(body, soup)
    split_lines(body, soup)
    headings(body)
    tidy(body)

    imgs = body.find_all("img")
    cover = None
    for i, im in enumerate(imgs):
        src, size = save_image(im.get("src", ""), aid, i + 1)
        if not src:
            im.decompose()
            continue
        im["src"] = src
        im["alt"] = im.get("alt") or sentence_case(raw_title)
        im["width"], im["height"] = str(size[0]), str(size[1])
        im["loading"] = "lazy"
        if cover is None:
            cover = src
    if cover is None:
        og = soup.find("meta", attrs={"property": "og:image"})
        if og and og.get("content") and "spacer" not in og["content"]:
            src, _ = save_image(og["content"], aid, 0)
            cover = src
    # ảnh đứng một mình trong đoạn -> figure
    for p in body.find_all("p"):
        if p.find("img") and not text(p):
            p.name = "figure"

    html = "".join(str(c) for c in body.contents).strip()
    html = re.sub(r"( |&nbsp;){2,}", " ", html)
    html = re.sub(r"\n{2,}", "\n", html)

    cat = cat_of.get(aid) or guess_category(raw_title, lead)
    fm = {
        "title": sentence_case(raw_title),
        "slug": slug,
        "date": date,
        "category": cat,
        "summary": lead,
        "cover": cover or "",
        "author": author,
        "legacyId": aid,
        "legacyPath": href.replace(SITE, ""),
    }
    with open(os.path.join(OUT_MD, slug + ".md"), "w", encoding="utf-8") as f:
        f.write("---\n")
        for k, v in fm.items():
            f.write(f"{k}: {json.dumps(v, ensure_ascii=False)}\n")
        f.write("---\n")
        f.write(html + "\n")
    return fm


def main():
    art_dir, cat_dir = sys.argv[1], sys.argv[2]
    os.makedirs(OUT_MD, exist_ok=True)
    os.makedirs(OUT_IMG, exist_ok=True)
    cat_of = {}
    for f in sorted(os.listdir(cat_dir)):
        cid = re.match(r"(\d+)", f).group(1)
        s = BeautifulSoup(open(os.path.join(cat_dir, f), encoding="utf-8", errors="ignore").read(), "html.parser")
        for a in s.select("a.articleTitle"):
            m = re.search(r"articleid/(\d+)", a.get("href", ""))
            if m and cid in CATEGORY_IDS:
                cat_of.setdefault(m.group(1), CATEGORY_IDS[cid])
    done, redirects = [], {}
    for f in sorted(os.listdir(art_dir)):
        if not f.endswith(".html"):
            continue
        fm = migrate(os.path.join(art_dir, f), cat_of)
        if not fm:
            print("bỏ qua", f)
            continue
        done.append(fm)
        redirects[fm["legacyId"]] = fm["slug"]
        print(fm["date"], fm["category"], fm["slug"][:70])
    os.makedirs(os.path.join(ROOT, "src", "data"), exist_ok=True)
    with open(os.path.join(ROOT, "src", "data", "redirects.json"), "w", encoding="utf-8") as f:
        json.dump(redirects, f, ensure_ascii=False, indent=1)
    print(len(done), "bài,", sum(1 for d in done if d["legacyId"] in cat_of), "bài có chuyên mục thật")


if __name__ == "__main__":
    import urllib.parse  # noqa: E402
    main()
