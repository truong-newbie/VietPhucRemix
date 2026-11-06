// Hệ thống bảng màu Ngũ Hành & Sắc màu Di sản Cổ truyền Việt Nam
export const ELEMENT_RELATIONS = {
  // Tương sinh (Generating)
  generating: {
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
    'Kim': 'Thủy',
    'Thủy': 'Mộc'
  },
  // Tương khắc (Overcoming)
  overcoming: {
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
    'Kim': 'Mộc'
  }
};

export const COLOR_PALETTE = [
  {
    id: 'do-son',
    name: 'Đỏ Son Di Sản',
    hex: '#8B1A1A',
    element: 'Hỏa',
    category: 'Cung đình & Lễ hội',
    meaning: 'Tượng trưng cho sự may mắn, quyền quý, hỷ khí và nhiệt huyết của dân tộc Việt.',
    badge: 'Màu truyền thống'
  },
  {
    id: 'hoang-tho',
    name: 'Vàng Hoàng Thổ',
    hex: '#C9A227',
    element: 'Thổ',
    category: 'Vương giả & Đất mẹ',
    meaning: 'Sắc vàng của đất phù sa màu mỡ, biểu trưng cho sự trù phú, vững bền và vương quyền triều Nguyễn.',
    badge: 'Màu cung đình'
  },
  {
    id: 'luc-bao',
    name: 'Xanh Lục Bảo',
    hex: '#1F6F5C',
    element: 'Mộc',
    category: 'Thanh lịch & Sinh sôi',
    meaning: 'Sắc xanh ngọc bích của cỏ cây sông nước Việt, thể hiện sự thanh tao, nhã nhặn và trường thọ.',
    badge: 'Màu di sản'
  },
  {
    id: 'lam-cham',
    name: 'Xanh Lam Chàm',
    hex: '#1D2440',
    element: 'Thủy',
    category: 'Trang trọng & Uyên bác',
    meaning: 'Màu chàm cổ truyền gắn bó với đời sống các dân tộc, biểu trưng cho sự tĩnh lặng, sâu sắc và trí tuệ.',
    badge: 'Màu dân gian'
  },
  {
    id: 'trang-su',
    name: 'Trắng Sứ Ngà',
    hex: '#F5F5F0',
    textDark: true,
    element: 'Kim',
    category: 'Thuần khiết & Tinh khôi',
    meaning: 'Tượng trưng cho sự trong sáng, thanh bạch của tâm hồn người Việt, thường dùng làm áo trong hoặc áo dài học đường.',
    badge: 'Cơ bản'
  },
  {
    id: 'tim-hue',
    name: 'Tím Hoa Cà Xứ Huế',
    hex: '#5E2B54',
    element: 'Hỏa',
    category: 'Thơ mộng & Hoài cổ',
    meaning: 'Màu tím trầm mặc sông Hương, biểu tượng của sự son sắt, đoan trang và nét duyên thầm cố đô.',
    badge: 'Đặc trưng Huế'
  },
  {
    id: 'nau-non',
    name: 'Nâu Non Đất Gốm',
    hex: '#7A4B2A',
    element: 'Thổ',
    category: 'Mộc mạc & Thân thương',
    meaning: 'Màu của đất nung gốm Bát Tràng và áo nâu thôn dã, gợi nhớ cội nguồn cần cù, hiền hòa.',
    badge: 'Dân gian'
  },
  {
    id: 'den-tuyen',
    name: 'Đen Tuyền Nhã Nhặn',
    hex: '#212124',
    element: 'Thủy',
    category: 'Đĩnh đạc & Cổ kính',
    meaning: 'Sắc đen bóng của vải the, gấm đen thời Nguyễn, tôn lên vẻ đĩnh đạc, mực thước của người mặc.',
    badge: 'Màu lễ phục'
  },
  {
    id: 'hong-dao',
    name: 'Hồng Đào Xuân',
    hex: '#C75D74',
    element: 'Hỏa',
    category: 'Duyên dáng & Trẻ trung',
    meaning: 'Sắc hoa đào ngày Tết, mang lại nét rạng rỡ, tươi mới được thế hệ Gen Z đặc biệt ưa chuộng.',
    badge: 'Gen Z Remix'
  },
  {
    id: 'xanh-co-vit',
    name: 'Xanh Cổ Vịt Cổ Điển',
    hex: '#165B66',
    element: 'Thủy',
    category: 'Quý phái & Hiện đại',
    meaning: 'Sự giao thoa giữa màu xanh lục và lam, toát lên vẻ đài các, thời thượng cho người mặc.',
    badge: 'Phong cách'
  }
];

