// Sinh các bề mặt khám phá (SEO/GEO/AX) từ một nguồn duy nhất: robots.txt, sitemap.xml,
// llms.txt, llms-full.txt và bản Markdown của trang chủ (index.html.md).
// Origin lấy từ VITE_SITE_URL (điền trong .env / Vercel), mặc định là domain Vercel dự kiến.

const SUMMARY =
  'Nền tảng phối Việt phục tương tác thời gian thực cho Gen Z và gia đình, có Lá chắn Văn hóa (Culture Guard) 210 luật, Chấm điểm Ngũ hành (Harmony Score), sân khấu 3D 360°, AI thử ảnh thật và Cố vấn Văn hóa RAG có trích dẫn nguồn.';

const FEATURES = [
  ['Phòng Phối Đồ 2D', 'Phối 7 dòng cổ phục (Áo Ngũ Thân, Áo Tấc, Nhật Bình, Giao Lĩnh, Tứ Thân, Áo Dài Di Sản...) với màu sắc, phụ kiện theo sự kiện và vùng miền Bắc – Trung – Nam.'],
  ['Culture Guard', '210 luật văn hóa khai báo (tôn nghiêm, vùng miền, màu sắc, phom dáng, phụ kiện, ngũ hành, đồng bộ gia đình) cảnh báo phối sai và tự động sửa.'],
  ['Harmony Score', 'Chấm điểm hài hòa màu sắc theo tương sinh – tương khắc Ngũ hành, có giải thích.'],
  ['Gợi ý thông minh', '3 phương án phối không vi phạm đỏ theo sự kiện, phong cách và thời tiết thực (Open-Meteo).'],
  ['Sân khấu 3D 360°', 'Xem trang phục xoay 360° với chất liệu lụa tơ tằm, gấm ánh kim, đũi mộc.'],
  ['AI Thử Ảnh Thật', 'Tải ảnh chân dung để AI ướm thử Việt phục (giới hạn lượt/ngày).'],
  ['Cố vấn Văn hóa RAG', 'Hỏi đáp về lịch sử, nghi thức mặc; chỉ trả lời từ tư liệu đã thẩm định, luôn kèm nguồn.'],
  ['Lookbook & Gia đình', 'Xuất ảnh lookbook cá nhân hoặc cả gia đình, chia sẻ qua link.'],
  ['Đặt thuê / may đo', 'Gửi yêu cầu thuê hoặc may đo tới tiệm đối tác, có đồng ý xử lý dữ liệu theo Nghị định 13.']
];

export function normalizeOrigin(raw) {
  const v = String(raw || '').trim().replace(/\/+$/, '');
  return v || 'https://viet-phuc-remix.vercel.app';
}

export function buildSurfaces(origin, lastmod = new Date().toISOString().slice(0, 10)) {
  const featureMd = FEATURES.map(([t, d]) => `- **${t}:** ${d}`).join('\n');

  const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${origin}/</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n</urlset>\n`;

  const homeMd = `# Việt Phục Remix – Nền tảng Phối đồ Di sản Thông minh\n\nCanonical: ${origin}/\nCập nhật: ${lastmod}\n\n> ${SUMMARY}\n\nDự án khởi nghiệp sinh viên HaUI Startup Mindset 2026, hướng tới công nghiệp văn hóa sáng tạo (Nghị quyết 33-NQ/TW, 68-NQ/TW).\n\n## Tính năng\n\n${featureMd}\n\n## Dùng thử\n\n- Mở ${origin}/ trên trình duyệt (hỗ trợ cài đặt dạng PWA).\n- Bấm "Tự Động Demo (3p)" để xem chuyến tham quan tự động 3 phút.\n`;

  const llms = `# Việt Phục Remix\n\n> ${SUMMARY}\n\nỨng dụng web tiếng Việt, chạy hoàn toàn trên trình duyệt; dữ liệu cá nhân chỉ đồng bộ khi người dùng đăng nhập.\n\n## Trang\n\n- [Trang chủ – Phòng Phối Đồ](${origin}/index.html.md): Giới thiệu và danh sách tính năng.\n\n## Tùy chọn\n\n- [Toàn văn](${origin}/llms-full.txt): Toàn bộ nội dung công khai trong một file.\n`;

  const llmsFull = `${homeMd}\n## Cách Culture Guard hoạt động\n\nMỗi luật gồm điều kiện (sự kiện, trang phục, màu, phụ kiện), mức độ (đỏ/vàng/xanh), lời giải thích và nguồn tư liệu. Luật chưa có nguồn được gắn nhãn "CẦN THẨM ĐỊNH" cho tới khi cố vấn văn hóa xác nhận.\n\n## Cố vấn Văn hóa RAG\n\nTruy xuất tư liệu đã thẩm định (Ngàn năm áo mũ, Bảo tàng Lịch sử Quốc gia...) rồi mới tạo câu trả lời; câu hỏi ngoài phạm vi sẽ được từ chối thay vì suy đoán.\n`;

  return {
    'robots.txt': { body: robots, type: 'text/plain; charset=utf-8' },
    'sitemap.xml': { body: sitemap, type: 'application/xml; charset=utf-8' },
    'llms.txt': { body: llms, type: 'text/markdown; charset=utf-8', noindex: true },
    'llms-full.txt': { body: llmsFull, type: 'text/markdown; charset=utf-8', noindex: true },
    'index.html.md': { body: homeMd, type: 'text/markdown; charset=utf-8', noindex: true },
    'index.md': { body: homeMd, type: 'text/markdown; charset=utf-8', noindex: true }
  };
}

export function discoverySurfacesPlugin(rawOrigin) {
  const origin = normalizeOrigin(rawOrigin);
  return {
    name: 'vpr-discovery-surfaces',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', origin);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || '').split('?')[0].replace(/^\//, '');
        const surfaces = buildSurfaces(origin);
        const file = surfaces[path];
        if (!file) return next();
        res.setHeader('Content-Type', file.type);
        if (file.noindex) res.setHeader('X-Robots-Tag', 'noindex');
        res.end(file.body);
      });
    },
    generateBundle() {
      const surfaces = buildSurfaces(origin);
      for (const [fileName, file] of Object.entries(surfaces)) {
        this.emitFile({ type: 'asset', fileName, source: file.body });
      }
    }
  };
}
