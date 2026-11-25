// Dữ liệu 7 dòng trang phục truyền thống Việt Nam
export const GARMENTS_DATA = [
  {
    id: 'ngu-than',
    name: 'Áo Ngũ Thân Tay Chẽn',
    era: 'Triều Nguyễn (Thế kỷ 18–20)',
    region: 'Toàn quốc (Kế thừa từ sắc dụ Chúa Nguyễn Phúc Khoát 1744 & Vua Minh Mạng 1827)',
    regions: ['toan-quoc'],
    silhouette: 'Cổ đứng lập lĩnh, cài khuy sang nách phải, thân áo gồm 5 vạt tượng trưng cho Tứ thân phụ mẫu và Bản thân.',
    philosophy: 'Năm cúc áo tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) hoặc Ngũ Luân đạo lý làm người. Thể hiện sự kín đáo, đĩnh đạc và đoan trang.',
    gender: 'both', // nam & nữ
    defaultColors: {
      outer: '#8B1A1A',
      inner: '#F5F5F0',
      bottom: '#F5F5F0',
      belt: '#C9A227'
    },
    defaultAccessories: {
      head: 'khan-van',
      hand: 'quat-lua',
      foot: 'sneaker-trang'
    },
    tag: 'Di sản chuẩn mực',
    description: 'Trang phục chuẩn mực nhất của người Việt thời cận đại. Phù hợp cả Gen Z dạo phố bắt trend lẫn lễ nghi đại gia đình.',
    cultureCard: {
      title: 'Áo Ngũ Thân – Biểu tượng của sự chuẩn mực đạo lý',
      history: 'Năm 1744, Võ Vương Nguyễn Phúc Khoát ban sắc dụ định chế y phục Đàng Trong. Đến năm 1827-1837, vua Minh Mạng chuẩn hóa trang phục toàn quốc thành áo ngũ thân, thống nhất bản sắc y quan.',
      structure: 'Áo gồm 5 thân (thân trước 2 vạt lồng nhau, thân sau 2 vạt khâu sống giữa, thân con bên trong che chắn ngực). 5 chiếc khuy ngọc/đồng cài từ cổ sang nách phải.',
      modernRemix: 'Gen Z phối áo ngũ thân cùng quần âu ống suông hoặc quần lụa trắng, kết hợp sneaker trắng tạo nên phong cách vừa thanh lịch cổ kính vừa năng động, tự tin bước ra thế giới.'
    }
  },
  {
    id: 'tu-than',
    name: 'Áo Tứ Thân Bắc Bộ',
    era: 'Thế kỷ 12 đến đầu thế kỷ 20',
    region: 'Đồng bằng Bắc Bộ',
    regions: ['bac'],
    silhouette: 'Thân áo mở trước, 2 tà trước buộc vạt buông lơi, bên trong mặc yếm thắm và thắt lưng lụa đào rực rỡ.',
    philosophy: 'Bốn tà áo tượng trưng cho tứ thân phụ mẫu (bố mẹ đẻ và bố mẹ chồng). Vạt yếm ôm trọn vẻ đẹp duyên dáng, kín đáo mà quyến rũ của phụ nữ Kinh Bắc.',
    gender: 'female',
    defaultColors: {
      outer: '#7A4B2A',
      inner: '#8B1A1A', // Yếm đào
      bottom: '#212124', // Váy đen lĩnh
      belt: '#C9A227' // Khăn bao ngũ sắc
    },
    defaultAccessories: {
      head: 'non-quai-thao',
      hand: 'quat-lua',
      foot: 'guoc-moc'
    },
    tag: 'Dân ca & Lễ hội',
    description: 'Trang phục gắn liền với các làn điệu Quan họ, hội Lim và không gian làng quê Bắc Bộ thanh bình.',
    cultureCard: {
      title: 'Áo Tứ Thân – Hồn cốt người con gái Kinh Bắc',
      history: 'Xuất hiện từ rất sớm trong lịch sử dân tộc để thuận tiện cho việc lao động đồng áng nhưng khi vào mùa trẩy hội xuân lại trở thành xiêm y rực rỡ nhiều lớp màu sắc.',
      structure: 'Gồm áo khoác tứ thân bên ngoài (tà trước dài để thắt mối), yếm cổ xây hoặc yếm cánh sen bên trong, dây lưng bao ngũ sắc và váy lụa xòe dài.',
      modernRemix: 'Phối áo tứ thân cách tân với chân váy xòe hiện đại, hoặc biến tấu khăn bao thành thắt lưng thời trang, kết hợp phụ kiện túi cói tạo diện mạo du xuân cực kỳ ấn tượng.'
    }
  },
  {
    id: 'nhat-binh',
    name: 'Áo Nhật Bình Cung Đình',
    era: 'Triều Nguyễn (1802–1945)',
    region: 'Kinh đô Huế – Cung đình Việt Nam',
    regions: ['trung'],
    silhouette: 'Cổ áo hình chữ nhật viền bản lớn trước ngực, vạt áo rộng dài xẻ trước, dải ngũ sắc rực rỡ nơi cổ tay áo.',
    philosophy: 'Trang phục thường triều của Hoàng hậu, Công chúa và Cung tần triều Nguyễn; sau trở thành lễ phục cưới hỏi của bậc tiểu thư quý tộc danh giá.',
    gender: 'female',
    defaultColors: {
      outer: '#C9A227', // Hoàng thổ hoặc Đỏ son
      inner: '#F5F5F0',
      bottom: '#F5F5F0',
      belt: '#8B1A1A'
    },
    defaultAccessories: {
      head: 'tram-cai-sen',
      hand: 'quat-lua',
      foot: 'guoc-moc'
    },
    tag: 'Hoàng tộc & Tiệc cưới',
    description: 'Đỉnh cao của sự lộng lẫy và quý phái. Dòng trang phục hot nhất hiện nay cho ảnh cưới truyền thống và sự kiện gia đình thượng lưu.',
    cultureCard: {
      title: 'Áo Nhật Bình – Vương giả cung đình triều Nguyễn',
      history: 'Quy định trong Khâm định Đại Nam hội điển sự lệ. Tùy theo phẩm cấp hoàng gia mà màu sắc và hoa văn thêu phượng, tường vân được quy chuẩn ngặt nghèo.',
      structure: 'Đặc trưng bởi cổ chữ nhật kép nẹp viền thêu chỉ vàng, hoa văn sóng nước thủy ba ở gấu áo và dải màu ngũ hành (ngũ sắc) viền tay áo.',
      modernRemix: 'Là lựa chọn số 1 cho các cặp đôi Gen Z và gia đình tổ chức lễ cưới hỏi truyền thống, hoặc chụp ảnh kỷ niệm gia đình sum vầy mang tinh thần tự hào cội nguồn.'
    }
  },
  {
    id: 'ao-dai',
    name: 'Áo Dài Di Sản (Truyền Thống & Cách Tân)',
    era: 'Thế kỷ 20 đến đương đại',
    region: 'Quốc phục toàn thể người Việt Nam',
    regions: ['toan-quoc'],
    silhouette: 'Thân áo ôm sát nhẹ nhàng, hai tà áo thướt tha buông dài từ eo xuống cổ chân, cổ đứng thanh lịch, mặc cùng quần lụa suông rộng.',
    philosophy: 'Biểu tượng tối thượng của người phụ nữ và văn hóa Việt Nam trên trường quốc tế: dịu dàng, duyên dáng, mềm mại nhưng kiên cường.',
    gender: 'both',
    defaultColors: {
      outer: '#1F6F5C',
      inner: '#F5F5F0',
      bottom: '#F5F5F0',
      belt: '#C9A227'
    },
    defaultAccessories: {
      head: 'non-la-sen',
      hand: 'tui-tote',
      foot: 'sneaker-trang'
    },
    tag: 'Quốc phục vượt thời gian',
    description: 'Thân thuộc nhất nhưng cũng đa năng nhất. Từ sân trường đại học, công sở, lễ tết đến sàn diễn thời trang Paris.',
    cultureCard: {
      title: 'Áo Dài – Quốc hồn quốc túy người Việt',
      history: 'Tiến hóa từ áo ngũ thân lập lĩnh qua bàn tay các họa sĩ Lemur Cát Tường, Lê Phổ đầu thế kỷ 20, áo dài đã trở thành biểu tượng thị giác đặc trưng của Việt Nam trên toàn cầu.',
      structure: 'Cổ đứng từ 2-4cm kín đáo, thân may chít eo khéo léo tôn dáng, hai tà áo buông rủ bay lượn theo từng bước chân.',
      modernRemix: 'Gen Z phối áo dài vải đũi/linen cùng giày sneaker hoặc mang túi tote vải in họa tiết trống đồng, tạo vẻ đẹp vừa hoài niệm vừa tràn đầy nhịp thở thế hệ mới.'
    }
  },
  {
    id: 'ao-ba-ba',
    name: 'Áo Bà Ba Nam Bộ',
    era: 'Thế kỷ 19 đến nay',
    region: 'Đồng bằng sông Cửu Long – Nam Bộ hào sảng',
    regions: ['nam'],
    silhouette: 'Áo xẻ tà ngắn hai bên hông, cổ tròn hoặc cổ tim thoáng mát, hai túi phía trước, vạt áo ngắn chấm hông mềm mại.',
    philosophy: 'Tượng trưng cho cốt cách phóng khoáng, chân thành, đôn hậu và quật cường của con người Nam Bộ sông nước miền Tây.',
    gender: 'both',
    defaultColors: {
      outer: '#165B66',
      inner: '#F5F5F0',
      bottom: '#212124',
      belt: '#F5F5F0' // Khăn rằn
    },
    defaultAccessories: {
      head: 'khan-ran',
      hand: 'tui-coi',
      foot: 'guoc-moc'
    },
    tag: 'Hào sảng phương Nam',
    description: 'Gần gũi, mát mẻ, giàu chất thơ sông nước. Lựa chọn tuyệt vời cho các chuyến du lịch, chụp ảnh ngoại cảnh về nguồn.',
    cultureCard: {
      title: 'Áo Bà Ba – Nét duyên thầm miền đồng bằng sông nước',
      history: 'Gắn liền với công cuộc khai hoang mở cõi phương Nam. Chiếc áo bà ba bằng vải đen hoặc the nhuộm bùn đã trở thành hình bóng thân thương của mẹ và chị.',
      structure: 'Thân áo xẻ hai bên hông, hàng khuy bấm chính giữa ngực, tay áo dài hoặc lửng, thường phối cùng chiếc khăn rằn Nam Bộ và nón lá.',
      modernRemix: 'Bà ba cách tân lụa tơ tằm phối cùng quần culottes hiện đại và dép cói đan tay, rất được các bạn trẻ và du khách quốc tế yêu thích trong các festival văn hóa.'
    }
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    era: 'Triều Nguyễn (Thế kỷ 18–20)',
    region: 'Toàn quốc (Lễ phục trang trọng tại Huế, Bắc Bộ & Nam Bộ)',
    regions: ['toan-quoc', 'trung'],
    silhouette: 'Phom ngũ thân cổ đứng cài khuy nách phải nhưng tay áo rộng thụng dài, biểu trưng cho sự khoan thai, lễ nghi.',
    philosophy: 'Được mệnh danh là “Lễ phục quốc dân” thời Nguyễn: ống tay rộng giữ cử chỉ chậm rãi, đoan trang trong tế lễ, cưới hỏi, mừng thọ.',
    gender: 'both',
    defaultColors: {
      outer: '#1D2440',
      inner: '#F5F5F0',
      bottom: '#F5F5F0',
      belt: '#C9A227'
    },
    defaultAccessories: {
      head: 'khan-van',
      hand: 'quat-lua',
      foot: 'guoc-moc'
    },
    tag: 'Đại lễ & Nghi thức',
    description: 'Dòng áo ngũ thân tay rộng cực kỳ được giới trẻ ưa chuộng trong lễ cưới truyền thống, tốt nghiệp và lễ hội văn hóa.',
    cultureCard: {
      title: 'Áo Tấc – Lễ phục trang nghiêm bậc nhất của người Việt',
      history: 'Từ thời Chúa Nguyễn Phúc Khoát đến triều Minh Mạng, áo Tấc là lễ phục chuẩn mực trong các dịp tế tự, cưới hỏi, mừng thọ của cả quan lại lẫn thường dân.',
      structure: 'Kết cấu 5 thân và 5 khuy ngọc/đồng giống áo ngũ thân tay chẽn, nhưng ống tay rộng từ 25–40cm buông rủ che khuất bàn tay khi chắp tay hành lễ.',
      modernRemix: 'Áo Tấc gấm hoa chìm phối cùng quần lụa trắng và guốc mộc là lựa chọn hàng đầu cho ảnh kỷ yếu đại học, lễ ăn hỏi và chụp hình Tết cổ truyền.'
    }
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh Cổ Chéo',
    era: 'Thời Lý – Trần – Lê Sơ (Thế kỷ 11–17)',
    region: 'Thăng Long – Đại Việt (Cổ phục tiền triều)',
    regions: ['bac', 'toan-quoc'],
    silhouette: 'Cổ áo vạt chéo giao nhau trước ngực tạo hình chữ Y (vạt trái đắp lên vạt phải), thân rộng, thường mặc cùng thường/váy hoặc quần rộng.',
    philosophy: 'Thể hiện tinh thần phóng khoáng, uy nghi của văn hóa Đại Việt thời Lý – Trần – Lê, kết nối trực tiếp với dòng chảy mỹ thuật cổ.',
    gender: 'both',
    defaultColors: {
      outer: '#1F6F5C',
      inner: '#F5F5F0',
      bottom: '#212124',
      belt: '#C9A227'
    },
    defaultAccessories: {
      head: 'khong-mu',
      hand: 'quat-lua',
      foot: 'guoc-moc'
    },
    tag: 'Cổ phong Đại Việt',
    description: 'Kiểu áo cổ chéo đặc trưng giai đoạn trước sắc dụ 1744, nổi bật với dải nẹp cổ bản lớn và thắt lưng lụa.',
    cultureCard: {
      title: 'Áo Giao Lĩnh – Dấu ấn y phục Đại Việt thời Lý – Trần – Lê',
      history: 'Trước khi áo lập lĩnh ngũ thân phổ biến vào thế kỷ 18, giao lĩnh là kiểu thức áo phổ quát của người Việt qua nhiều thế kỷ, được ghi chép trong các bia ký và tượng cổ.',
      structure: 'Hai vạt trước bắt chéo theo quy tắc tả khâm (vạt trái phủ lên vạt phải), cố định bằng dây buộc hông và dải đai thắt lưng.',
      modernRemix: 'Giới trẻ yêu cổ phong thường chọn Áo Giao Lĩnh vải lụa trơn hoặc đũi mộc khi tham gia hội thảo văn hóa, chụp ảnh di tích Hoàng thành Thăng Long.'
    }
  }
];

