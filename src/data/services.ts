export type Service = {
  slug: string;
  name: string;
  short: string;
  image: string;
  icon: "scale" | "home" | "family" | "briefcase" | "doc" | "gavel";
  headline: string;
  intro: string;
  when: { t: string; d: string }[];
  items: { t: string; d: string }[];
  fees?: { label: string; value: string }[];
  feeNote: string;
  faqs: { q: string; a: string }[];
  lawyers: string[];
  articleCategory: string;
  legacy: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "luat-su-hinh-su",
    name: "Luật sư hình sự",
    short: "Tư vấn, bào chữa và bảo vệ quyền lợi hợp pháp trong các vụ án hình sự.",
    image: "/images/site/svc1.webp",
    icon: "scale",
    headline: "Luật sư hình sự – bào chữa và bảo vệ quyền lợi",
    intro:
      "Từ khi bị triệu tập lấy lời khai đến khi xét xử, mỗi lời khai và tài liệu đều ảnh hưởng đến kết quả vụ án. Luật sư Viên Minh tham gia ngay từ giai đoạn đầu để bạn hiểu rõ quyền, nghĩa vụ và có phương án bào chữa phù hợp.",
    when: [
      { t: "Bị triệu tập làm việc", d: "Khi bị tố giác hoặc kiến nghị khởi tố, cơ quan điều tra mời lên lấy lời khai để xác minh." },
      { t: "Bị khởi tố, điều tra, truy tố, xét xử", d: "Chỉ luật sư mới được sao chụp toàn bộ hồ sơ vụ án sau khi kết thúc điều tra." },
      { t: "Là bị hại trong vụ án", d: "Cần người bảo vệ quyền lợi, yêu cầu bồi thường và theo dõi tiến trình tố tụng." },
    ],
    items: [
      { t: "Bào chữa cho bị can, bị cáo", d: "Nghiên cứu hồ sơ, thu thập chứng cứ, tranh luận tại phiên tòa sơ thẩm và phúc thẩm." },
      { t: "Tư vấn khi bị tố giác, triệu tập", d: "Hướng dẫn cách làm việc với cơ quan điều tra, chuẩn bị lời khai và tài liệu." },
      { t: "Bảo vệ quyền lợi bị hại", d: "Làm đơn tố giác, yêu cầu khởi tố, đòi bồi thường thiệt hại." },
      { t: "Tội phạm kinh tế, tham nhũng, chức vụ", d: "Hối lộ, lạm dụng chức vụ, vi phạm đấu thầu, vốn đầu tư công, giả mạo trong công tác." },
      { t: "Ma túy, xâm phạm sở hữu, tính mạng, sức khỏe", d: "Mua bán, tàng trữ, vận chuyển trái phép; lừa đảo; cố ý gây thương tích." },
      { t: "Thi hành án, xóa án tích, giảm án", d: "Tư vấn thời hiệu, điều kiện miễn, giảm thời hạn chấp hành hình phạt." },
    ],
    feeNote:
      "Phí luật sư được báo trước bằng văn bản sau buổi tư vấn đầu tiên, tùy giai đoạn tố tụng và tính chất vụ án. Không phát sinh chi phí ngoài thỏa thuận.",
    faqs: [
      { q: "Khi bị công an mời lên làm việc có cần luật sư không?", a: "Nên có. Nội dung buổi làm việc là căn cứ quan trọng để quyết định có khởi tố hay không. Luật sư giúp bạn hiểu quyền im lặng, quyền được đọc lại biên bản và cách cung cấp tài liệu." },
      { q: "Luật sư được tham gia từ giai đoạn nào?", a: "Từ khi người bị buộc tội bị bắt, tạm giữ hoặc khởi tố, luật sư có thể đăng ký bào chữa. Ở giai đoạn bị tố giác, luật sư tham gia với tư cách người bảo vệ quyền lợi." },
      { q: "Gia đình có được gặp bị can đang bị tạm giam không?", a: "Việc thăm gặp do cơ quan đang thụ lý vụ án quyết định. Luật sư bào chữa được gặp bị can theo quy định và là cầu nối trao đổi với gia đình." },
    ],
    lawyers: ["pham-duc-huy", "nguyen-van-sang", "nguyen-thi-hong-huong"],
    articleCategory: "hinh-su",
    legacy: ["/dich_vu/luat_su_hinh_su"],
  },
  {
    slug: "luat-su-hon-nhan-gia-dinh",
    name: "Luật sư hôn nhân, gia đình",
    short: "Ly hôn, quyền nuôi con, chia tài sản và tranh chấp trong gia đình.",
    image: "/images/site/svc3.webp",
    icon: "family",
    headline: "Luật sư hôn nhân và gia đình",
    intro:
      "Ly hôn là việc chấm dứt quan hệ vợ chồng theo bản án, quyết định của Tòa án. Luật sư giúp bạn chọn đúng hình thức, chuẩn bị hồ sơ và bảo vệ quyền lợi của bạn và con cái trong suốt quá trình, kể cả khi một bên ở nước ngoài.",
    when: [
      { t: "Vợ chồng đã thống nhất ly hôn", d: "Cần soạn thỏa thuận về tài sản, con chung và nộp hồ sơ đúng Tòa án có thẩm quyền." },
      { t: "Một bên không đồng ý ly hôn", d: "Cần chứng cứ về tình trạng hôn nhân trầm trọng để Tòa án chấp nhận yêu cầu." },
      { t: "Tranh chấp con cái, tài sản", d: "Xác định ai được nuôi con, mức cấp dưỡng, tài sản chung và tài sản riêng." },
    ],
    items: [
      { t: "Ly hôn thuận tình", d: "Soạn đơn, thỏa thuận tài sản và con chung, đại diện làm việc với Tòa án." },
      { t: "Ly hôn đơn phương", d: "Thu thập chứng cứ, xác định thẩm quyền Tòa án, tham gia tố tụng đến khi có bản án." },
      { t: "Quyền nuôi con và cấp dưỡng", d: "Chứng minh điều kiện nuôi con, yêu cầu mức cấp dưỡng và quyền thăm nom." },
      { t: "Chia tài sản chung, xác lập tài sản riêng", d: "Xác định nguồn gốc tài sản, định giá, phân chia theo pháp luật." },
      { t: "Ly hôn có yếu tố nước ngoài", d: "Vợ hoặc chồng ở nước ngoài, giấy tờ cần hợp pháp hóa lãnh sự, ủy thác tư pháp." },
      { t: "Kết hôn, nhận con nuôi, quốc tịch cho con", d: "Thủ tục hộ tịch, xác định cha mẹ con, lựa chọn quốc tịch." },
    ],
    fees: [
      { label: "Ly hôn thuận tình", value: "5 – 25 triệu đồng" },
      { label: "Ly hôn đơn phương", value: "15 – 30 triệu đồng" },
      { label: "Ly hôn với người nước ngoài", value: "30 – 50 triệu đồng" },
    ],
    feeNote:
      "Mức phí tham khảo cho gói trọn gói, thay đổi theo tài sản tranh chấp và yêu cầu đi kèm. Phí được thống nhất bằng văn bản trước khi làm việc.",
    faqs: [
      { q: "Ly hôn đơn phương mất bao lâu?", a: "Thông thường 4 – 6 tháng cho cấp sơ thẩm, có thể lâu hơn nếu phải định giá tài sản, xác minh nơi cư trú hoặc có kháng cáo." },
      { q: "Mất giấy đăng ký kết hôn có ly hôn được không?", a: "Được. Bạn có thể xin trích lục kết hôn tại nơi đã đăng ký hoặc đề nghị Tòa án thu thập khi bên kia đang giữ giấy." },
      { q: "Con dưới 36 tháng tuổi ai được quyền nuôi?", a: "Con dưới 36 tháng tuổi được giao cho mẹ trực tiếp nuôi, trừ khi người mẹ không đủ điều kiện hoặc cha mẹ có thỏa thuận khác phù hợp với lợi ích của con." },
    ],
    lawyers: ["pham-duc-huy", "le-ngoc-tra-my", "le-tien-dung"],
    articleCategory: "hon-nhan-gia-dinh",
    legacy: ["/dich_vu/luat_su_hon_nhan_va_gia_dinh", "/dich_vu/luat_su_ly_hon"],
  },
  {
    slug: "luat-su-nha-dat",
    name: "Luật sư nhà, đất",
    short: "Mua bán, chuyển nhượng, thừa kế và tranh chấp quyền sử dụng đất.",
    image: "/images/site/svc2.webp",
    icon: "home",
    headline: "Luật sư nhà đất – giao dịch an toàn, tranh chấp rõ ràng",
    intro:
      "Nhà đất thường là tài sản lớn nhất của mỗi gia đình. Luật sư rà soát pháp lý trước khi bạn đặt cọc, ký hợp đồng và đại diện giải quyết tranh chấp tại Ủy ban nhân dân hoặc Tòa án.",
    when: [
      { t: "Trước khi đặt cọc, mua bán", d: "Kiểm tra quy hoạch, tình trạng thế chấp, tranh chấp và tính hợp pháp của giấy tờ." },
      { t: "Bị từ chối cấp sổ, sang tên", d: "Hồ sơ bị trả lại, hàng xóm không ký giáp ranh, đất chưa đủ điều kiện." },
      { t: "Tranh chấp ranh giới, lối đi, thừa kế", d: "Cần hòa giải tại cơ sở và khởi kiện nếu không thành." },
    ],
    items: [
      { t: "Rà soát pháp lý trước giao dịch", d: "Kiểm tra sổ, quy hoạch, nghĩa vụ tài chính, hợp đồng đặt cọc và chuyển nhượng." },
      { t: "Thủ tục cấp sổ, sang tên, tách thửa", d: "Chuẩn bị hồ sơ, làm việc với văn phòng đăng ký đất đai." },
      { t: "Tranh chấp quyền sử dụng đất", d: "Ranh giới, lối đi, lấn chiếm, hợp đồng chuyển nhượng vô hiệu." },
      { t: "Nhà ở hình thành trong tương lai", d: "Tranh chấp với chủ đầu tư chậm bàn giao, chưa cấp sổ." },
      { t: "Thừa kế nhà đất", d: "Khai nhận, phân chia di sản, lập di chúc, tranh chấp giữa các đồng thừa kế." },
      { t: "Thu hồi, bồi thường, giải tỏa", d: "Khiếu nại quyết định thu hồi, giá bồi thường, tái định cư." },
    ],
    feeNote: "Phí rà soát giao dịch hoặc giải quyết tranh chấp được báo trước theo giá trị tài sản và phạm vi công việc.",
    faqs: [
      { q: "Đặt cọc mua nhà khi chưa hoàn công có rủi ro gì?", a: "Nhà chưa hoàn công chưa thể sang tên đầy đủ. Hợp đồng đặt cọc cần ghi rõ thời hạn, điều kiện hoàn công và mức phạt cọc để tránh mất tiền." },
      { q: "Hàng xóm không ký giáp ranh có được cấp sổ không?", a: "Vẫn có thể được cấp nếu ranh giới không có tranh chấp và cơ quan đo đạc xác minh được hiện trạng sử dụng ổn định." },
      { q: "Tranh chấp đất có bắt buộc hòa giải không?", a: "Tranh chấp ai có quyền sử dụng đất phải hòa giải tại Ủy ban nhân dân cấp xã trước khi khởi kiện ra Tòa án." },
    ],
    lawyers: ["le-tien-dung", "nguyen-van-hien", "vu-thi-trang"],
    articleCategory: "dat-dai",
    legacy: ["/dich_vu/luat_su_dat_dai"],
  },
  {
    slug: "luat-su-doanh-nghiep",
    name: "Luật sư doanh nghiệp",
    short: "Thành lập, giấy phép, hợp đồng và tranh chấp kinh doanh.",
    image: "/images/site/svc4.webp",
    icon: "briefcase",
    headline: "Luật sư doanh nghiệp và đầu tư",
    intro:
      "Từ khi thành lập đến lúc mở rộng, doanh nghiệp cần một bộ phận pháp chế hiểu hoạt động kinh doanh. Viên Minh lo thủ tục, giấy phép và hợp đồng để bạn tập trung vào công việc chính.",
    when: [
      { t: "Thành lập hoặc thay đổi đăng ký", d: "Vốn điều lệ, người đại diện, thành viên, cổ đông, địa chỉ, ngành nghề." },
      { t: "Nhà đầu tư nước ngoài", d: "Giấy chứng nhận đăng ký đầu tư, góp vốn, mua cổ phần." },
      { t: "Ký hợp đồng giá trị lớn", d: "Rà soát điều khoản thanh toán, phạt vi phạm, giải quyết tranh chấp." },
    ],
    items: [
      { t: "Thành lập doanh nghiệp", d: "Chọn loại hình, soạn điều lệ, đăng ký thành lập và con dấu." },
      { t: "Thay đổi đăng ký kinh doanh", d: "Tăng giảm vốn, đổi người đại diện, chuyển nhượng phần vốn." },
      { t: "Giấy phép con", d: "Vệ sinh an toàn thực phẩm, an ninh trật tự, PCCC, bán lẻ rượu, công bố sản phẩm." },
      { t: "Đầu tư nước ngoài", d: "Giấy chứng nhận đăng ký đầu tư và điều chỉnh dự án." },
      { t: "Sở hữu trí tuệ", d: "Đăng ký bảo hộ nhãn hiệu, xử lý vi phạm." },
      { t: "Hợp đồng và tranh chấp thương mại", d: "Soạn, rà soát hợp đồng; đại diện thương lượng và khởi kiện." },
    ],
    feeNote: "Có gói dịch vụ trọn gói cho thủ tục đăng ký và gói pháp chế thuê ngoài theo tháng cho doanh nghiệp nhỏ.",
    faqs: [
      { q: "Bán hàng online có phải đăng ký kinh doanh không?", a: "Có, trừ một số trường hợp hộ cá nhân kinh doanh nhỏ. Bán trên sàn thương mại điện tử cần thông tin đăng ký để khai báo với sàn." },
      { q: "Thành lập công ty mất bao lâu?", a: "Khoảng 3 – 5 ngày làm việc kể từ khi hồ sơ hợp lệ, chưa tính thời gian khắc dấu và mở tài khoản." },
      { q: "Trước khi ký hợp đồng lớn cần kiểm tra gì?", a: "Tư cách pháp lý của đối tác, thẩm quyền người ký, điều khoản thanh toán, bảo lãnh, phạt vi phạm và cơ quan giải quyết tranh chấp." },
    ],
    lawyers: ["pham-duc-huy", "nguyen-thi-hong-huong", "vu-thi-trang"],
    articleCategory: "doanh-nghiep",
    legacy: ["/dich_vu/luat_su_doanh_nghiep_va_dau_tu", "/dich_vu/dich_vu_doanh_nghiep"],
  },
  {
    slug: "luat-su-dan-su",
    name: "Luật sư dân sự",
    short: "Hợp đồng, thừa kế, di chúc, vay tài sản và bồi thường thiệt hại.",
    image: "/images/site/statue.webp",
    icon: "doc",
    headline: "Luật sư dân sự – hợp đồng, thừa kế và bồi thường",
    intro:
      "Phần lớn tranh chấp dân sự có thể giải quyết sớm nếu giấy tờ chặt chẽ ngay từ đầu. Luật sư Viên Minh soạn thảo, rà soát văn bản và đại diện thương lượng, khởi kiện khi cần.",
    when: [
      { t: "Cho vay, đặt cọc, ủy quyền", d: "Cần hợp đồng rõ ràng để đòi lại tiền khi bên kia vi phạm." },
      { t: "Người thân mất không để lại di chúc", d: "Cần xác định hàng thừa kế và thủ tục khai nhận di sản." },
      { t: "Bị thiệt hại về tài sản, sức khỏe", d: "Yêu cầu bồi thường ngoài hợp đồng." },
    ],
    items: [
      { t: "Tranh chấp hợp đồng", d: "Đặt cọc, mua bán, vay tài sản, thuê nhà, mua bán hàng hóa." },
      { t: "Thừa kế và di chúc", d: "Lập di chúc, khai nhận, phân chia di sản, tranh chấp thừa kế." },
      { t: "Bồi thường thiệt hại", d: "Thiệt hại về tài sản, sức khỏe, danh dự ngoài hợp đồng." },
      { t: "Soạn thảo văn bản", d: "Đơn khởi kiện, di chúc, hợp đồng đặt cọc và các văn bản pháp lý khác." },
      { t: "Công chứng, vi bằng, dịch thuật", d: "Hỗ trợ công chứng, lập vi bằng, sao y, dịch thuật." },
    ],
    feeNote: "Phí soạn thảo văn bản được báo trọn gói. Với vụ kiện, phí tính theo giá trị tranh chấp và giai đoạn tố tụng.",
    faqs: [
      { q: "Cha mẹ mất không để di chúc thì chia thừa kế thế nào?", a: "Di sản được chia đều cho những người thuộc hàng thừa kế thứ nhất: vợ, chồng, cha, mẹ, con của người mất." },
      { q: "Cho vay tiền không có giấy tờ có kiện được không?", a: "Có thể khởi kiện nếu chứng minh được việc giao tiền qua chuyển khoản, tin nhắn, ghi âm hoặc người làm chứng." },
      { q: "Thời hiệu yêu cầu chia di sản là bao lâu?", a: "30 năm với bất động sản và 10 năm với động sản, tính từ thời điểm mở thừa kế." },
    ],
    lawyers: ["pham-duc-huy", "nguyen-van-hien", "le-tien-dung"],
    articleCategory: "dan-su-tranh-chap",
    legacy: ["/dich_vu/luat_su_dan_su", "/dich_vu/to_tung_dan_su"],
  },
  {
    slug: "luat-su-tranh-tung",
    name: "Luật sư tranh tụng",
    short: "Đại diện khởi kiện, tham gia tố tụng và thi hành án tại Tòa án.",
    image: "/images/site/results.webp",
    icon: "gavel",
    headline: "Luật sư tranh tụng tại Tòa án",
    intro:
      "Khi thương lượng không thành, luật sư đại diện bạn từ khâu lập hồ sơ khởi kiện, tham gia phiên hòa giải, xét xử sơ thẩm, phúc thẩm đến khi bản án được thi hành.",
    when: [
      { t: "Muốn khởi kiện", d: "Cần xác định đúng quan hệ tranh chấp, Tòa án có thẩm quyền và chứng cứ." },
      { t: "Bị kiện", d: "Cần soạn văn bản ý kiến, phản tố và tham gia đầy đủ các phiên họp." },
      { t: "Bản án không được thi hành", d: "Cần yêu cầu cơ quan thi hành án và khiếu nại khi bị chậm trễ." },
    ],
    items: [
      { t: "Lập hồ sơ khởi kiện", d: "Đơn khởi kiện, tài liệu chứng cứ, tạm ứng án phí." },
      { t: "Tham gia hòa giải, xét xử", d: "Phiên công khai chứng cứ, hòa giải, sơ thẩm, phúc thẩm." },
      { t: "Kháng cáo, giám đốc thẩm", d: "Đánh giá căn cứ và soạn đơn trong thời hạn luật định." },
      { t: "Thi hành án dân sự", d: "Yêu cầu thi hành, xác minh tài sản, khiếu nại khi chậm trễ." },
      { t: "Trọng tài thương mại", d: "Đại diện tại trung tâm trọng tài cho tranh chấp kinh doanh." },
    ],
    feeNote: "Phí tranh tụng gồm phần cố định theo giai đoạn và có thể kèm phần thưởng theo kết quả, được thỏa thuận trước bằng hợp đồng dịch vụ pháp lý.",
    faqs: [
      { q: "Khởi kiện ở Tòa án nào?", a: "Thường là Tòa án nơi bị đơn cư trú hoặc nơi có bất động sản đang tranh chấp. Từ 01/7/2025, thẩm quyền được xác định theo mô hình Tòa án khu vực." },
      { q: "Có được ghi âm tại phiên tòa không?", a: "Việc ghi âm, ghi hình tại phiên tòa phải được chủ tọa cho phép và tuân theo nội quy phiên tòa." },
      { q: "Thời hạn kháng cáo bản án sơ thẩm là bao lâu?", a: "15 ngày kể từ ngày tuyên án; với đương sự vắng mặt, tính từ ngày nhận hoặc được tống đạt bản án." },
    ],
    lawyers: ["pham-duc-huy", "nguyen-van-hien", "nguyen-van-sang"],
    articleCategory: "dan-su-tranh-chap",
    legacy: ["/dich_vu/luat_su_tranh_tung"],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
