# Giới thiệu

## Bối cảnh

Hệ thống bán dịch vụ số cần nạp số dư nhanh, đúng người và không cộng tiền hai lần. Chuyển khoản ngân hàng truyền thống thường dựa vào nội dung chuyển khoản hoặc số tiền đặc biệt; hai cách này dễ gây mơ hồ khi khách nhập sai, thanh toán cùng số tiền hoặc giao dịch đến chậm.

Cas QR Pay cung cấp QR động gắn với một đơn thanh toán. Khi tạo lệnh, merchant gửi `amount`, `description` và `referenceNumber`. Khi thanh toán được xác nhận, webhook giao dịch mang `paymentMeta.referenceNumber` để hệ thống định danh đơn.

## Câu hỏi nghiên cứu

1. QR động và tài khoản ảo theo đơn giảm mơ hồ đối soát như thế nào?
2. Vòng đời grant/Cas Link/access token cần được kiểm soát ra sao?
3. Làm sao webhook lặp hoặc tới sai thứ tự không làm cộng số dư hai lần?
4. Những ranh giới nào phải tồn tại giữa Sandbox và Production?

## Phương pháp

Nghiên cứu dùng phương pháp **design case study**:

1. Tổng hợp API và skill chính thức của Cas.
2. Mô hình hóa luồng QR Pay của một website.
3. Phân tích bất biến dữ liệu của deposit settlement.
4. Xây dựng fixture redaction và test matrix.
5. Ghi lại giới hạn, các giả định và điều kiện cần xác minh theo từng dịch vụ tài chính.

## Phạm vi

Tài liệu triển khai sâu QR Pay. Các sản phẩm Cas khác được tổng hợp ở mức kiến trúc và luồng tích hợp; repository không tuyên bố mọi sản phẩm đã được triển khai trong một website cụ thể.
