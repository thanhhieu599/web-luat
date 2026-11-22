export type Lawyer = {
  slug: string;
  name: string;
  title: string;
  position: string;
  photo?: string;
  phone: string;
  email: string;
  summary: string;
  bio: string[];
  areas: string[];
  work?: string[];
  cases?: string[];
  services: string[];
};

export const LAWYERS: Lawyer[] = [
  {
    slug: "pham-duc-huy",
    name: "Phạm Đức Huy",
    title: "Thạc sĩ – Luật sư",
    position: "Giám đốc",
    photo: "/images/luat-su/pham-duc-huy.webp",
    phone: "0977761893",
    email: "luatsuphamduchuy@gmail.com",
    summary:
      "Hơn 10 năm trực tiếp tư vấn, đại diện và tranh tụng tại Tòa án trong các vụ án dân sự, hình sự, kinh doanh thương mại và hôn nhân gia đình.",
    bio: [
      "Luật sư Phạm Đức Huy tốt nghiệp cử nhân Khoa Luật Quốc tế – Trường Đại học Luật TP.HCM, Thạc sĩ Luật Dân sự và Tố tụng Dân sự tại Trường Đại học Sài Gòn. Hiện là Giám đốc Công ty Luật TNHH Viên Minh, thành viên Đoàn Luật sư TP. Hồ Chí Minh.",
      "Luật sư thường xuyên tham gia các vụ án thuộc nhóm tội kinh tế, tham nhũng, chức vụ (đưa, nhận, môi giới hối lộ; lợi dụng, lạm dụng chức vụ quyền hạn; vi phạm quy định về quản lý, sử dụng vốn đầu tư công; vi phạm đấu thầu; giả mạo trong công tác), ma túy và các tội xâm phạm sở hữu.",
    ],
    areas: ["Hình sự", "Dân sự", "Kinh doanh thương mại", "Hôn nhân & Gia đình"],
    work: [
      "Bào chữa, bảo vệ quyền lợi cho người bị tố giác, bị kiến nghị khởi tố, bị can, bị cáo và bị hại trong vụ án hình sự.",
      "Tư vấn tranh chấp quyền sử dụng đất, hợp đồng chuyển nhượng, đặt cọc, mua bán nhà ở, vay tài sản, thuê nhà.",
      "Giải quyết ly hôn thuận tình, đơn phương, có yếu tố nước ngoài; tranh chấp tài sản và quyền nuôi con.",
      "Khai nhận, phân chia di sản thừa kế, lập di chúc.",
      "Giải quyết tranh chấp kinh doanh thương mại, tư vấn quản trị doanh nghiệp.",
    ],
    cases: ["van-thinh-phat-scb", "cuc-dang-kiem", "canh-sat-bien-bien-phong"],
    services: ["luat-su-hinh-su", "luat-su-hon-nhan-gia-dinh", "luat-su-dan-su", "luat-su-tranh-tung"],
  },
  {
    slug: "nguyen-van-sang",
    name: "Nguyễn Văn Sáng",
    title: "Luật sư",
    position: "Cố vấn chuyên môn",
    photo: "/images/luat-su/nguyen-van-sang.webp",
    phone: "0977761893",
    email: "luatvienminh@gmail.com",
    summary:
      "Nguyên Giảng viên Học viện An ninh, nguyên Trưởng phòng Thực hành quyền công tố và Kiểm sát điều tra – Viện kiểm sát nhân dân TP. Hồ Chí Minh.",
    bio: [
      "Luật sư Nguyễn Văn Sáng nguyên là Giảng viên Học viện An ninh; Trưởng phòng Thực hành quyền công tố và kiểm sát điều tra, kiểm sát xét xử sơ thẩm án trật tự xã hội – Viện kiểm sát nhân dân TP. Hồ Chí Minh; Viện trưởng Viện kiểm sát nhân dân quận Tân Phú.",
      "Luật sư có chuyên môn sâu và nhiều kinh nghiệm tư vấn trong giai đoạn bị tố giác, kiến nghị khởi tố, khi cơ quan tiến hành tố tụng triệu tập làm việc, cũng như trong quá trình điều tra, truy tố, xét xử.",
    ],
    areas: ["Hình sự", "Tố tụng hình sự"],
    services: ["luat-su-hinh-su", "luat-su-tranh-tung"],
  },
  {
    slug: "nguyen-van-hien",
    name: "Nguyễn Văn Hiên",
    title: "Thạc sĩ – Luật sư",
    position: "Luật sư thành viên",
    photo: "/images/luat-su/nguyen-van-hien.webp",
    phone: "0903389189",
    email: "luatvienminh@gmail.com",
    summary: "Nhiều năm kinh nghiệm tranh tụng, tư vấn và giải quyết tranh chấp tại Tòa án các cấp.",
    bio: [
      "Thạc sĩ – Luật sư Nguyễn Văn Hiên tốt nghiệp Trường Đại học Luật TP.HCM, là Luật sư thành viên của Công ty Luật TNHH Viên Minh, Đoàn Luật sư TP. Hồ Chí Minh.",
      "Luật sư có nhiều năm kinh nghiệm trong tranh tụng, tư vấn và giải quyết tranh chấp dân sự, đất đai và kinh doanh thương mại.",
    ],
    areas: ["Tranh tụng", "Dân sự", "Đất đai"],
    services: ["luat-su-tranh-tung", "luat-su-dan-su", "luat-su-nha-dat"],
  },
  {
    slug: "nguyen-thi-hong-huong",
    name: "Nguyễn Thị Hồng Hương",
    title: "Luật sư",
    position: "Luật sư thành viên",
    photo: "/images/luat-su/nguyen-thi-hong-huong.webp",
    phone: "0906600631",
    email: "luatvienminh@gmail.com",
    summary: "Kinh nghiệm tranh tụng và tư vấn về hình sự, dân sự, kinh doanh thương mại và lao động.",
    bio: [
      "Luật sư Nguyễn Thị Hồng Hương là Luật sư thành viên của Công ty Luật TNHH Viên Minh.",
      "Luật sư có nhiều kinh nghiệm tranh tụng và tư vấn trong các lĩnh vực hình sự, dân sự, kinh doanh thương mại và lao động.",
    ],
    areas: ["Hình sự", "Dân sự", "Lao động", "Kinh doanh thương mại"],
    services: ["luat-su-hinh-su", "luat-su-dan-su", "luat-su-doanh-nghiep"],
  },
  {
    slug: "le-tien-dung",
    name: "Lê Tiến Dụng",
    title: "Luật sư",
    position: "Luật sư thành viên",
    photo: "/images/luat-su/le-tien-dung.webp",
    phone: "0989203511",
    email: "luatvienminh@gmail.com",
    summary: "Hơn 8 năm tư vấn và tranh tụng các vụ án đất đai, hôn nhân gia đình và thừa kế.",
    bio: [
      "Luật sư Lê Tiến Dụng tốt nghiệp Trường Đại học Luật TP.HCM, là Luật sư thành viên Công ty Luật TNHH Viên Minh, Đoàn Luật sư TP. Hồ Chí Minh.",
      "Với hơn 8 năm kinh nghiệm tư vấn và tranh tụng, Luật sư đã tham gia bảo vệ quyền lợi khách hàng trong nhiều vụ án về đất đai, hôn nhân gia đình và thừa kế.",
    ],
    areas: ["Đất đai", "Hôn nhân & Gia đình", "Thừa kế"],
    services: ["luat-su-nha-dat", "luat-su-hon-nhan-gia-dinh", "luat-su-dan-su"],
  },
  {
    slug: "le-ngoc-tra-my",
    name: "Lê Ngọc Trà My",
    title: "Luật sư",
    position: "Luật sư thành viên",
    photo: "/images/luat-su/le-ngoc-tra-my.webp",
    phone: "0977761893",
    email: "luatvienminh@gmail.com",
    summary: "Tư vấn hôn nhân gia đình, quốc tịch và các vụ việc có yếu tố nước ngoài.",
    bio: [
      "Luật sư Lê Ngọc Trà My là Luật sư thành viên của Công ty Luật TNHH Viên Minh, phụ trách nhiều bài phân tích pháp lý về ly hôn, quyền nuôi con, quốc tịch và hộ tịch có yếu tố nước ngoài trên website của công ty.",
    ],
    areas: ["Hôn nhân & Gia đình", "Quốc tịch", "Yếu tố nước ngoài"],
    services: ["luat-su-hon-nhan-gia-dinh"],
  },
  {
    slug: "vu-thi-trang",
    name: "Vũ Thị Trang",
    title: "Luật sư",
    position: "Luật sư thành viên",
    phone: "0967873475",
    email: "luatvienminh@gmail.com",
    summary: "Kinh nghiệm chuyên sâu về đấu thầu, đấu giá, đất đai, xây dựng, y tế và giáo dục.",
    bio: [
      "Luật sư Vũ Thị Trang tốt nghiệp Trường Đại học Luật TP.HCM, là Luật sư thành viên của Công ty Luật TNHH Viên Minh.",
      "Luật sư có nhiều năm công tác tại cơ quan báo chí của Viện kiểm sát nhân dân tối cao, có kinh nghiệm chuyên sâu trong các lĩnh vực quản lý nhà nước như đấu thầu, đấu giá, đất đai, xây dựng, y tế, giáo dục.",
    ],
    areas: ["Đấu thầu", "Đất đai", "Xây dựng"],
    services: ["luat-su-nha-dat", "luat-su-doanh-nghiep"],
  },
];

export const lawyerBySlug = (slug: string) => LAWYERS.find((l) => l.slug === slug);
