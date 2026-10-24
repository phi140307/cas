# Phương pháp test và đánh giá

## Ma trận kiểm thử QR Pay

| Kịch bản | Kỳ vọng |
| --- | --- |
| Thiếu secret | API trả lỗi cấu hình, không tạo QR giả |
| Tạo QR hợp lệ | Pending deposit và `referenceNumber` được ghi |
| Webhook đúng amount | Balance tăng một lần, transaction completed |
| Webhook sai amount | Không cộng số dư |
| Replay cùng webhook | Trả trạng thái đã xử lý, không cộng lại |
| QR API lỗi | Pending transaction bị đánh dấu failed |
| Refresh client | Trạng thái lấy từ server, không tin local UI |
| Sandbox trên production | Không cho credit ví thật |

## Chỉ số đánh giá đề xuất

- Tỷ lệ request QR thành công.
- Thời gian từ QR creation đến webhook settlement.
- Tỷ lệ webhook replay.
- Số lượng amount mismatch.
- Số giao dịch pending quá SLA.

## Giới hạn

Không dùng số tiền thật hoặc account data thật trong test public. Khả năng trả/hiển thị `virtualAccountNumber` cần được xác minh trên đúng FI service và môi trường của merchant.
