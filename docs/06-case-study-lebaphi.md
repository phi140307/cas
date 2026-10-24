# Case study: Lebaphi QR Pay

## Kiến trúc

```mermaid
flowchart LR
  UI[Dashboard Deposit] --> API[POST /api/cas/deposit]
  API --> DB[(Supabase transactions)]
  API --> CAS[POST /qr-pay]
  CAS --> UI
  CAS --> WH[POST /api/webhook/cas]
  WH --> RPC[complete_cas_deposit]
  RPC --> DB
  RPC --> WALLET[users.balance]
```

## Mapping implementation

| Trách nhiệm | Thành phần Lebaphi |
| --- | --- |
| Config, headers, timeout | `lib/cas-qr-pay.ts` |
| Tạo pending deposit và QR | `app/api/cas/deposit/route.ts` |
| Hiển thị QR/VA response | `components/CasPaymentDialog.tsx` |
| Kiểm tra trạng thái giao dịch | `app/api/cas/deposit/verify/route.ts` |
| Nhận webhook | `app/api/webhook/cas/route.ts` |
| Settlement SQL | `supabase/migrations/20260923000000_add_cas_qr_pay.sql` |

## Quy trình deposit

1. User nhập amount hợp lệ.
2. Server xác thực user và ghi transaction `pending` cùng `referenceNumber` ngẫu nhiên.
3. Server gọi Cas QR Pay với amount và reference number.
4. Client chỉ hiển thị QR; chưa thay đổi số dư.
5. Cas gửi webhook giao dịch.
6. RPC khóa transaction, xác minh amount, cập nhật ví và đánh dấu completed.

## Quan sát nghiên cứu

Một QR được tạo thành công không phải bằng chứng tiền đã vào. Webhook hợp lệ, idempotent settlement và database commit mới là bằng chứng thay đổi số dư.
