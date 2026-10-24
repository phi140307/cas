# Bảo mật và threat model

| Threat | Ví dụ | Kiểm soát |
| --- | --- | --- |
| Lộ secret | Bundle client có secret key | `server-only`, env server, secret scanning |
| Callback CSRF | Đổi public token của phiên khác | `state` ngẫu nhiên, HTTP-only cookie, TTL |
| Giả webhook | Request tự tạo cộng tiền | Webhook token hoặc xác thực theo cơ chế Cas cung cấp |
| Replay webhook | Gửi lại event cũ | Provider ID, trạng thái completed, row lock |
| Sai số tiền | Trả ít hơn/khác amount QR | So sánh exact expected amount |
| Nhầm môi trường | Sandbox làm thay đổi wallet thật | Tách env, credential, token, webhook và database policy |
| Grant mất hiệu lực | Đổi mật khẩu ngân hàng | Xử lý grant event, Update Mode |

## Quy tắc công khai tài liệu

Ví dụ chỉ dùng placeholder. Mọi ảnh chụp phải che token, account number, QR, user identifier và request ID nếu có thể liên kết tới hệ thống thật.
