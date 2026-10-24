# Demo Lebaphi

Lebaphi là demo ứng dụng cho case study QR Pay. Demo có các khối chức năng sau:

- Trang nạp tiền tạo request deposit và QR động.
- Admin flow liên kết tài khoản nhận tiền qua Cas Link.
- Webhook settlement cập nhật số dư qua transaction database.

Repository public này không sao chép full source Lebaphi. Code mẫu ở `../examples` được tối giản để minh họa protocol và không dùng credential thật.

Khi trình bày demo, nêu rõ môi trường đang dùng (Sandbox hay Production), thời điểm test và trạng thái webhook. Không dùng QR hoặc tài khoản thật trong ảnh public.
