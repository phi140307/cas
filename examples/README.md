# Code mẫu

Các file trong thư mục này minh họa contract Cas bằng TypeScript tối giản. Chúng không chứa secret và không thay thế các kiểm soát production như database transaction, audit log, rate limit hoặc allowlist IP.

## Environment cần có

```env
CAS_ENV=sandbox
CAS_CLIENT_ID=...
CAS_SECRET_KEY=...
CAS_ACCESS_TOKEN=...
CAS_WEBHOOK_TOKEN=...
```

Không commit file `.env`. Dùng bộ biến Production riêng khi gọi `https://production.bankhub.dev`.

## Thứ tự đọc

1. `grant-token.ts`
2. `exchange-token.ts`
3. `create-qr-pay.ts`
4. `webhook-handler.ts`

Các JSON fixture là dữ liệu minh họa đã redaction, không phải response thật của merchant nào.
