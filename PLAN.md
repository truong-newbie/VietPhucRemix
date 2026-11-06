# KẾ HOẠCH PHÁT TRIỂN CODE – VIỆT PHỤC REMIX

> File này dùng để giao việc cho AI coding agent (Claude Code, Cursor, Copilot…).
> Mỗi lần giao việc: **chỉ giao 1 task** (ví dụ "Làm task P0-02 trong PLAN.md"), agent đọc mục **0. Quy ước chung** + task đó rồi làm.
> Sau khi xong, đánh dấu `[x]` vào ô của task.

---

## MỤC LỤC

- [0. Quy ước chung cho AI agent](#0-quy-ước-chung-cho-ai-agent)
- [1. Hiện trạng code (tính đến 06/11/2026)](#1-hiện-trạng-code-tính-đến-06112026)
- [2. Tổng quan các giai đoạn](#2-tổng-quan-các-giai-đoạn)
- [P0 – Sửa lỗi uy tín trước khi nộp hồ sơ (06–07/11)](#p0--sửa-lỗi-uy-tín-trước-khi-nộp-hồ-sơ-0607112026)
- [P1 – Nền móng kỹ thuật (08–12/11)](#p1--nền-móng-kỹ-thuật-0812112026)
- [P2 – Lấp đủ tính năng đã hứa trong thuyết minh (12–22/11)](#p2--lấp-đủ-tính-năng-đã-hứa-trong-thuyết-minh-1222112026)
- [P3 – Thử nghiệm người dùng & minh chứng (20–28/11)](#p3--thử-nghiệm-người-dùng--minh-chứng-2028112026)
- [P4 – Bản trình diễn chung kết (sau 29/11)](#p4--bản-trình-diễn-chung-kết-sau-29112026)
- [P5 – Sau cuộc thi (tùy chọn)](#p5--sau-cuộc-thi-tùy-chọn)
- [Phụ lục A – Danh sách ID dữ liệu hiện có](#phụ-lục-a--danh-sách-id-dữ-liệu-hiện-có)
- [Phụ lục B – Prompt mẫu để giao task](#phụ-lục-b--prompt-mẫu-để-giao-task)

---

## 0. QUY ƯỚC CHUNG CHO AI AGENT

**Đọc kỹ trước khi làm bất kỳ task nào.**

### 0.1. Bối cảnh

- Dự án thi **HaUI – Startup Mindset 2026**. Web app giúp phối trang phục truyền thống Việt Nam theo sự kiện, có **Culture Guard** (cảnh báo đèn Xanh/Vàng/Đỏ) và **Harmony Score** (điểm ngũ hành 0–100).
- Tài liệu dự án (thuyết minh, slide) nằm ở thư mục cha `../`. README ở `./README.md`.
- Người dùng cuối và giám khảo là người Việt → **mọi chữ hiển thị trên giao diện viết bằng tiếng Việt có dấu**. Comment trong code có thể tiếng Việt.

### 0.2. Công nghệ (KHÔNG đổi nếu task không yêu cầu)

| Thành phần | Hiện dùng |
|---|---|
| Framework | React 19 (JSX, **không** TypeScript) |
| Build | Vite 8, `base: './'` |
| CSS | Tailwind CSS v4 (plugin `@tailwindcss/vite`), class viết trực tiếp |
| Icon | `lucide-react` |
| Lint | `oxlint` |
| Font | Be Vietnam Pro (Google Fonts trong `index.html`) – **không dùng font serif** vì lỗi tách dấu tiếng Việt |
| Deploy | GitHub Pages qua `.github/workflows/`, repo `truong-newbie/VietPhucRemix`, nhánh `main` |

Bảng màu chủ đạo: đỏ son `#8B1A1A`, vàng hoàng thổ `#C9A227`, lam chàm `#1D2440`, nền giấy `#F4EFE6` / `#FAF7F2`, viền `#E0D5C1`. Component mới phải dùng đúng các màu này cho đồng bộ.

### 0.3. Cấu trúc thư mục

```
src/
  App.jsx              # state toàn app, kịch bản demo, modal
  data/                # dữ liệu tĩnh (garments, events, colors, accessories, cultureRules, partners)
  engines/             # logic thuần, KHÔNG import React (cultureEngine, harmonyEngine)
  components/          # UI
  (sẽ thêm) hooks/     # custom hooks
  (sẽ thêm) utils/     # hàm tiện ích thuần
  (sẽ thêm) **/*.test.js
```

Quy tắc:
- Logic tính toán đặt trong `engines/` hoặc `utils/`, **là hàm thuần** (cùng input → cùng output, không đọc DOM/localStorage) để viết test được.
- Dữ liệu đặt trong `data/`, không hard-code dữ liệu trong component.
- Component mới: `export function TenComponent(...)` (named export) giống code hiện tại.

### 0.4. Quy trình bắt buộc cho MỖI task

1. Đọc task, đọc các file được liệt kê ở mục **File liên quan**.
2. Làm đúng phạm vi task, **không** refactor lan sang chỗ khác.
3. Chạy kiểm tra (trong thư mục `VietPhucRemix/`):
   ```bash
   npm run lint
   npm run build
   npm test        # chỉ khi đã có sau task P1-01
   ```
   Cả ba phải chạy thành công, **không thêm cảnh báo lint mới**.
4. Kiểm tra thủ công bằng `npm run dev` theo mục **Tiêu chí hoàn thành** của task. Đặc biệt: 4 kịch bản demo trên banner và nút "Tour demo 3 phút" **vẫn phải chạy đúng** sau mọi thay đổi.
5. Commit 1 commit/task, message theo Conventional Commits, có mã task:
   ```
   feat(qr): P0-01 tạo mã QR thật trong Lookbook
   ```
6. Đánh dấu `[x]` cho task trong file này và ghi ngắn gọn vào cột/ dòng **Ghi chú kết quả** nếu có điều đáng lưu ý.

### 0.5. Những điều KHÔNG được làm

- Không đổi ID dữ liệu đang có (`ngu-than`, `do-son`, `le-chua`…) — kịch bản demo, tour và luật phụ thuộc vào chúng. Chỉ được **thêm** ID mới.
- Không xóa 4 kịch bản demo, tour 3 phút, trang Roadmap.
- Không thêm thư viện nặng (> 50 KB gzip) nếu task không cho phép.
- Không đưa API key vào code. Key (nếu có) đặt trong `.env.local` (đã bị gitignore qua `*.local`) và đọc bằng `import.meta.env.VITE_...`.
- Không viết nội dung văn hóa/lịch sử bịa đặt. Nội dung mới phải có trường `source` ghi nguồn; nếu không chắc, ghi `source: 'CẦN THẨM ĐỊNH'` để nhóm kiểm tra lại.

---

## 1. HIỆN TRẠNG CODE (tính đến 06/11/2026)

### Đã có và chạy được
- Studio 4 tab (Sự kiện, Dòng áo, Bảng màu, Phụ kiện) — `StudioControls.jsx`
- Avatar SVG nhiều lớp, đổi màu tức thì, chọn nam/nữ — `AvatarStage.jsx`
- Culture Guard: **8 luật** viết dạng hàm `check()` — `data/cultureRules.js`, `engines/cultureEngine.js`
- Harmony Score ngũ hành — `engines/harmonyEngine.js`
- Thẻ văn hóa 60 giây — `CultureCardModal.jsx`
- Lookbook xuất PNG bằng canvas — `LookbookModal.jsx` (**QR là hình vẽ giả**)
- Sàn đối tác 4 tiệm (tĩnh) — `PartnerModal.jsx`
- Chế độ Gen Z / Gia đình, 4 kịch bản demo, nút tự sửa 1 click — `App.jsx`, `HeroSection.jsx`
- Tour demo 3 phút có giọng đọc MP3 — `AutoDemoTour.jsx`, `public/audio/`
- Trang Roadmap — `ProjectRoadmapPage.jsx`
- Build OK, deploy GitHub Pages có workflow

### Khoảng cách so với tài liệu thuyết minh/slide
| Tài liệu hứa | Code hiện tại | Task xử lý |
|---|---|---|
| Mã QR di sản trên Lookbook | QR giả | P0-01 |
| Link demo | Chưa điền | P0-03 |
| ~200 luật Culture Guard | 8 luật | P1-03, P1-04, P2-01 |
| Lọc vùng miền Bắc–Trung–Nam | Không có | P2-02 |
| 5 phong cách phối | Không có | P2-03 |
| Gợi ý 3 bộ phối chuẩn | Không có | P2-04 |
| So sánh phương án A/B | Không có | P2-05 |
| Mini-quiz + huy hiệu | Không có | P2-06 |
| Gợi ý theo thời tiết | Dữ liệu cứng | P4-03 |
| Kiểm chứng SUS, < 3 phút, ≥ 30% chia sẻ | Chưa đo | P3-01 → P3-04 |
| Nhãn 3 cấp (Truyền thống / Cách tân / Sáng tạo tự do) | Không có | P2-07 |
| Đặt lịch thuê/may tại đối tác | Chỉ hiển thị | P4-04 |

### Lỗi kỹ thuật đã biết
- `App.jsx`: object `cultureState` tạo mới mỗi lần render → `useMemo` của `cultureResult` vô tác dụng.
- `LookbookModal.jsx`: 6 cảnh báo lint (import thừa `Check`, `QrCode`; tham số thừa `handAccessory`; `renderCanvas` dùng trước khi khai báo; thiếu dependency; gọi `Date.now()` trong render).
- Không có test nào.

---

## 2. TỔNG QUAN CÁC GIAI ĐOẠN

| Giai đoạn | Thời gian | Mục tiêu | Mốc cuộc thi |
|---|---|---|---|
| **P0** | 06–07/11 | Sửa các điểm "tài liệu nói khác code", có link demo | Nộp hồ sơ **trước 08/11** |
| **P1** | 08–12/11 | Test, luật dạng dữ liệu, dọn kiến trúc | Chờ kết quả sơ khảo |
| **P2** | 12–22/11 | Làm đủ tính năng đã hứa | Vòng đào tạo |
| **P3** | 20–28/11 | Đo lường, thử nghiệm với người dùng thật, có số liệu | **Bán kết** (5' trình bày + 10' bảo vệ) |
| **P4** | sau 29/11 | Mobile/PWA, backend nhẹ, đặt lịch thật, thời tiết thật | **Chung kết** (5' pitching + 8' hỏi đáp) |
| **P5** | sau cuộc thi | AI hỏi đáp, mở rộng trang phục | – |

Thứ tự phụ thuộc chính:

```
P0-01 (URL state) ──► P0-02 (QR) ──► P2-05 (so sánh) / P3-02 (đo chia sẻ)
P1-01 (Vitest) ──► P1-02 (test engine) ──► P1-03 (luật dạng dữ liệu) ──► P1-04, P2-01 (thêm luật)
P1-05 (gom state) ──► P2-04 (gợi ý 3 bộ), P2-05 (so sánh)
P3-01 (analytics) ──► P3-02, P3-03, P3-04
```

---

## P0 – SỬA LỖI UY TÍN TRƯỚC KHI NỘP HỒ SƠ (06–07/11/2026)

### [x] P0-01 · Lưu bộ phối vào URL (chia sẻ bằng link)

**Mục tiêu:** Mỗi bộ phối có một link riêng. Mở link → app hiển thị đúng bộ phối đó. Đây là nền cho QR thật.

**File liên quan:** `src/App.jsx`, tạo mới `src/utils/outfitUrl.js`

**Các bước:**
1. Tạo `src/utils/outfitUrl.js` với 2 hàm thuần:
   - `encodeOutfit(outfit) → string` (query string), ví dụ `?e=tet-xuan&g=ngu-than&o=do-son&b=trang-su&t=hoang-tho&h=khan-van&hd=tui-tote&f=sneaker-trang&l=long&m=genz&s=female`
   - `decodeOutfit(search, validIds) → Partial<outfit>`: chỉ nhận giá trị nằm trong danh sách ID hợp lệ (lấy từ `data/`), giá trị lạ thì bỏ qua.
   - Khóa ngắn: `e` sự kiện, `g` dòng áo, `o` màu áo, `b` màu quần, `t` màu thắt lưng, `h` phụ kiện đầu, `hd` phụ kiện tay, `f` giày, `l` độ dài quần, `m` chế độ, `s` giới tính.
2. Trong `App.jsx`: khi khởi tạo, đọc `window.location.search` → nếu có tham số hợp lệ thì dùng làm giá trị ban đầu của các `useState` (dùng lazy initializer `useState(() => ...)`).
3. Khi bộ phối thay đổi: cập nhật URL bằng `history.replaceState` (không tạo history mới, không reload).
4. Thêm hàm `getShareUrl()` trả về `location.origin + location.pathname + encodeOutfit(...)`.
5. Thêm nút "Sao chép link bộ phối" (icon `Link` của lucide) cạnh nút "Xuất Lookbook" trong `App.jsx`; bấm → `navigator.clipboard.writeText` + thông báo nhỏ "Đã sao chép".

**Tiêu chí hoàn thành:**
- Đổi vài lựa chọn → URL trên thanh địa chỉ đổi theo.
- Copy link, mở tab mới → hiển thị đúng bộ phối, đúng đèn Culture Guard, đúng điểm Harmony.
- Link có tham số rác (`?g=abc`) không làm app lỗi, dùng giá trị mặc định.
- Chạy được khi deploy dưới đường dẫn con `/VietPhucRemix/`.

**Ghi chú kết quả:** Đã hoàn thành 100%. Tạo `src/utils/outfitUrl.js` với `encodeOutfit` và `decodeOutfit`, đồng bộ URL tự động qua `replaceState`, thêm nút "Sao chép link" với phản hồi UI trực quan.

---

### [x] P0-02 · Mã QR thật trong Lookbook

**Phụ thuộc:** P0-01

**File liên quan:** `src/components/LookbookModal.jsx`, `src/App.jsx`, `package.json`

**Các bước:**
1. Cài thư viện: `npm install qrcode` (~25 KB gzip, được phép).
2. Truyền `shareUrl` (từ P0-01) vào `LookbookModal` qua props.
3. Thay đoạn `// Simulated QR pattern` bằng QR thật: `QRCode.toCanvas` hoặc `QRCode.toDataURL` rồi `ctx.drawImage` vào đúng ô 80×80 hiện tại (có thể nới lên 100×100 và chỉnh lại vị trí chữ bên cạnh cho cân đối).
4. Vì vẽ QR là bất đồng bộ: chỉ gọi `setDownloadUrl(canvas.toDataURL())` **sau khi** QR đã vẽ xong.
5. Đổi dòng chữ cạnh QR thành: "QUÉT MÃ ĐỂ MỞ LẠI BỘ PHỐI NÀY".
6. Sửa luôn 6 cảnh báo lint của file này:
   - Bỏ import `Check`, `QrCode` nếu không dùng; bỏ/đổi tên `handAccessory` thành `_handAccessory` hoặc dùng nó để in tên phụ kiện tay lên Lookbook (nên dùng).
   - Chuyển `renderCanvas` lên trước `useEffect` hoặc đưa vào trong `useEffect`; đủ dependency.
   - Tên file tải về: tạo timestamp trong handler/khi render canvas, không gọi `Date.now()` trong JSX.

**Tiêu chí hoàn thành:**
- Dùng camera điện thoại quét QR trên ảnh PNG tải về → mở đúng link bộ phối.
- `npm run lint` không còn cảnh báo nào ở `LookbookModal.jsx`.

**Ghi chú kết quả:** Đã cài `qrcode`, render mã QR thật bất đồng bộ vào Canvas Lookbook dẫn thẳng đến URL bộ phối, sửa sạch toàn bộ 6 cảnh báo lint của `LookbookModal.jsx` (còn 0 cảnh báo).

---

### [ ] P0-03 · Đảm bảo deploy chạy, có link demo

> *(Đã bỏ qua theo yêu cầu của người dùng vì dự án đã được deploy chính thức lên Vercel).*

---

### [x] P0-04 · Sửa lỗi `useMemo` của Culture Guard trong App.jsx

**File liên quan:** `src/App.jsx`

**Các bước:**
1. Bọc `cultureState` trong `useMemo` với dependency là các giá trị state thành phần (hoặc tạo trực tiếp trong callback của `useMemo` tính `cultureResult`).
2. Không đổi hành vi.

**Tiêu chí hoàn thành:** Lint sạch; 4 kịch bản demo cho ra đúng màu đèn như trước (Gen Z → Xanh, Bắt lỗi → Đỏ, Đám cưới → Xanh, Quan họ → Xanh).

**Ghi chú kết quả:** Đã bọc `cultureState` trong `useMemo` với dependency đầy đủ các thuộc tính của bộ phối, không còn tái tạo object mỗi lần render, giữ nguyên 100% logic đèn giao thông.

---

### [x] P0-05 · Đồng bộ câu chữ "200 luật" cho trung thực

**File liên quan:** `README.md`, `src/components/ProjectRoadmapPage.jsx`, `src/components/HeroSection.jsx`, `src/components/AutoDemoTour.jsx` (grep cụm "200")

**Các bước:**
1. `grep -rn "200" src README.md` tìm mọi chỗ nói "200 quy tắc/luật".
2. Sửa thành dạng trung thực, ví dụ: "Bộ luật lõi đang vận hành (N luật), lộ trình hoàn thiện 200 luật trong giai đoạn ươm tạo". Trong UI hiển thị **N lấy động** từ `CULTURE_RULES.length`, không ghi cứng.
3. Liệt kê ra cuối task (trong phần Ghi chú) các câu cần sửa tương ứng trong file **thuyết minh .docx và slide .pptx** ở thư mục cha để nhóm tự sửa tay (agent **không** sửa file Office).

**Tiêu chí hoàn thành:** Không còn chỗ nào trong code/README khẳng định đã có 200 luật.

**Ghi chú kết quả:** 
- Đã chỉnh sửa `README.md` và `ProjectRoadmapPage.jsx`, hiển thị số lượng luật động `{CULTURE_RULES.length}` (8 luật lõi) và nêu rõ lộ trình phát triển mở rộng ~200 luật toàn diện trong giai đoạn ươm tạo.
- **Khuyến nghị sửa file thuyết minh .docx và slide .pptx của nhóm:**
  1. *Trong Slide Presentation:* Thay vì ghi "Culture Guard: Động cơ 200 luật văn hóa", sửa thành: "Culture Guard: Bộ luật lõi đang vận hành (8 luật tiêu biểu), lộ trình mở rộng ~200 luật trong giai đoạn ươm tạo".
  2. *Trong Thuyết minh dự án (.docx):* Tại mục Tính năng công nghệ, ghi rõ: "Phiên bản Web MVP hiện tại triển khai 8 quy tắc lõi chuẩn xác cho các kịch bản thực tế (đi chùa, cưới hỏi, lễ hội xuân...); nhóm định hướng phối hợp cùng Hội đồng Cố vấn Văn hóa để chuẩn hóa kho tri thức 200 luật ở giai đoạn tiếp theo".

---

## P1 – NỀN MÓNG KỸ THUẬT (08–12/11/2026)

### [ ] P1-01 · Cài Vitest

**File liên quan:** `package.json`, `vite.config.js`

**Các bước:**
1. `npm install -D vitest`
2. Thêm script `"test": "vitest run"` và `"test:watch": "vitest"`.
3. Cấu hình `test: { environment: 'node' }` trong `vite.config.js` (engine là hàm thuần, chưa cần jsdom).
4. Tạo 1 test mẫu `src/utils/outfitUrl.test.js` cho `encodeOutfit`/`decodeOutfit` (encode rồi decode ra lại đúng; tham số rác bị bỏ).
5. Thêm bước `npm test` vào workflow GitHub Actions **trước** bước build.

**Tiêu chí hoàn thành:** `npm test` chạy xanh; build CI chạy test.

---

### [ ] P1-02 · Test cho 2 engine hiện tại (khóa hành vi trước khi refactor)

**Phụ thuộc:** P1-01

**File liên quan:** tạo `src/engines/cultureEngine.test.js`, `src/engines/harmonyEngine.test.js`

**Các bước:**
1. Tạo helper `makeState(overrides)` trả về state mặc định (bộ Gen Z Tết) ghi đè bằng `overrides`.
2. Culture Guard: viết **ít nhất 1 test cho mỗi luật trong 8 luật** (trường hợp kích hoạt) + 1 test trạng thái mặc định an toàn + test ưu tiên Đỏ > Vàng > Xanh khi khớp nhiều luật cùng lúc.
3. Test 4 kịch bản demo trong `App.jsx` (`genz-tet`, `temple-violation`, `royal-wedding`, `quan-ho-heritage`) cho ra đúng `status`.
4. Harmony: test các nhánh (cùng hành, tương sinh, tương khắc có/không có thắt lưng hòa giải, màu kỵ sự kiện, phụ kiện không hợp), test điểm luôn nằm trong `[20, 99]`, test kịch bản Gen Z Tết đúng con số hiện tại (ghi lại làm "snapshot").

**Tiêu chí hoàn thành:** ≥ 20 test, tất cả xanh. Các test này **phải giữ nguyên kết quả** sau P1-03.

---

### [ ] P1-03 · Chuyển luật Culture Guard sang dạng dữ liệu khai báo

**Phụ thuộc:** P1-02

**Lý do:** Viết hàm `check()` cho từng luật không thể lên 200 luật và chuyên gia văn hóa không đọc được. Chuyển sang dữ liệu để thêm luật hàng loạt, có thể xuất ra JSON cho chuyên gia duyệt.

**File liên quan:** `src/data/cultureRules.js`, `src/engines/cultureEngine.js`, tạo `src/engines/ruleMatcher.js`

**Schema luật mới:**
```js
{
  id: 'rule-red-temple-short',          // duy nhất, kebab-case, tiền tố theo level
  level: 'red' | 'yellow' | 'green',
  priority: 100,                          // số lớn ưu tiên hơn khi cùng level (mặc định 0)
  category: 'ton-nghiem' | 'vung-mien' | 'mau-sac' | 'phom-dang' | 'phu-kien' | 'ngu-hanh' | 'khen-ngoi',
  when: {                                 // TẤT CẢ điều kiện phải đúng (AND)
    eventId: ['le-chua'],                 // mảng = khớp 1 trong các giá trị (OR)
    garmentId: [...],
    outerColorId: [...],
    bottomColorId: [...],
    beltColorId: [...],
    headAccessoryId: [...],
    handAccessoryId: [...],
    footAccessoryId: [...],
    bottomLength: ['short'],
    outerElement: ['Thủy'],               // hành của màu áo (tra từ colorsMap)
    bottomElement: ['Hỏa'],
    gender: ['female']
  },
  whenNot: { ... },                       // không được khớp (tùy chọn)
  anyOf: [ {when}, {when} ],              // tùy chọn: khớp 1 trong các nhóm điều kiện (OR giữa các nhóm)
  title: '...',
  message: '...',
  quote: '...',
  suggestion: '...',
  source: 'Ngàn năm áo mũ – Trần Quang Đức, tr. xx' | 'CẦN THẨM ĐỊNH',
  autoFix: { outerColorId: 'lam-cham', bottomLength: 'long' } | null
}
```

**Các bước:**
1. Viết `ruleMatcher.js`: hàm thuần `matchRule(rule, state, colorsMap) → boolean` hỗ trợ `when`, `whenNot`, `anyOf`, các trường `outerElement/bottomElement` (suy ra từ `colorsMap`).
2. Viết `validateRules(rules, data) → errors[]`: kiểm tra id trùng, level hợp lệ, mọi ID trong `when`/`autoFix` tồn tại trong `data/`, có `source`. Thêm test gọi `validateRules` trên toàn bộ luật → phải trả mảng rỗng.
3. Chuyển 8 luật cũ sang schema mới. Luật cũ có OR (`short` **hoặc** `do-son`) → tách thành 2 luật hoặc dùng `anyOf`.
4. `cultureEngine.js`: dùng `matchRule`, sắp xếp theo level rồi `priority`, trả về **cùng cấu trúc output như cũ** (`status`, `levelText`, `activeRule`, `allMatched`) để UI không phải sửa.
5. Thêm kiểm tra: `autoFix` áp vào state xong thì luật đó **không còn khớp** (test tự động cho mọi luật có `autoFix`). Đây là tính năng "1-click chuẩn hóa" phải luôn đúng.

**Tiêu chí hoàn thành:** Toàn bộ test P1-02 vẫn xanh, không sửa test; `validateRules` không báo lỗi.

---

### [ ] P1-04 · Hiển thị nhiều cảnh báo cùng lúc + nguồn trích dẫn

**Phụ thuộc:** P1-03

**File liên quan:** `src/components/CultureGuardBanner.jsx`

**Các bước:**
1. Banner hiện luật chính (như cũ) + dòng "Còn N lưu ý khác" mở rộng ra danh sách `allMatched` (mỗi dòng: chấm màu + tiêu đề).
2. Hiển thị `source` dưới câu trích dẫn (chữ nhỏ, xám). Nếu `source === 'CẦN THẨM ĐỊNH'` thì **không** hiển thị nguồn.
3. Nút "Tự động chuẩn hóa" áp lần lượt `autoFix` của tất cả luật đỏ/vàng đang khớp (luật đỏ trước).

**Tiêu chí hoàn thành:** Kịch bản "Bắt lỗi" → bấm 1 lần là đèn chuyển sang Xanh hoặc Vàng (không còn Đỏ).

---

### [ ] P1-05 · Gom state bộ phối thành 1 object + hook

**File liên quan:** `src/App.jsx`, tạo `src/hooks/useOutfit.js`

**Lý do:** `App.jsx` đang có ~10 `useState` riêng lẻ, việc gợi ý bộ phối, so sánh, lưu, chia sẻ đều cần thao tác "cả bộ".

**Các bước:**
1. Tạo `useOutfit(initial)` dùng `useReducer`, state dạng:
   ```js
   { eventId, garmentId, outerColorId, bottomColorId, beltColorId,
     headId, handId, footId, bottomLength, gender, mode }
   ```
   Action: `set(field, value)`, `apply(partialOutfit)`, `reset()`.
2. Hook trả thêm các giá trị suy ra: `garment`, `event`, `outerColor`…, `cultureResult`, `harmonyResult` (đã `useMemo` đúng).
3. Viết lại `handleApplyScenario`, `handleModeChange`, `handleAutoFix`, `tourHelpers` dùng `apply(...)`. Các kịch bản demo chuyển thành dữ liệu trong `src/data/scenariosData.js`.
4. Tích hợp đọc/ghi URL của P0-01 vào hook.
5. Props truyền xuống component giữ nguyên tên để hạn chế sửa component con.

**Tiêu chí hoàn thành:** Hành vi y hệt cũ; tour 3 phút và 4 kịch bản chạy đúng; `App.jsx` ngắn đi rõ rệt.

---

### [ ] P1-06 · Lưu bộ phối gần nhất (localStorage)

**Phụ thuộc:** P1-05

**File liên quan:** tạo `src/utils/storage.js`, `src/hooks/useOutfit.js`

**Các bước:**
1. `storage.js`: `load(key, fallback)` / `save(key, value)` bọc `try/catch` (localStorage có thể bị chặn).
2. Thứ tự ưu tiên khi mở app: tham số URL > bộ phối lưu gần nhất > mặc định.

**Tiêu chí hoàn thành:** Đóng tab mở lại vẫn giữ bộ phối; chế độ ẩn danh/chặn storage không lỗi.

---

## P2 – LẤP ĐỦ TÍNH NĂNG ĐÃ HỨA TRONG THUYẾT MINH (12–22/11/2026)

### [ ] P2-01 · Mở rộng bộ luật lên ≥ 80 luật (đợt 1)

**Phụ thuộc:** P1-03

**File liên quan:** `src/data/cultureRules.js` (có thể tách thành `src/data/rules/*.js` theo `category` rồi gộp lại)

**Các bước:**
1. Viết luật theo các nhóm, mỗi nhóm tối thiểu:
   | Category | Số luật tối thiểu | Ví dụ |
   |---|---|---|
   | `ton-nghiem` (lễ chùa, nơi thờ tự) | 12 | màu chói, quần ngắn, sneaker khi lễ chùa (vàng)… |
   | `vung-mien` | 12 | bà ba + nón quai thao (đỏ), tứ thân + khăn rằn, nhật bình + khăn rằn… |
   | `mau-sac` theo sự kiện | 15 | mọi cặp sự kiện × `forbiddenColors` trong `eventsData.js` |
   | `phom-dang` | 8 | áo dài + quần ngắn (đỏ), ngũ thân + quần ngắn… |
   | `phu-kien` | 12 | khớp `garmentCompatibility` trong `accessoriesData.js` |
   | `ngu-hanh` | 6 | đủ 5 cặp tương khắc (không chỉ Thủy–Hỏa) |
   | `khen-ngoi` (xanh) | 15 | mỗi sự kiện ≥ 1 bộ phối chuẩn được khen |
2. Có thể **sinh luật tự động** từ dữ liệu (ví dụ duyệt `eventsData[].forbiddenColors` → tạo luật vàng/đỏ) bằng hàm trong `src/data/rules/generated.js`; luật sinh tự động vẫn phải qua `validateRules`.
3. Nội dung `message`/`quote` mới phải viết cẩn thận, không bịa trích dẫn cổ văn. Không có nguồn → `source: 'CẦN THẨM ĐỊNH'` và `quote` để trống hoặc dùng lời giải thích thường.
4. Xuất file `docs/culture-rules-review.csv` (script `npm run export:rules` bằng Node) gồm cột: id, level, category, điều kiện (dạng chữ), message, source — để nhóm và cố vấn văn hóa duyệt.
5. Bổ sung test: với mỗi category, ≥ 1 test kích hoạt.

**Tiêu chí hoàn thành:** `CULTURE_RULES.length >= 80`; `validateRules` sạch; test xanh; 4 kịch bản demo vẫn ra đúng màu đèn (nếu luật mới làm đổi màu kịch bản → điều chỉnh `priority` thay vì sửa kịch bản).

---

### [ ] P2-02 · Lọc theo vùng miền Bắc – Trung – Nam

**File liên quan:** `src/data/garmentsData.js`, `src/data/eventsData.js`, `src/data/accessoriesData.js`, `src/components/StudioControls.jsx`

**Các bước:**
1. Thêm trường `regions: ['bac' | 'trung' | 'nam' | 'toan-quoc']` cho từng dòng áo, sự kiện, phụ kiện (giữ nguyên trường `region` dạng chữ đang có).
   - Gợi ý: tứ thân `['bac']`, nhật bình `['trung']`, bà ba `['nam']`, ngũ thân và áo dài `['toan-quoc']`; nón quai thao `['bac']`, khăn rằn `['nam']`; festival-hue `['trung']`, song-nuoc-nam-bo `['nam']`…
2. Thêm thanh chip lọc "Tất cả / Bắc / Trung / Nam" ở đầu `StudioControls`. Mục `toan-quoc` luôn hiện.
3. Lọc chỉ ẩn bớt lựa chọn, không tự đổi lựa chọn đang chọn.

**Tiêu chí hoàn thành:** Chọn "Nam" → thấy bà ba, áo dài, ngũ thân, khăn rằn, sự kiện sông nước; không thấy nón quai thao.

---

### [ ] P2-03 · 5 phong cách phối

**File liên quan:** tạo `src/data/stylesData.js`, `src/components/StudioControls.jsx`, `src/engines/harmonyEngine.js`

**Các bước:**
1. Dữ liệu 5 phong cách: Thanh lịch, Năng động, Cổ phong, Vintage, Tối giản. Mỗi phong cách: `id`, `name`, `description`, `preferredColors[]`, `preferredAccessories[]`, `icon`.
2. Thêm bộ chọn phong cách (chip) trong tab Dòng áo hoặc tab mới "Phong cách".
3. Harmony Score: cộng thêm tối đa +6 điểm khi màu/phụ kiện khớp phong cách, kèm dòng giải thích. Không chọn phong cách → điểm như cũ (test P1-02 vẫn xanh).
4. Lưu phong cách vào state outfit + URL (khóa `st`).

**Tiêu chí hoàn thành:** Đổi phong cách → điểm và phần giải thích thay đổi hợp lý.

---

### [ ] P2-04 · Gợi ý 3 bộ phối chuẩn theo sự kiện

**Phụ thuộc:** P1-03, P1-05

**File liên quan:** tạo `src/engines/recommendEngine.js` (+ test), tạo `src/components/SuggestionPanel.jsx`

**Thuật toán (không cần AI):**
1. Input: `eventId`, `gender`, `mode`, (tùy chọn) `region`, `styleId`.
2. Sinh ứng viên: duyệt `event.recommendedGarments` × `event.recommendedColors` (màu áo) × vài màu quần/thắt lưng × phụ kiện tương thích (`garmentCompatibility`). Giới hạn ≤ 2000 tổ hợp.
3. Loại mọi tổ hợp có luật **đỏ**; trừ điểm tổ hợp có luật vàng.
4. Xếp theo Harmony Score; chọn 3 bộ **khác dòng áo hoặc khác màu áo** (đa dạng), không lấy 3 bộ gần giống nhau.
5. Kết quả xác định (cùng input → cùng output). Chạy < 50 ms.

**UI:** Khi đổi sự kiện, hiện panel "3 gợi ý cho {tên sự kiện}" với 3 thẻ nhỏ (tên bộ phối, điểm, chấm màu). Bấm thẻ → `apply()` bộ phối đó.

**Test:** 10 sự kiện đều cho ra 3 gợi ý, không gợi ý nào dính luật đỏ.

**Tiêu chí hoàn thành:** Đúng hành trình "Bước 2 – Gợi ý ban đầu" trong thuyết minh.

---

### [ ] P2-05 · So sánh phương án A/B/C

**Phụ thuộc:** P1-05

**File liên quan:** tạo `src/components/CompareDrawer.jsx`, `src/hooks/useSavedOutfits.js`

**Các bước:**
1. Nút "Lưu để so sánh" (tối đa 3 bộ, lưu localStorage qua `storage.js`).
2. Ngăn kéo/ modal so sánh: 3 cột, mỗi cột có avatar thu nhỏ (tái sử dụng `AvatarStage` ở chế độ `compact`, thêm prop nếu cần), điểm Harmony, đèn Culture Guard, danh sách món đồ, nút "Dùng bộ này", nút xóa.
3. Đánh dấu cột có điểm cao nhất.

**Tiêu chí hoàn thành:** Lưu 3 bộ, so sánh, chọn lại 1 bộ để tiếp tục chỉnh. Hiển thị tốt trên mobile (cuộn ngang).

---

### [ ] P2-06 · Mini-quiz sau Thẻ văn hóa + huy hiệu

**File liên quan:** tạo `src/data/quizData.js`, `src/components/QuizModal.jsx`, `src/components/CultureCardModal.jsx`, tạo `src/hooks/useBadges.js`

**Các bước:**
1. `quizData.js`: mỗi dòng áo ≥ 5 câu trắc nghiệm 4 đáp án, có `explanation` và `source`. Nội dung lấy từ `cultureCard` sẵn có trong `garmentsData.js` để tránh bịa.
2. Cuối `CultureCardModal` thêm nút "Kiểm tra hiểu biết (3 câu)". Chọn ngẫu nhiên 3 câu của dòng áo đó.
3. Đúng ≥ 2/3 → nhận huy hiệu dòng áo (ví dụ "Am hiểu Áo Ngũ Thân"). Huy hiệu lưu localStorage, hiện ở Navbar (số huy hiệu / 5).
4. Đủ 5 huy hiệu → hiện mã ưu đãi đối tác lấy từ `partnersData.js` + confetti.

**Tiêu chí hoàn thành:** Làm quiz, nhận huy hiệu, tải lại trang vẫn còn.

---

### [ ] P2-07 · Nhãn 3 cấp độ sáng tạo

**Phụ thuộc:** P1-03

**File liên quan:** `src/engines/cultureEngine.js`, `src/components/CultureGuardBanner.jsx`, `src/components/LookbookModal.jsx`

**Các bước:**
1. Hàm thuần `classifyCreativity(state, cultureResult) → 'truyen-thong' | 'cach-tan' | 'sang-tao-tu-do'`:
   - Truyền thống chuẩn mực: không luật đỏ/vàng **và** mọi phụ kiện đều là phụ kiện truyền thống (thêm trường `modern: true/false` vào `accessoriesData.js`; sneaker, túi tote là `modern: true`).
   - Cách tân tôn trọng bản sắc: không luật đỏ, có phụ kiện hiện đại hoặc có luật vàng.
   - Sáng tạo tự do: có luật đỏ (kèm lời giải thích giáo dục, không phán xét).
2. Hiển thị nhãn trên banner và trên ảnh Lookbook.

**Tiêu chí hoàn thành:** Gen Z Tết → "Cách tân"; Đám cưới hoàng tộc → "Truyền thống chuẩn mực".

---

### [ ] P2-08 · Chia sẻ mạng xã hội

**Phụ thuộc:** P0-01, P0-02

**File liên quan:** `src/components/LookbookModal.jsx`

**Các bước:**
1. Nút "Chia sẻ": dùng `navigator.share({ files: [pngFile], text, url })` nếu trình duyệt hỗ trợ (mobile); không thì fallback sao chép link + tải ảnh.
2. Text chia sẻ mẫu: "Mình vừa phối {tên bộ} đạt {điểm}/100 điểm hài hòa di sản trên Việt Phục Remix #VietPhucRemix {link}".
3. Thêm watermark nhỏ "Việt Phục Remix" góc ảnh (bản miễn phí – khớp mô hình gói Pro bỏ watermark).

**Tiêu chí hoàn thành:** Trên điện thoại Android/iOS mở được bảng chia sẻ hệ thống kèm ảnh.

---

### [ ] P2-09 · Rà soát responsive & hiệu năng

**File liên quan:** toàn bộ `src/components/`

**Các bước:**
1. Kiểm tra các độ rộng 360px, 768px, 1280px: không tràn ngang, nút bấm ≥ 40px, modal cuộn được.
2. Trên mobile: avatar hiển thị **trước** bảng điều khiển (đổi thứ tự cột bằng `order-*`), hoặc có nút nổi "Xem nhân vật".
3. Lazy-load các modal và trang Roadmap bằng `React.lazy` + `Suspense` để giảm bundle ban đầu (hiện ~112 KB gzip).
4. Chạy Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 90. Thêm `aria-label` cho nút chỉ có icon, thêm `alt`/`title` cho SVG.

**Tiêu chí hoàn thành:** Ghi điểm Lighthouse trước/sau vào phần Ghi chú.

---

## P3 – THỬ NGHIỆM NGƯỜI DÙNG & MINH CHỨNG (20–28/11/2026)

> Mục tiêu: có **số liệu thật** cho các chỉ tiêu đã ghi trong thuyết minh: thời gian tạo bộ phối < 3 phút, SUS ≥ 75, ≥ 80% trả lời đúng thêm ≥ 2 câu văn hóa, ≥ 30% chia sẻ Lookbook.

### [ ] P3-01 · Lớp đo lường sự kiện (analytics) tối giản

**File liên quan:** tạo `src/utils/analytics.js`

**Các bước:**
1. API: `track(eventName, props)`. Tự sinh `sessionId` ngẫu nhiên (không thu thập thông tin cá nhân).
2. Các sự kiện cần ghi: `session_start`, `outfit_change` (field), `first_complete_outfit` (kèm số giây từ lúc bắt đầu), `culture_guard_red`, `auto_fix_click`, `culture_card_open`, `quiz_complete` (điểm), `lookbook_export`, `share_click`, `partner_open`, `suggestion_apply`, `compare_open`.
3. Nơi gửi (chọn 1, cấu hình qua `VITE_ANALYTICS_ENDPOINT`):
   - Đơn giản nhất: **Google Apps Script Web App** ghi vào Google Sheets (gửi bằng `navigator.sendBeacon`/`fetch` `no-cors`).
   - Hoặc Firebase Firestore (nếu đã làm P4-01).
   - Không cấu hình endpoint → chỉ `console.debug`, không lỗi.
4. Có cờ tắt analytics trong chế độ tour demo.
5. Viết hướng dẫn tạo Apps Script trong `docs/analytics-setup.md` (code script mẫu đi kèm).

**Tiêu chí hoàn thành:** Dùng app 1 lượt → thấy các dòng sự kiện trong Google Sheets.

---

### [ ] P3-02 · Định nghĩa & đo "thời gian tạo bộ phối"

**Phụ thuộc:** P3-01

**Các bước:**
1. "Bộ phối hoàn chỉnh" = người dùng đã chọn sự kiện **và** đã đổi ít nhất 1 lựa chọn màu/phụ kiện **và** (xuất Lookbook **hoặc** bấm lưu/so sánh/chia sẻ).
2. Ghi `first_complete_outfit` với số giây từ `session_start`.

**Tiêu chí hoàn thành:** Có cột thời gian trong Sheets để tính trung vị.

---

### [ ] P3-03 · Khảo sát SUS + câu hỏi văn hóa trước/sau trong app

**Phụ thuộc:** P3-01

**File liên quan:** tạo `src/components/StudyMode.jsx`, `src/data/surveyData.js`

**Các bước:**
1. Bật bằng URL `?study=1` (link riêng phát cho người tham gia thử nghiệm).
2. Luồng: (a) đồng ý tham gia + nhóm tuổi (16–24 / 25–35 / 36–50 / 50+) → (b) **pre-test** 5 câu văn hóa → (c) nhiệm vụ: "Hãy phối 1 bộ đi lễ chùa và 1 bộ dạo phố Tết rồi xuất Lookbook" → (d) **post-test** cùng 5 câu (đảo thứ tự) → (e) 10 câu **SUS** chuẩn (thang 1–5, bản tiếng Việt) → (f) 1 câu mở góp ý.
3. Tính điểm SUS theo công thức chuẩn trong `src/utils/sus.js` (+ test): câu lẻ `x-1`, câu chẵn `5-x`, tổng × 2,5.
4. Gửi toàn bộ kết quả qua `analytics.js`.

**Tiêu chí hoàn thành:** Làm hết luồng ~6–8 phút; Sheets nhận đủ dữ liệu; điểm SUS tính đúng (test với bộ câu trả lời mẫu).

---

### [ ] P3-04 · Trang tổng hợp kết quả thử nghiệm (cho giám khảo)

**Phụ thuộc:** P3-01 → P3-03

**File liên quan:** `src/components/ProjectRoadmapPage.jsx` hoặc tạo `src/components/EvidencePage.jsx`, tạo `src/data/studyResults.json`

**Các bước:**
1. Script Node `scripts/summarize-study.mjs`: đọc file CSV xuất từ Google Sheets → tính: số người tham gia theo nhóm tuổi, trung vị thời gian tạo bộ phối, SUS trung bình, % trả lời đúng thêm ≥ 2 câu, % chia sẻ/xuất Lookbook, số lần Culture Guard đỏ được sửa bằng 1 click → ghi ra `src/data/studyResults.json`.
2. Trang hiển thị các chỉ số này dạng thẻ số lớn + biểu đồ cột đơn giản (SVG tự vẽ, không thêm thư viện chart), so với chỉ tiêu đặt ra (đạt/chưa đạt). **Không làm đẹp số liệu**: chưa đạt thì ghi chưa đạt.
3. Ghi rõ ngày thử nghiệm, cỡ mẫu n.

**Tiêu chí hoàn thành:** Có trang "Kết quả thử nghiệm" trích từ dữ liệu thật để dùng trong slide bán kết.

---

### [ ] P3-05 · Kịch bản demo bán kết (5 phút)

**File liên quan:** `src/components/AutoDemoTour.jsx`, `src/data/scenariosData.js`

**Các bước:**
1. Cập nhật tour để giới thiệu tính năng mới: gợi ý 3 bộ (P2-04), nhiều cảnh báo + 1-click (P1-04), QR thật (P0-02), so sánh (P2-05), quiz (P2-06), trang kết quả thử nghiệm (P3-04).
2. Tổng thời lượng ≤ 3 phút 30 giây (để dành thời gian thuyết trình). Phụ đề mới đi kèm; nếu chưa có file MP3 mới thì dùng speechSynthesis fallback sẵn có và ghi chú để nhóm thu âm lại.
3. Thêm phím tắt bàn phím cho người thuyết trình: `→` bước tiếp, `←` bước trước, `Esc` thoát.

**Tiêu chí hoàn thành:** Chạy tour trọn vẹn không lỗi trên bản deploy.

---

## P4 – BẢN TRÌNH DIỄN CHUNG KẾT (sau 29/11/2026)

> Chỉ làm nếu vào chung kết. Mục tiêu: chứng minh khả năng thương mại hóa (tiêu chí chung kết: Tiềm năng thị trường 25đ, Khả thi 20đ).

### [ ] P4-01 · PWA – cài được trên điện thoại, chạy offline

**File liên quan:** `vite.config.js`, `package.json`, `public/`

**Các bước:**
1. `npm install -D vite-plugin-pwa`; cấu hình manifest (tên, màu `#8B1A1A`, icon 192/512 tạo từ logo "VR"), service worker cache tài nguyên tĩnh + audio.
2. Kiểm tra `base: './'` hoạt động với service worker trên GitHub Pages (scope `/VietPhucRemix/`).

**Tiêu chí hoàn thành:** "Thêm vào màn hình chính" trên Android/iOS; tắt mạng vẫn mở và phối đồ được.

---

### [ ] P4-02 · Backend nhẹ bằng Firebase

**File liên quan:** tạo `src/services/firebase.js`, `.env.example`

**Các bước:**
1. Firebase Auth (Google + ẩn danh), Firestore. Config qua `VITE_FIREBASE_*` trong `.env.local`; thêm `.env.example` liệt kê biến (không có giá trị thật).
2. Collection: `users/{uid}/outfits`, `users/{uid}/badges`, `bookings`, `events` (analytics).
3. Đồng bộ bộ phối đã lưu và huy hiệu từ localStorage lên cloud khi đăng nhập.
4. Viết Firestore Security Rules: người dùng chỉ đọc/ghi dữ liệu của chính mình; `bookings` chỉ được tạo, không được sửa/xóa từ client.
5. App **vẫn chạy đầy đủ khi không đăng nhập** (Firebase là tùy chọn).

**Tiêu chí hoàn thành:** Đăng nhập trên máy A, thấy bộ phối đã lưu trên máy B.

---

### [ ] P4-03 · Thời tiết thật theo ngày & địa điểm

**File liên quan:** tạo `src/services/weather.js`, `src/components/StudioControls.jsx`, `src/data/eventsData.js`

**Các bước:**
1. Dùng **Open-Meteo** (miễn phí, không cần API key) thay cho OpenWeather để khỏi lộ key trên client. Cho chọn thành phố (Hà Nội, Huế, Đà Nẵng, TP.HCM, Cần Thơ, Hội An) + ngày (≤ 14 ngày tới).
2. Hàm thuần `weatherAdvice(forecast, garment) → { fabric, accessories[], note }` (+ test): ví dụ < 18°C → gợi ý gấm/áo khoác ngũ thân + khăn vấn; > 30°C → lụa/tơ tằm, quạt; mưa → tránh giày vải, gợi ý guốc/dép cói.
3. Lỗi mạng → quay về dữ liệu `weather` cứng đang có trong `eventsData.js`.

**Tiêu chí hoàn thành:** Đổi thành phố/ngày → khối thời tiết và lời khuyên cập nhật.

---

### [ ] P4-04 · Đặt lịch thuê/may tại tiệm đối tác

**Phụ thuộc:** P4-02 (hoặc dùng Apps Script như P3-01 nếu chưa có Firebase)

**File liên quan:** `src/components/PartnerModal.jsx`, tạo `src/components/BookingForm.jsx`

**Các bước:**
1. Form: tên, số điện thoại, ngày nhận đồ, thuê/may, size, ghi chú; tự đính kèm link bộ phối (P0-01) và ảnh Lookbook.
2. Kiểm tra định dạng số điện thoại Việt Nam; hiển thị điều khoản đồng ý xử lý dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP).
3. Gửi vào `bookings` + thông báo cho tiệm (email qua Apps Script hoặc Zalo OA ở giai đoạn sau).
4. Ghi sự kiện `booking_submit` để chứng minh tỷ lệ chuyển đổi (nền cho mô hình hoa hồng 10%).
5. Đánh dấu rõ trên UI nếu đối tác là **dữ liệu minh họa** chưa ký kết thật.

**Tiêu chí hoàn thành:** Gửi form → bản ghi xuất hiện trong Firestore/Sheets, người dùng nhận mã đặt lịch.

---

### [ ] P4-05 · Bảng quản trị nội dung cho cố vấn văn hóa

**Phụ thuộc:** P1-03, P4-02

**Các bước:**
1. Trang `?admin=1` (yêu cầu đăng nhập và email nằm trong danh sách admin trên Firestore).
2. Xem danh sách luật, lọc theo category/`source`, đánh dấu "Đã thẩm định" kèm tên người duyệt và ngày.
3. Xuất lại file JSON luật để commit vào repo (luật vẫn chạy từ file tĩnh, admin chỉ phục vụ quy trình duyệt).

**Tiêu chí hoàn thành:** Minh chứng cho "Lớp 2 – Thẩm định chuyên gia" trong thuyết minh.

---

### [ ] P4-06 · Phối đồ đôi / gia đình (Family Lookbook)

**Phụ thuộc:** P1-05

**Các bước:**
1. Cho phép tối đa 4 nhân vật (bố, mẹ, con trai, con gái) trên cùng một sân khấu, mỗi người một state outfit riêng; chọn nhân vật để chỉnh.
2. Luật mới category `dong-bo`: khen khi cả nhà cùng tông màu/ngũ hành tương sinh, nhắc khi lệch tông quá mạnh.
3. Lookbook gia đình xuất 1 ảnh chung + QR.

**Tiêu chí hoàn thành:** Đúng tính năng "Family Lookbook" đã hứa ở gói Pro.

---

## P5 – SAU CUỘC THI (tùy chọn)

- [ ] **P5-01** Trợ lý hỏi đáp văn hóa (RAG): chỉ trả lời từ kho `cultureCard` + luật đã thẩm định; gọi API qua **serverless function** (Cloudflare Workers / Firebase Functions) để không lộ key; luôn trích nguồn; câu hỏi ngoài kho → trả lời "chưa có dữ liệu đã thẩm định".
- [ ] **P5-02** Thêm dòng áo giao lĩnh, áo tấc (cần vẽ thêm lớp SVG trong `AvatarStage.jsx` + dữ liệu + luật + quiz).
- [ ] **P5-03** Bản song ngữ Việt – Anh (tách chuỗi UI ra `src/i18n/vi.js`, `en.js`).
- [ ] **P5-04** Chuyển sang TypeScript + test component (Vitest + Testing Library, jsdom).
- [ ] **P5-05** AI thử đồ trên ảnh thật (Virtual Try-On) – gói Pro, cần GPU cloud, đánh giá chi phí trước.
- [ ] **P5-06** Ứng dụng mobile (Flutter hoặc Capacitor bọc bản PWA).

---

## PHỤ LỤC A – DANH SÁCH ID DỮ LIỆU HIỆN CÓ

Dùng đúng các ID này khi viết luật, kịch bản, test. Thêm ID mới thì cập nhật bảng này.

| Loại | ID |
|---|---|
| Dòng áo (`garmentId`) | `ngu-than`, `tu-than`, `nhat-binh`, `ao-dai`, `ao-ba-ba` |
| Sự kiện (`eventId`) | `tet-xuan`, `le-chua`, `ky-yeu`, `dam-cuoi`, `hoi-lang`, `festival-hue`, `song-nuoc-nam-bo`, `su-kien-hoc-duong`, `cong-so-sang-tao`, `gia-dinh-sum-hop` |
| Màu (`*ColorId`) | `do-son` (Hỏa), `hoang-tho` (Thổ), `luc-bao` (Mộc), `lam-cham` (Thủy), `trang-su`, `tim-hue`, `nau-non`, `den-tuyen`, `hong-dao`, `xanh-co-vit` — hành của các màu còn lại xem `colorsData.js` |
| Phụ kiện đầu (`headAccessoryId`) | `khan-van`, `non-quai-thao`, `non-la-sen`, `khan-ran`, `tram-cai-sen`, `khong-mu` |
| Phụ kiện tay (`handAccessoryId`) | `quat-lua`, `tui-tote`, `tui-coi`, `chuoi-ngoc`, `khong-cam-tay` |
| Giày (`footAccessoryId`) | `sneaker-trang`, `guoc-moc`, `giay-bup-be`, `dep-coi` |
| Độ dài quần (`bottomLength`) | `long`, `short` |
| Chế độ (`mode`) | `genz`, `family` |
| Kịch bản demo | `genz-tet`, `temple-violation`, `royal-wedding`, `quan-ho-heritage` |

Quan hệ ngũ hành (`ELEMENT_RELATIONS` trong `colorsData.js`):
- Tương sinh: Mộc → Hỏa → Thổ → Kim → Thủy → Mộc
- Tương khắc: Mộc → Thổ, Thổ → Thủy, Thủy → Hỏa, Hỏa → Kim, Kim → Mộc

---

## PHỤ LỤC B – PROMPT MẪU ĐỂ GIAO TASK

**Giao 1 task:**
```
Đọc file PLAN.md trong thư mục VietPhucRemix. Đọc mục "0. Quy ước chung" và
làm task P1-03. Làm đúng các bước và tiêu chí hoàn thành của task. Chạy
npm run lint, npm run build, npm test và báo kết quả. Không làm task khác.
Xong thì đánh dấu [x] task trong PLAN.md và commit theo quy ước.
```

**Kiểm tra lại sau khi AI làm xong (nên dùng một phiên AI khác):**
```
Đọc PLAN.md, mục task P1-03. Kiểm tra code hiện tại đã đáp ứng TỪNG tiêu chí
hoàn thành chưa, chạy test, chạy thử 4 kịch bản demo. Liệt kê chỗ chưa đạt,
chưa sửa gì.
```

**Thứ tự đề xuất giao việc:**
P0-01 → P0-02 → P0-04 → P0-05 → P0-03 → P1-01 → P1-02 → P1-03 → P1-05 → P1-04 → P1-06 → P2-04 → P2-01 → P2-02 → P2-03 → P2-05 → P2-06 → P2-07 → P2-08 → P2-09 → P3-01 → P3-02 → P3-03 → P3-05 → (thu thập dữ liệu thử nghiệm) → P3-04 → P4-…
