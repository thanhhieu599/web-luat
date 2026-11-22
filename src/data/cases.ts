export type CaseItem = {
  slug: string;
  title: string;
  field: string;
  image?: string;
  charges: string;
  role: string;
  summary: string;
  body: string[];
  lawyers: string[];
};

export const CASES: CaseItem[] = [
  {
    slug: "van-thinh-phat-scb",
    title: "Vụ án Tập đoàn Vạn Thịnh Phát & Ngân hàng SCB",
    field: "Hình sự · Kinh tế, ngân hàng",
    image: "/images/site/case1.webp",
    charges:
      "Tham ô tài sản; vi phạm quy định về hoạt động ngân hàng; lạm dụng tín nhiệm chiếm đoạt tài sản; đưa, nhận hối lộ; thiếu trách nhiệm gây hậu quả nghiêm trọng.",
    role: "Luật sư bào chữa",
    summary:
      "Tham gia bào chữa trong vụ án kinh tế lớn liên quan đến Tập đoàn Vạn Thịnh Phát, Ngân hàng SCB và một số cơ quan, tổ chức.",
    body: [
      "Đây là một trong những vụ án kinh tế có quy mô lớn nhất từ trước đến nay, với nhiều bị cáo và nhiều nhóm hành vi khác nhau.",
      "Luật sư Viên Minh nghiên cứu hồ sơ, đánh giá vai trò và mức độ tham gia của thân chủ, đưa ra các tình tiết giảm nhẹ và quan điểm bào chữa tại phiên tòa.",
    ],
    lawyers: ["pham-duc-huy"],
  },
  {
    slug: "cuc-dang-kiem",
    title: "Vụ án tại Cục Đăng kiểm Việt Nam",
    field: "Hình sự · Tham nhũng, chức vụ",
    image: "/images/site/case2.webp",
    charges: "Đưa, nhận hối lộ; giả mạo trong công tác; làm giả con dấu, tài liệu; lợi dụng chức vụ quyền hạn.",
    role: "Luật sư bào chữa",
    summary: "Bào chữa trong vụ án đưa, nhận hối lộ và giả mạo trong công tác xảy ra tại Cục Đăng kiểm Việt Nam và các trung tâm đăng kiểm.",
    body: [
      "Vụ án liên quan đến nhiều trung tâm đăng kiểm trên cả nước, với các hành vi đưa, nhận hối lộ trong quá trình kiểm định phương tiện.",
      "Luật sư tập trung làm rõ vai trò, động cơ và hoàn cảnh của thân chủ, đề nghị áp dụng chính sách khoan hồng cho người thành khẩn khai báo.",
    ],
    lawyers: ["pham-duc-huy"],
  },
  {
    slug: "canh-sat-bien-bien-phong",
    title: "Vụ án Cảnh sát biển & Biên phòng",
    field: "Hình sự · Chức vụ",
    image: "/images/site/case3.webp",
    charges: "Buôn lậu; nhận hối lộ; tổ chức cho người khác trốn đi nước ngoài; không tố giác tội phạm.",
    role: "Bào chữa cho Thiếu tướng, Tư lệnh Vùng Cảnh sát biển 3",
    summary:
      "Vụ án xảy ra tại TP.HCM và một số tỉnh phía Nam, liên quan đến một số đơn vị thuộc Bộ Tư lệnh Cảnh sát biển và Bộ đội Biên phòng.",
    body: [
      "Luật sư Viên Minh bào chữa cho Thiếu tướng, Tư lệnh Vùng Cảnh sát biển 3 trong vụ án có nhiều bị cáo là cán bộ chỉ huy.",
      "Luật sư phân tích trách nhiệm của từng cấp, quá trình công tác và đóng góp của thân chủ để đề nghị mức án phù hợp.",
    ],
    lawyers: ["pham-duc-huy"],
  },
];

/** Các vụ việc khác đã tham gia (chưa có trang chi tiết) */
export const OTHER_CASES = [
  "Vụ án “Vi phạm quy định về quản lý và sử dụng vốn đầu tư công gây hậu quả nghiêm trọng” tại một số đơn vị ở TP.HCM – bào chữa cho Giám đốc Sở Khoa học và Công nghệ.",
  "Vụ án “Lừa đảo chiếm đoạt tài sản” tại Công ty cổ phần địa ốc Alibaba.",
  "Vụ án “Vi phạm quy định về hoạt động ngân hàng” tại Ngân hàng Agribank.",
  "Vụ án “Giả mạo trong công tác, đưa, nhận hối lộ” tại trung tâm đào tạo lái xe, trường dạy nghề.",
  "Tư vấn cho doanh nghiệp cung cấp thiết bị y tế, thi công công trình điện trong các vụ án vi phạm quy định về đấu thầu.",
  "Các vụ án mua bán, vận chuyển trái phép chất ma túy số lượng lớn do Bộ Công an khởi tố.",
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
