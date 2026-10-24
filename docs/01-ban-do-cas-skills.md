# Bản đồ Cas Skills

Cas cung cấp một core skill (`cas-sdk`) và 12 product skill trong danh mục hiện tại. Nguyên tắc đọc là: đọc core trước, sau đó đọc đúng skill sản phẩm, cuối cùng mở schema `.md` của endpoint trước khi viết code.

| Skill | Mục đích chính | Scope công bố |
| --- | --- | --- |
| `cas-sdk` | Môi trường, headers, grant lifecycle, webhook, lỗi | Core |
| `cas-auto-debit` | Trích nợ tự động | `auto_debit` |
| `cas-balance-hook` | Push biến động số dư | `qrpay`, `virtual_account` |
| `cas-deeplink` | Điều hướng đến app ngân hàng | Không nêu trong skill |
| `cas-ekyc` | Thông tin định danh đã xác thực | `ekyc` |
| `cas-idkit` | Tra cứu doanh nghiệp, ngành nghề, thuế | Không nêu trong skill |
| `cas-invoice-hub` | Lập hóa đơn điện tử | `invoice` |
| `cas-pay-out` | Chuyển tiền | `transfer` |
| `cas-payment-initiation` | Lập lệnh chi có quy trình phê duyệt | `payment_initiation` |
| `cas-qr-pay` | QR động và VA theo đơn | `qrpay` |
| `cas-transactions` | Lịch sử giao dịch | `transaction` |
| `cas-tvan` | Gửi thông điệp hóa đơn tới TVAN | `invoice` |
| `cas-virtual-account` | Tài khoản định danh cố định | `virtual_account` |

## Quy tắc xuyên suốt

- Credential ứng dụng chỉ ở server.
- Scope tối thiểu theo đúng sản phẩm.
- `accessToken` gắn với grant và người dùng/tài khoản liên kết; không đưa xuống browser.
- Ghi `requestId` và `grantId` để tra soát.
- Timeout, retry có backoff cho lỗi tạm thời; không retry mù thao tác có thể tạo giao dịch mới.
- Webhook nhận nhanh, xử lý idempotent và lưu trạng thái grant khi Cas báo revoke/pause/login required.
