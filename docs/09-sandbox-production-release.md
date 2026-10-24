# Sandbox, Production và release

## Không trộn môi trường

| Thành phần | Sandbox | Production |
| --- | --- | --- |
| Base URL | `sandbox.bankhub.dev` | `production.bankhub.dev` |
| Cas Link | `dev.link.bankhub.dev` | `link.bankhub.dev` |
| Credential | Bộ Sandbox | Bộ Production |
| Access token | Token Sandbox | Token Production |
| Webhook | Endpoint test | Endpoint thật |

Một `clientId` Sandbox gọi Production sẽ bị từ chối. Redeploy không thể biến credential Sandbox thành Production credential.

## Evidence-based launch checklist

Trước Production, đối chiếu checklist Cas và ghi bằng chứng theo file/dòng cho từng mục:

- Secret không xuất hiện ở client/source control.
- Scope tối thiểu và access token được bảo vệ.
- QR creation có timeout, error path đánh dấu transaction failed.
- Webhook có xác thực, idempotency và amount validation.
- Grant event và login update được xử lý hoặc ghi rõ chưa áp dụng.
- Migration settlement đã chạy ở database Production.
- Credential Production và webhook Production khác Sandbox.
