# VIỆT PHỤC REMIX – NỀN TẢNG PHỐI ĐỒ DI SẢN THÔNG MINH ĐA THẾ HỆ
> **Dự án dự thi:** Cuộc thi Sinh viên với ý tưởng khởi nghiệp sáng tạo **“HaUI - STARTUP MINDSET” năm 2026**  
> **Đơn vị:** Trường Công nghệ Thông tin & Truyền thông – Trường Đại học Công nghiệp Hà Nội (HaUI)  
> **Trưởng nhóm:** Đỗ Đăng Trường – Trường ĐH Công nghiệp Hà Nội (HaUI)  
> **Email liên hệ:** `dangtruong3122005@gmail.com`  
> **Kim chỉ nam tư tưởng:** *“Văn hóa là nội lực mạnh nhất của dân tộc – Mặc đẹp, Mặc đúng, Giữ trọn hồn thiêng dân tộc”* (Nghị quyết 33-NQ/TW & Nghị quyết 68-NQ/TW của Bộ Chính trị).

---

## 🌟 I. TỔNG QUAN DỰ ÁN
**Việt phục Remix** là nền tảng ứng dụng công nghệ trực quan hóa giúp người dùng (từ học sinh, sinh viên Gen Z đến các gia đình đa thế hệ) tự do khám phá, phối trang phục truyền thống Việt Nam theo bối cảnh, sự kiện, màu sắc và phong cách cá nhân một cách chuẩn mực và sáng tạo.

### 4 Đột phá công nghệ & văn hóa cốt lõi:
1. **Layered SVG Avatar Engine:** Động cơ dựng hình vector 2D đa tầng tải siêu nhẹ, cho phép đổi trang phục, đổi màu sắc theo thời gian thực với độ trễ 0ms, không tốn chi phí thuê server GPU đắt đỏ.
2. **Culture Guard (Lá chắn Văn hóa):** Động cơ ma trận luật số hóa phản ứng thời gian thực (Đèn Xanh / Vàng / Đỏ), lập tức phát hiện và cảnh báo các phối ghép làm sai lệch phom dáng di sản hoặc trái thuần phong mỹ tục nơi tôn nghiêm, kèm nút **[Tự Động Chuẩn Hóa 1-Click]**.
3. **Harmony Score (Thước đo Hài hòa Thẩm mỹ):** Thuật toán chấm điểm tự động từ 0–100 điểm, kết hợp quy tắc bánh xe màu sắc hiện đại và quy luật **Tương Sinh Ngũ Hành cổ truyền** (Kim, Mộc, Thủy, Hỏa, Thổ).
4. **Canvas Lookbook & B2B Marketplace:** Xuất thẻ ảnh Lookbook di sản phân giải cao kèm mã QR cá nhân hóa; kết nối trực tiếp với mạng lưới tiệm thuê/may đo cổ phục đối tác (Hà Nội, Huế, TP.HCM) để tạo doanh thu thực tế.

---

## 📂 II. CẤU TRÚC CODEBASE DỰ ÁN

```text
VietPhucRemix/
├── index.html                   # Entry point, tích hợp Google Fonts (Playfair Display, Be Vietnam Pro)
├── package.json                 # Cấu hình dự án (React 19, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti)
├── vite.config.js               # Cấu hình Vite với Tailwind CSS plugin
├── README.md                    # Tài liệu kỹ thuật dự án
└── src/
    ├── main.jsx                 # Điểm khởi động React DOM
    ├── App.jsx                  # Điều phối trạng thái toàn ứng dụng, kịch bản demo và modals
    ├── index.css                # Tailwind CSS v4, custom heritage typography & scrollbar
    ├── data/
    │   ├── garmentsData.js      # Dữ liệu 5 dòng cổ phục (Ngũ thân, Tứ thân, Nhật Bình, Áo dài, Bà ba)
    │   ├── eventsData.js        # 10 sự kiện bối cảnh văn hóa & dữ liệu thời tiết gợi ý
    │   ├── colorsData.js        # Bảng màu Ngũ Hành & màu di sản cổ truyền
    │   ├── accessoriesData.js   # Tủ phụ kiện đầu (khăn vấn, nón), cầm tay (quạt, túi tote), giày guốc
    │   ├── cultureRules.js      # Bộ luật lõi Culture Guard (hiện có 8 luật cơ bản, lộ trình mở rộng ~200 luật)
    │   └── partnersData.js      # Mạng lưới đối tác tiệm thuê/may đo B2B2C
    ├── engines/
    │   ├── cultureEngine.js     # Động cơ suy diễn trạng thái Culture Guard (Green/Yellow/Red)
    │   └── harmonyEngine.js     # Thuật toán tính điểm màu sắc & tương sinh ngũ hành
    └── components/
        ├── Navbar.jsx           # Header trang trọng, logo, switch chế độ Gen Z vs Gia đình 30+
        ├── HeroSection.jsx      # Banner tư tưởng Nghị quyết 33, 68 & 4 nút kích hoạt kịch bản demo
        ├── StudioControls.jsx   # Bảng điều khiển 4 tab (Sự kiện, Dòng áo, Bảng màu, Phụ kiện)
        ├── AvatarStage.jsx      # Sân khấu nhân vật Layered SVG Avatar đổi màu tương tác
        ├── CultureGuardBanner.jsx # Huy hiệu đèn giao thông cảnh báo & nút 1-click sửa nhanh
        ├── HarmonyGauge.jsx     # Đồng hồ đo điểm Harmony Score (0-100) & phân tích ngũ hành
        ├── CultureCardModal.jsx # Cửa sổ Thẻ văn hóa 60s (tư liệu di sản, trích dẫn Ngàn năm áo mũ)
        ├── LookbookModal.jsx    # Modal kết xuất ảnh Lookbook thiệp di sản chất lượng cao kèm mã QR
        ├── PartnerModal.jsx     # Sàn kết nối tiệm thuê/may đo đối tác có mã giảm giá
        └── Footer.jsx           # Thông tin đội thi HaUI Startup Mindset 2026
```

---

## 🚀 III. HƯỚNG DẪN CÀI ĐẶT & CHẠY ỨNG DỤNG

### 1. Yêu cầu môi trường
- Node.js version 18.0 trở lên (khuyên dùng Node 20 hoặc 22 LTS).
- Trình duyệt Chrome / Edge / Safari / Firefox hiện đại.

### 2. Lệnh khởi chạy môi trường phát triển (Dev Server)
Mở PowerShell hoặc Terminal tại thư mục `VietPhucRemix`:

```bash
# Cài đặt thư viện phụ thuộc (nếu chưa cài)
npm install

# Khởi chạy server phát triển
npm run dev
```
Truy cập địa chỉ hiển thị trên màn hình: `http://localhost:5173/` để trải nghiệm trực tiếp!

### 3. Đóng gói bản Production (Build)
```bash
npm run build
```
Mã nguồn tối ưu sau khi biên dịch sẽ nằm trong thư mục `dist/`, sẵn sàng triển khai miễn phí lên **Vercel**, **Netlify**, hoặc **GitHub Pages**.

---

## 🎯 IV. 4 KỊCH BẢN DEMO DÀNH CHO BAN GIÁM KHẢO (ĐÃ TÍCH HỢP SẴN TRÊN BANNER)

1. **Kịch bản 1: Gen Z Dạo phố Tết (Phá cách đúng mực)**
   - *Thao tác:* Nhấp nút **[1. Gen Z Phố Tết]** trên banner.
   - *Kết quả:* Áo ngũ thân tay chẽn Đỏ son + Khăn vấn + Giày sneaker trắng + Túi tote.
   - *Phản hồi:* Culture Guard hiện **XANH LÁ**, Harmony Score đạt **96/100** (Hỏa sinh Thổ), tôn vinh tinh thần giữ nếp áo cổ truyền sải bước cùng sneaker năng động.

2. **Kịch bản 2: Bắt lỗi Sai lệch Văn hóa (Culture Guard kích hoạt)**
   - *Thao tác:* Nhấp nút **[2. Thử Bắt Lỗi (Red)]** trên banner.
   - *Thiết lập:* Cố tình chọn sự kiện *Đi lễ chùa* nhưng mặc áo đỏ son rực rỡ và quần cộc.
   - *Kết quả:* Culture Guard lập tức báo động **ĐÈN ĐỎ**, phát âm sắc cảnh báo sai lệch thuần phong mỹ tục nơi tôn nghiêm, trích dẫn quy phạm thiền môn và hiển thị nút **[Tự Động Chuẩn Hóa]**. Bấm nút để hệ thống tự động đổi về sắc Lam Chàm thanh tịnh!

3. **Kịch bản 3: Đám Cưới Hoàng Tộc (Phân khúc Khách hàng Gia đình & Trưởng thành 30–50+)**
   - *Thao tác:* Nhấp nút **[3. Đám Cưới Hoàng Tộc]** trên banner.
   - *Kết quả:* Áo Nhật Bình Hoàng Thổ + Quạt lụa thêu + Trâm cài sen mạ vàng.
   - *Ý nghĩa:* Chứng minh dự án phục vụ đa thế hệ, có thị trường trả phí may đo và thuê áo cưới cao cấp.

4. **Kịch bản 4: Duyên Thầm Quan Họ Kinh Bắc**
   - *Thao tác:* Nhấp nút **[4. Quan Họ Kinh Bắc]** trên banner.
   - *Kết quả:* Áo tứ thân mộc mạc + Nón ba tầm dải thao + Yếm đào rực rỡ du xuân trẩy hội Lim.

---

## 🏆 V. GIÁ TRỊ ĐÓNG GÓP CHO BÀI THI STARTUP MINDSET 2026
- **Điểm Tính khả thi & Mức độ hoàn thiện (20đ):** Sản phẩm hoạt động thực tế 100%, không còn là ý tưởng trên giấy.
- **Điểm Đổi mới sáng tạo (20đ):** Đột phá kết hợp công nghệ phối đồ với kiểm định bản sắc di sản cha ông.
- **Tài liệu trực quan:** Đầy đủ hình ảnh, video quay thao tác thực tế và mã QR để Ban giám khảo tự quét và chấm điểm trực tiếp trên điện thoại!
