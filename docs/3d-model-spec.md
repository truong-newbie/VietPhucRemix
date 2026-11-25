# Quy chuẩn Chuẩn bị Model 3D Cổ Phục (`.glb`) cho Việt Phục Remix

Để hệ thống **Stage3D** nhận diện tự động model 3D thật và đổi màu sắc Ngũ Hành tức thì 0ms giống như bản 2D, các file `.glb` cần tuân thủ quy chuẩn 4 khe vật liệu sau:

## 1. Quy trình đề xuất (AI → Blender → Web)
1. **Dựng phôi nhanh bằng AI Image-to-3D** (Tripo3D / Meshy / Hunyuan3D) từ ảnh chụp cổ phục chuẩn, hoặc dựng trực tiếp bằng Clo3D / Marvelous Designer.
2. **Mở trong Blender** để tách hoặc gán đúng **4 Material Slots** theo tên chuẩn bên dưới.
3. **Giảm lưới (Decimate)**: giữ tổng số tam giác `< 35.000 triangles` để tải nhanh trên mạng 4G di động.
4. **Xuất file `.glb`**: bật nén **Draco** trong Blender (`File → Export → glTF 2.0 (.glb)`), giữ kích thước file `< 2 MB`.
5. Đặt file vào `public/models/<garmentId>.glb` (ví dụ `public/models/nhat-binh.glb`) và thêm `"nhat-binh"` vào mảng `"readyModels"` trong `public/models/manifest.json`.

## 2. Tên Material Slot Bắt Buộc (không phân biệt hoa/thường)

| Tên Material | Thành phần ánh xạ |
|---|---|
| `Mat_Outer` | Thân áo chính & tay áo ngoài |
| `Mat_Bottom` | Quần lụa / Váy lĩnh bên dưới |
| `Mat_Belt` | Dải thắt lưng / Khăn bao ngũ sắc |
| `Mat_Trim` | Cổ áo lót trong / Nẹp viền / Cổ tay |

Các phần không đổi màu (da mặt, tóc, khuy vàng) đặt tên khác (ví dụ `Skin_Base`, `Gold_Button`) để hệ thống giữ nguyên màu gốc.
