# QR Pay và tài khoản ảo theo đơn

## Phân biệt hai khái niệm

| Khái niệm | QR Pay | Virtual Account |
| --- | --- | --- |
| Scope | `qrpay` | `virtual_account` |
| Vòng đời | Theo lệnh/đơn thanh toán | Định danh dài hạn |
| Mục đích | Thanh toán QR động và xác nhận đơn | Quản lý khoản phải thu theo VA |
| Khóa merchant | `referenceNumber` | VA number + mô hình nghiệp vụ |

QR Pay là lựa chọn phù hợp cho nạp số dư theo từng yêu cầu. Tài khoản ảo trong response cần được hiểu theo capability của service ngân hàng đã liên kết; ứng dụng không nên suy đoán rằng mọi FI service sẽ hiển thị một số khác số tài khoản chính theo cùng cách.

## Contract của `POST /qr-pay`

Request gồm:

```json
{
  "amount": 100000,
  "description": "QR_PAY_SAMPLE",
  "referenceNumber": "cas_deposit_<uuid>"
}
```

Response QR Pay chính thức mô tả các trường `bin`, `amount`, `description`, `accountNumber`, `accountName`, `qrCode`, `referenceNumber`, `virtualAccountNumber`.

Ứng dụng nên:

- Lưu `referenceNumber` trước khi gọi Cas.
- Hiển thị `qrCode` cho khách.
- Có thể hiển thị cả `virtualAccountNumber` và `accountNumber` với nhãn khác nhau để hỗ trợ tra soát.
- Không tin giao diện client để quyết định giao dịch hoàn tất.

## Bất biến nghiệp vụ

```text
Một referenceNumber -> tối đa một giao dịch deposit hoàn tất
Một provider transaction ID -> tối đa một lần cộng số dư
paid_amount phải bằng expected_amount
```
