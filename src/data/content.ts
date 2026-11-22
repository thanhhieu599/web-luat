export const CATEGORIES = [
  { slug: "hon-nhan-gia-dinh", name: "Hôn nhân & Gia đình", service: "luat-su-hon-nhan-gia-dinh" },
  { slug: "dat-dai", name: "Đất đai", service: "luat-su-nha-dat" },
  { slug: "hinh-su", name: "Hình sự", service: "luat-su-hinh-su" },
  { slug: "doanh-nghiep", name: "Doanh nghiệp", service: "luat-su-doanh-nghiep" },
  { slug: "dan-su-tranh-chap", name: "Dân sự – Tranh chấp", service: "luat-su-dan-su" },
  { slug: "viet-kieu-yeu-to-nuoc-ngoai", name: "Việt kiều – Yếu tố nước ngoài", service: "luat-su-hon-nhan-gia-dinh" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const STEPS = [
  { t: "Tư vấn ban đầu", d: "Lắng nghe vụ việc, giải đáp quyền và nghĩa vụ của bạn, đánh giá sơ bộ hướng xử lý." },
  { t: "Phân tích hồ sơ", d: "Nghiên cứu chứng cứ, xây dựng phương án và báo phí rõ ràng bằng văn bản." },
  { t: "Triển khai pháp lý", d: "Đại diện làm việc với cơ quan nhà nước, tham gia tố tụng, bảo vệ quyền lợi." },
  { t: "Giải quyết vụ việc", d: "Theo sát đến khi có kết quả, hỗ trợ thi hành và các thủ tục sau cùng." },
];

export const REASONS = [
  "Luôn coi công việc của khách hàng như công việc của mình, làm việc với trách nhiệm cao nhất.",
  "Đội ngũ luật sư giàu kinh nghiệm, nhiều người từng công tác trong ngành kiểm sát, an ninh.",
  "Hiểu rõ quy trình tố tụng, tư vấn chính xác và hiệu quả.",
  "Soạn thảo, kiểm tra văn bản chuyên sâu; đồng hành toàn diện; tận tâm, chính trực.",
];

export const TESTIMONIALS = [
  {
    quote:
      "Trong thời gian làm việc với Luật Viên Minh, tôi đánh giá cao sự tận tâm và chuyên nghiệp của đội ngũ luật sư. Ngay từ buổi tư vấn đầu tiên, luật sư đã phân tích rõ hồ sơ và hướng xử lý.",
    name: "Ông Nguyễn Hoàng Minh",
    matter: "Vụ án hình sự",
  },
];

export const CLIENTS = [
  { name: "Bia Sài Gòn", logo: "/images/khach-hang/bia-sai-gon.png" },
  { name: "FE Credit", logo: "/images/khach-hang/fe-credit.png" },
  { name: "HD Saison", logo: "/images/khach-hang/hd-saison.png" },
  { name: "SHB Finance", logo: "/images/khach-hang/shb-finance.png" },
];

export const FAQS = [
  {
    q: "Luật Viên Minh cung cấp những dịch vụ pháp lý nào?",
    a: "Chúng tôi tư vấn và hỗ trợ pháp lý trong các lĩnh vực hình sự, nhà đất, hôn nhân và gia đình, dân sự, doanh nghiệp và tranh tụng tại Tòa án, tùy theo nhu cầu cụ thể của từng khách hàng.",
  },
  {
    q: "Làm thế nào để đặt lịch tư vấn với luật sư?",
    a: "Bạn có thể gọi hotline 0977 761 893, nhắn Zalo hoặc gửi form trên website. Đội ngũ sẽ tiếp nhận thông tin và hẹn lịch tư vấn trực tiếp hoặc qua điện thoại.",
  },
  {
    q: "Tôi cần chuẩn bị gì trước buổi tư vấn?",
    a: "Bạn nên chuẩn bị giấy tờ, tài liệu liên quan đến vụ việc như hợp đồng, giấy tờ nhà đất, hồ sơ vụ án, văn bản của cơ quan nhà nước và các tin nhắn, chứng cứ trao đổi.",
  },
  {
    q: "Thời gian giải quyết một vụ việc pháp lý là bao lâu?",
    a: "Thời gian phụ thuộc vào tính chất, mức độ phức tạp và thủ tục của từng vụ việc. Sau khi đánh giá hồ sơ, luật sư sẽ báo thời gian dự kiến cho từng giai đoạn.",
  },
  {
    q: "Chi phí dịch vụ pháp lý được tính như thế nào?",
    a: "Chi phí dựa trên tính chất vụ việc, phạm vi công việc, mức độ phức tạp và thời gian cần thiết. Luật Viên Minh trao đổi rõ phạm vi và chi phí bằng văn bản trước khi làm việc.",
  },
  {
    q: "Luật sư có thể đại diện và bảo vệ quyền lợi cho tôi không?",
    a: "Tùy tính chất vụ việc và phạm vi dịch vụ, luật sư có thể tư vấn, đại diện theo ủy quyền hoặc tham gia tố tụng để bảo vệ quyền và lợi ích hợp pháp của bạn theo quy định pháp luật.",
  },
];
