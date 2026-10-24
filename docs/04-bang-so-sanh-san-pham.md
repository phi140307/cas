# Bảng so sánh sản phẩm Cas

| Sản phẩm | Use case | Dữ liệu/sự kiện trọng tâm | Rủi ro trọng tâm |
| --- | --- | --- | --- |
| Auto Debit | Gia hạn định kỳ | Lệnh trích nợ, webhook `autoDebit` | Retry tạo lệnh, ủy quyền khách |
| Balance Hook | Phản ứng biến động số dư | Webhook giao dịch | Replay, thứ tự event |
| Deeplink | Mở app ngân hàng để thanh toán | URL deep link | App hỗ trợ autofill khác nhau |
| eKYC | Lấy định danh đã xác thực | Dữ liệu cá nhân, token ngắn hạn | Quyền riêng tư, thời hạn 5 phút |
| IDKit | Tra cứu doanh nghiệp/thuế | Mã số doanh nghiệp | Mục đích sử dụng dữ liệu |
| Invoice Hub | Lập hóa đơn điện tử | Invoice request/status | Tuân thủ hóa đơn/thuế |
| Pay Out | Chuyển tiền | Lệnh chuyển | Idempotency và phê duyệt |
| Payment Initiation | Lập lệnh chi | Lệnh/phê duyệt | Tách quyền lập và duyệt |
| QR Pay | Nhận tiền theo đơn | QR, VA theo đơn, `referenceNumber` | Webhook settlement |
| Transactions | Lịch sử tài khoản | Dòng giao dịch | Bảo mật dữ liệu tài chính |
| TVAN | Gửi dữ liệu hóa đơn | Thông điệp TVAN | Trạng thái cơ quan thuế |
| Virtual Account | VA định danh cố định | `virtualAccountNumber` | Cấu trúc VA theo FI service |

Sản phẩm nào tạo/chuyển tiền đều cần idempotency ở tầng ứng dụng. Product skill không thay thế việc thiết kế ledger, phân quyền nội bộ và audit log của ứng dụng.
