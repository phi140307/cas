# CAS: Tìm hiểu tích hợp Open Banking

> Tài liệu tiếng Việt dễ hiểu về Cas QR Pay, tài khoản ảo theo đơn, webhook và đối soát idempotent.

## Mục tiêu

Repository này là tài liệu học tập và ví dụ kỹ thuật. Repository **không** chứa credential, token, số tài khoản thật, dữ liệu người dùng hay mã nguồn production nguyên khối.

Nghiên cứu tập trung vào câu hỏi: làm thế nào để một hệ thống thương mại số nhận tiền qua chuyển khoản, định danh đúng đơn nạp và cộng số dư đúng một lần khi webhook bị gửi lại?

## Bài tìm hiểu ngắn

Đọc bài giải thích cơ bản: [Tìm hiểu Cas QR Pay](PAPER.vi.md).

## Kết luận ngắn

- `QR Pay` của Cas dùng scope `qrpay`; mỗi lần tạo QR Pay có thể gắn một tài khoản ảo với chính đơn thanh toán đó.
- Khóa nghiệp vụ quan trọng là `referenceNumber`, không phải tên khách hàng hoặc số tiền.
- Số dư chỉ được cập nhật sau webhook `TRANSACTIONS`, không dựa vào thao tác ở giao diện.
- Một settlement cần idempotent, kiểm tra số tiền và khóa giao dịch trước khi cập nhật ví.
- Sandbox và Production là hai môi trường độc lập: base URL, credential, access token và webhook phải tách riêng.

## Đọc theo lộ trình

| Phần | Nội dung |
| --- | --- |
| [Giới thiệu](docs/00-gioi-thieu.md) | Phạm vi, câu hỏi nghiên cứu và phương pháp case study |
| [Bản đồ Cas Skills](docs/01-ban-do-cas-skills.md) | Tổng hợp core và 12 product skill chính thức |
| [Nền tảng lý thuyết](docs/02-nen-tang-ly-thuyet.md) | Open Banking, grant, QR động, VA và event-driven systems |
| [Grant và Cas Link](docs/03-grant-cas-link-access-token.md) | Vòng đời quyền truy cập |
| [So sánh sản phẩm](docs/04-bang-so-sanh-san-pham.md) | Scope, use case, API và rủi ro cho từng sản phẩm |
| [QR Pay và VA theo đơn](docs/05-qr-pay-va-theo-don.md) | Phân tích sâu response, QR và `referenceNumber` |
| [Mô hình triển khai](docs/06-mo-hinh-trien-khai.md) | Kiến trúc QR Pay tổng quát |
| [Webhook và settlement](docs/07-webhook-idempotency.md) | Replay, amount mismatch và transaction state machine |
| [Bảo mật](docs/08-bao-mat-threat-model.md) | Threat model và biện pháp kiểm soát |
| [Sandbox, Production và release](docs/09-sandbox-production-release.md) | Môi trường, checklist và vận hành |
| [Phương pháp test](docs/10-phuong-phap-test.md) | Kịch bản kiểm thử, bằng chứng và giới hạn |
| [Tài liệu tham khảo](docs/references.md) | Liên kết Cas chính thức |

## Code mẫu

Các mẫu dùng TypeScript, native `fetch` và placeholder environment variables:

- [Tạo grant token](examples/grant-token.ts)
- [Đổi public token](examples/exchange-token.ts)
- [Tạo QR Pay và đọc VA theo đơn](examples/create-qr-pay.ts)
- [Webhook idempotent](examples/webhook-handler.ts)
- [Fixture đã redaction](examples/fixtures/)

Không đưa QR thật, số tài khoản thật, `clientId`, `secretKey`, `accessToken`, `grantToken`, `publicToken` hoặc webhook token vào issue, pull request hay commit.

## Giấy phép

- Code mẫu: [MIT](LICENSE).
- Tài liệu, sơ đồ và fixture: [CC BY 4.0](LICENSE-DOCS).

## Tuyên bố

Tài liệu này là nghiên cứu kỹ thuật độc lập, không phải tài liệu chính thức hoặc tuyên bố liên kết với Cas. Khi triển khai, luôn đối chiếu schema mới nhất tại [cas.so](https://cas.so/skills) trước khi code.
