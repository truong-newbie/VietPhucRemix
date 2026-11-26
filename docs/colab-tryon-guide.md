# Hướng dẫn Bật Server AI Thử Đồ 0đ trên Google Colab GPU T4

Hệ thống **Việt Phục Remix** hỗ trợ 3 provider cho `/api/try-on` (`colab`, `gemini`, `fal`):
- **Chạy 24/7 miễn phí:** AI Stylist (`gemini-2.5-flash` Vision) luôn hoạt động phân tích tông da & gợi ý bộ phối.
- **Lúc Demo / Chấm thi (0đ, không cần thẻ ngân hàng):** Bật GPU T4 miễn phí trên Google Colab.

## 4 Bước thao tác sáng hôm đi thi (trước giờ thuyết trình 15 phút)

1. Mở [Google Colab](https://colab.research.google.com/) → **File → Upload notebook** → chọn file `colab/vietphuc-tryon-server.ipynb`.
2. Chọn **Runtime → Change runtime type → T4 GPU** → bấm **Save**.
3. Bấm **Runtime → Run all** (chờ 3–5 phút tải model). Cell cuối sẽ in ra link dạng:
   `https://ten-ngau-nhien.trycloudflare.com`
4. Mở trang web **Việt Phục Remix** → vào tab **AI Thử Ảnh** → bấm **Cài đặt Demo / Giám khảo** → dán link `https://...trycloudflare.com` vào ô **Link GPU Colab** (không cần sửa `.env` hay redeploy Vercel!).

## Lưu ý để kết quả ghép đẹp nhất
- Tải ảnh chụp **bán thân từ eo trở lên hoặc toàn thân**, đủ sáng, chính diện (tránh ảnh thẻ chụp quá sát mặt).
- Có thể tạo trước 7 ảnh cổ phục nền trắng lưu tại `public/garment-refs/<garmentId>.jpg` và khai báo trong `public/garment-refs/manifest.json`.
