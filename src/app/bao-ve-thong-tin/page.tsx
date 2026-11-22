import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Bảo vệ thông tin cá nhân",
  description: "Chính sách bảo vệ dữ liệu cá nhân của Công ty Luật TNHH Viên Minh khi bạn liên hệ và sử dụng website.",
  alternates: { canonical: "/bao-ve-thong-tin" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Bảo vệ thông tin cá nhân"
      updated="22/11/2026"
      sections={[
        {
          h: "Phạm vi áp dụng",
          p: [
            `Chính sách này giải thích cách ${SITE.name} ("Viên Minh", "chúng tôi") thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi bạn truy cập website ${SITE.url.replace("https://", "")}, gửi yêu cầu tư vấn, gọi điện hoặc nhắn tin cho chúng tôi.`,
            "Chính sách được xây dựng theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và các quy định về bảo mật thông tin của Luật Luật sư.",
          ],
        },
        {
          h: "Thông tin chúng tôi thu thập",
          p: [
            [
              "Thông tin bạn tự cung cấp qua form: họ tên, số điện thoại, email, lĩnh vực cần tư vấn và nội dung vụ việc.",
              "Thông tin kỹ thuật khi truy cập website: loại trình duyệt, thiết bị, trang đã xem, thời gian truy cập, thu thập ẩn danh qua công cụ thống kê.",
            ],
            "Chúng tôi không yêu cầu bạn tạo tài khoản và không thu thập thông tin thẻ thanh toán trên website.",
          ],
        },
        {
          h: "Mục đích sử dụng",
          p: [
            [
              "Liên hệ lại để tư vấn và sắp xếp lịch làm việc theo yêu cầu của bạn.",
              "Đánh giá sơ bộ vụ việc và đề xuất phương án, phí dịch vụ.",
              "Cải thiện nội dung và trải nghiệm của website.",
            ],
            "Chúng tôi không dùng thông tin của bạn để gửi quảng cáo khi chưa được bạn đồng ý, và không bán hay cho thuê dữ liệu cho bên thứ ba.",
          ],
        },
        {
          h: "Bảo mật thông tin vụ việc",
          p: [
            "Mọi thông tin về vụ việc bạn chia sẻ được luật sư giữ bí mật theo nghĩa vụ nghề nghiệp quy định tại Luật Luật sư và Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam, kể cả khi bạn chưa ký hợp đồng dịch vụ.",
          ],
        },
        {
          h: "Chia sẻ thông tin",
          p: [
            "Chúng tôi chỉ chia sẻ dữ liệu trong các trường hợp:",
            [
              "Với nhà cung cấp dịch vụ kỹ thuật (lưu trữ website, gửi email) ở mức cần thiết để vận hành, và họ phải giữ bí mật.",
              "Khi có yêu cầu bằng văn bản của cơ quan nhà nước có thẩm quyền theo quy định pháp luật.",
              "Khi bạn đồng ý cho chúng tôi trao đổi với bên thứ ba vì quyền lợi của bạn trong vụ việc.",
            ],
          ],
        },
        {
          h: "Thời gian lưu trữ",
          p: [
            "Thông tin gửi qua form được lưu trong thời gian cần thiết để tư vấn và theo dõi vụ việc. Nếu không phát sinh hợp đồng dịch vụ, chúng tôi xóa thông tin sau tối đa 24 tháng hoặc sớm hơn khi bạn yêu cầu.",
          ],
        },
        {
          h: "Quyền của bạn",
          p: [
            "Bạn có quyền yêu cầu xem, chỉnh sửa, xóa dữ liệu cá nhân hoặc rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào.",
            `Gửi yêu cầu tới ${SITE.email} hoặc gọi ${SITE.hotlineDisplay}. Chúng tôi phản hồi trong vòng 72 giờ làm việc.`,
          ],
        },
        {
          h: "Cookie và công cụ thống kê",
          p: [
            "Website dùng cookie cần thiết để hoạt động và công cụ thống kê truy cập ẩn danh. Bạn có thể tắt cookie trong cài đặt trình duyệt mà vẫn xem được toàn bộ nội dung.",
          ],
        },
        {
          h: "Liên hệ",
          p: [`${SITE.name} – ${SITE.address}. Điện thoại ${SITE.hotlineDisplay}. Email ${SITE.email}.`],
        },
      ]}
    />
  );
}
