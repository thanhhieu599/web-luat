import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Thỏa thuận dịch vụ",
  description: "Điều khoản sử dụng website và nguyên tắc cung cấp dịch vụ pháp lý của Công ty Luật TNHH Viên Minh.",
  alternates: { canonical: "/thoa-thuan-dich-vu" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Thỏa thuận dịch vụ"
      updated="22/11/2026"
      sections={[
        {
          h: "Chấp nhận điều khoản",
          p: [
            `Khi sử dụng website ${SITE.url.replace("https://", "")}, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.`,
          ],
        },
        {
          h: "Nội dung trên website",
          p: [
            "Bài viết, câu hỏi thường gặp và các thông tin trên website nhằm cung cấp kiến thức pháp luật chung, được cập nhật tại thời điểm đăng.",
            "Nội dung này không thay thế ý kiến tư vấn cho một vụ việc cụ thể. Quy định pháp luật có thể thay đổi; bạn nên trao đổi trực tiếp với luật sư trước khi đưa ra quyết định.",
          ],
        },
        {
          h: "Quan hệ luật sư – khách hàng",
          p: [
            "Việc gửi form, gọi điện hoặc nhận tư vấn sơ bộ chưa làm phát sinh quan hệ dịch vụ pháp lý.",
            "Quan hệ dịch vụ chỉ phát sinh khi hai bên ký Hợp đồng dịch vụ pháp lý, trong đó ghi rõ phạm vi công việc, thời hạn, phí luật sư và phương thức thanh toán.",
          ],
        },
        {
          h: "Phí dịch vụ",
          p: [
            "Mức phí công bố trên website là mức tham khảo. Phí chính thức được thống nhất bằng văn bản trước khi luật sư bắt đầu công việc và không phát sinh ngoài thỏa thuận.",
            "Các khoản án phí, lệ phí, phí công chứng, dịch thuật, đi lại do cơ quan nhà nước hoặc bên thứ ba thu được nêu riêng trong hợp đồng.",
          ],
        },
        {
          h: "Bảo mật",
          p: [
            "Luật sư Viên Minh giữ bí mật thông tin vụ việc theo Luật Luật sư. Cách chúng tôi xử lý dữ liệu cá nhân được trình bày tại trang Bảo vệ thông tin cá nhân.",
          ],
        },
        {
          h: "Sở hữu trí tuệ",
          p: [
            `Nội dung, hình ảnh và nhận diện trên website thuộc quyền sở hữu của ${SITE.name}. Bạn được trích dẫn bài viết với điều kiện ghi rõ nguồn và dẫn link về bài gốc.`,
          ],
        },
        {
          h: "Giới hạn trách nhiệm",
          p: [
            "Chúng tôi nỗ lực để thông tin trên website chính xác, nhưng không chịu trách nhiệm về thiệt hại phát sinh do việc tự áp dụng nội dung bài viết mà không có tư vấn trực tiếp của luật sư.",
            "Website có thể dẫn link đến trang của bên thứ ba; chúng tôi không chịu trách nhiệm về nội dung của các trang đó.",
          ],
        },
        {
          h: "Thay đổi điều khoản",
          p: ["Điều khoản có thể được cập nhật. Ngày cập nhật gần nhất được ghi ở đầu trang."],
        },
        {
          h: "Liên hệ",
          p: [`Mọi thắc mắc về thỏa thuận này, vui lòng liên hệ ${SITE.email} hoặc ${SITE.hotlineDisplay}.`],
        },
      ]}
    />
  );
}
