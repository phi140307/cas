# Security Policy

## Không đưa lên repository

- `CAS_CLIENT_ID`, `CAS_SECRET_KEY`, `CAS_ACCESS_TOKEN`, `grantToken`, `publicToken`.
- Webhook token, cookie session, API key, QR payload thực tế.
- Số tài khoản, CCCD, số điện thoại, email, transaction ID hoặc dữ liệu giao dịch thật.
- Supabase service role key và database export.

## Báo lỗi bảo mật

Không tạo issue public cho secret bị lộ. Hãy liên hệ riêng với maintainer repository và mô tả tối thiểu để có thể tái hiện vấn đề.

Nếu secret đã bị lộ, cần revoke/rotate ngay tại Cas Console hoặc nhà cung cấp tương ứng trước khi điều tra tiếp.
