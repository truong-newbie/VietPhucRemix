# Việt Phục Remix — Design System (`MASTER.md`)

## 1. Visual Direction & Mood
- **Direction:** Editorial Heritage Studio — ấm áp, trang trọng (Giấy Dó + Đỏ Son + Vàng Kim + Chàm Cổ), hiện đại và dễ dùng cho cả Gen Z lẫn gia đình nhiều thế hệ.
- **Typography:** `Be Vietnam Pro` đồng nhất cho mọi màn hình (tối ưu dấu tiếng Việt).
  - Cỡ chữ tối thiểu cho nhãn/badge hiển thị: **`11px`** (`text-[11px]`); nội dung chính: **`12px–14px`** (`text-xs` / `text-sm`). Không dùng `text-[9px]` hay `text-[10px]`.

## 2. Color Tokens (`src/index.css` `@theme`)
| Token | Hex | Vai trò |
|---|---|---|
| `brand-crimson` | `#8B1A1A` | CTA chính, trạng thái đang chọn |
| `brand-crimson-hover` | `#A62626` | Hover CTA chính |
| `brand-gold` | `#C9A227` | Nhấn di sản, huy hiệu, tour |
| `brand-indigo` | `#1D2440` | Tiêu đề đậm, chế độ Gia Đình, Roadmap |
| `brand-jade` | `#1F6F5C` | Đối tác, xác nhận hợp lệ |
| `surface-canvas` | `#F4EFE6` | Nền trang chính |
| `surface-card` | `#FFFFFF` | Nền thẻ/panel/modal |
| `surface-subtle` | `#FAF7F2` | Nền phụ, ô nhập |
| `surface-muted` | `#EFE8DC` | Nền thanh tab/segmented control |
| `border-warm` | `#DECDB8` | Viền chuẩn cho thẻ, nút phụ, input |
| `border-subtle` | `#E8DFD1` | Viền nhẹ lồng bên trong thẻ |
| `ink-primary` | `#2C241D` | Chữ chính |
| `ink-secondary` | `#574C43` | Chữ phụ (đảm bảo tương phản >= 4.5:1) |
| `ink-accent` | `#664422` | Nhãn điều khiển, tab chưa chọn |

## 3. Component Primitives (`@layer components`)
- **Cards:** `.vpr-card` (`rounded-2xl border border-border-warm shadow-sm`), `.vpr-card-subtle` (`rounded-2xl border border-border-subtle shadow-xs`).
- **Buttons:** `.vpr-btn` (`min-h-[38px] rounded-xl text-xs font-bold whitespace-nowrap focus-visible:outline-2`) kết hợp `.vpr-btn-primary`, `.vpr-btn-indigo`, `.vpr-btn-secondary`, `.vpr-btn-gold`.
- **Inputs/Selects:** `.vpr-input` (`min-h-[40px] rounded-xl border-border-warm bg-surface-subtle`).
- **Badges:** `.vpr-badge` (`text-[11px] font-bold rounded-full whitespace-nowrap`).
