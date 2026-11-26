// Tọa độ & chú giải "Giải phẫu Di sản" trên sân khấu 2.5D/3D cho 7 dòng cổ phục

export const GARMENT_HOTSPOTS = {
  'ngu-than': [
    {
      id: 'co-dung-kep',
      label: 'Cổ đứng kép',
      position: [0, 0.56, 0.09],
      title: 'Cổ đứng viền kép (Cổ Ngũ Thân)',
      detail: 'Cổ cao ôm vừa vặn, lót lớp vải trắng ngà bên trong tượng trưng cho sự chính trực, kín đáo của người quân tử và phụ nữ xưa.',
      source: 'Ngàn năm áo mũ — Trần Quang Đức'
    },
    {
      id: 'khuy-ngu-thuong',
      label: '5 Hạt khuy',
      position: [0.16, 0.34, 0.09],
      title: '5 Hạt khuy Ngũ Thường',
      detail: 'Cài chéo từ cổ sang nách phải tượng trưng cho 5 đức tính: Nhân – Lễ – Nghĩa – Trí – Tín; 4 vạt ngoài + 1 vạt con (5 thân) tượng trưng Tứ thân phụ mẫu & bản thân.',
      source: 'Bảo tàng Lịch sử Quốc gia'
    },
    {
      id: 'ta-buong-bay',
      label: 'Tà lụa 5 thân',
      position: [-0.18, -0.22, 0.09],
      title: 'Phom dáng xòe nhẹ, sóng tà uyển chuyển',
      detail: 'Áo Ngũ Thân Tay Chẽn (Lập Lĩnh) có phần nách cắt rộng thoáng nhưng cổ tay bó gọn, thuận tiện sinh hoạt thường nhật và dạo phố.',
      source: 'Tư liệu Đình Làng Việt'
    }
  ],
  'ao-tac': [
    {
      id: 'tay-thung',
      label: 'Tay thụng 40cm',
      position: [-0.42, 0.06, 0.09],
      title: 'Tay áo thụng đại lễ (Áo Tấc)',
      detail: 'Ống tay rộng rủ dài tượng trưng cho sự rộng lượng, bao dung; khi hành lễ hai tay chắp kín trang nghiêm.',
      source: 'Ngàn năm áo mũ — Trần Quang Đức'
    },
    {
      id: 'co-ao-tac',
      label: 'Cổ lập lĩnh',
      position: [0, 0.56, 0.09],
      title: 'Cổ đứng & vạt chéo cài nách phải',
      detail: 'Giữ nguyên cấu trúc 5 thân truyền thống nhà Nguyễn nhưng nâng tầm kích thước tay áo dùng trong tế lễ, cưới hỏi, vinh quy.',
      source: 'Bảo tàng Cổ vật Cung đình Huế'
    },
    {
      id: 'quan-ong-suong',
      label: 'Quần ống suông',
      position: [0.12, -0.62, 0.09],
      title: 'Quần hai ống dài chấm gót',
      detail: 'Thường may bằng lụa trắng ngà hoặc đồng màu nhã nhặn để tôn sắc áo gấm/lụa bên ngoài.',
      source: 'Tư liệu Di sản Triều Nguyễn'
    }
  ],
  'nhat-binh': [
    {
      id: 'nep-nguc-vang',
      label: 'Nẹp ngực gấm',
      position: [0, 0.42, 0.09],
      title: 'Cổ đối khâm hình chữ nhật (Nhật Bình)',
      detail: 'Hai dải nẹp lớn thêu kim tuyến song song trước ngực khép lại tạo thành hình chữ Nhật (日), lấy cảm hứng từ Phi Phong thời Minh–Nguyễn.',
      source: 'Bảo tàng Cổ vật Cung đình Huế'
    },
    {
      id: 'tay-ngu-sac',
      label: 'Tay ngũ sắc',
      position: [0.4, 0.08, 0.09],
      title: 'Dải ngũ sắc ống tay áo',
      detail: 'Phần cổ tay ghép 5 màu tương ứng Ngũ Hành (Xanh – Vàng – Trắng – Đỏ – Chàm/Tím), thể hiện quy chuẩn phẩm phục hoàng gia.',
      source: 'Khâm Định Đại Nam Hội Điển'
    },
    {
      id: 'dai-lua-eo',
      label: 'Đai thắt eo',
      position: [-0.14, 0.12, 0.09],
      title: 'Đai lụa buông mềm',
      detail: 'Áo Nhật Bình khoác ngoài không cài khuy như Ngũ Thân mà giữ dáng bằng dây buộc trước ngực hoặc đai lụa rủ.',
      source: 'Bảo tàng Cổ vật Cung đình Huế'
    }
  ],
  'giao-linh': [
    {
      id: 'co-cheo-giao-linh',
      label: 'Cổ chéo chữ Y',
      position: [0, 0.48, 0.09],
      title: 'Cổ Giao Lĩnh vạt trái vắt qua phải (Hữu Nhậm)',
      detail: 'Phom cổ phục kinh điển thời Lý – Trần – Lê: hai vạt giao nhau trước ngực tạo hình chữ Y trang nghiêm, nẹp cổ bản rộng nổi bật.',
      source: 'Ngàn năm áo mũ — Trần Quang Đức'
    },
    {
      id: 'dai-lua-giao-linh',
      label: 'Đai buông 2 dải',
      position: [-0.12, 0.1, 0.09],
      title: 'Khăn bao / Đai lụa thắt nút giữa eo',
      detail: 'Áo Giao Lĩnh dùng đai lưng cố định phom dáng và tạo điểm nhấn sắc màu tương sinh theo Ngũ Hành.',
      source: 'Bảo tàng Lịch sử Quốc gia'
    },
    {
      id: 'tay-ao-le-so',
      label: 'Tay rộng Đại Việt',
      position: [0.4, 0.05, 0.09],
      title: 'Tay thụng rộng phóng khoáng',
      detail: 'Độ xòe ống tay vừa phải, thể hiện khí chất tự do, hào sảng của văn hóa Đại Việt trước thế kỷ XVIII.',
      source: 'Ngàn năm áo mũ — Trần Quang Đức'
    }
  ],
  'tu-than': [
    {
      id: 'yem-dao',
      label: 'Yếm đào',
      position: [0, 0.42, 0.09],
      title: 'Yếm đào cổ tròn / cổ xẻ Kinh Bắc',
      detail: 'Lớp áo trong tạo điểm nhấn duyên dáng phía sau hai tà áo trước buông lơi hoặc buộc vạt của Áo Tứ Thân Bắc Bộ.',
      source: 'Di sản Văn hóa Quan họ Bắc Ninh'
    },
    {
      id: 'khan-bao',
      label: 'Khăn bao lụa',
      position: [0.12, 0.14, 0.09],
      title: 'Ruột tượng / Thắt lưng bao xanh hoa lý',
      detail: 'Thắt ngang eo cố định 4 tà áo (2 tà trước, 2 tà sau) giúp dáng người thon gọn khi trẩy hội xuân.',
      source: 'Bảo tàng Dân tộc học Việt Nam'
    },
    {
      id: 'vay-linh',
      label: 'Váy lĩnh đen',
      position: [-0.14, -0.45, 0.09],
      title: 'Váy đụp / Váy lĩnh lụa dài',
      detail: 'Kết hợp cùng áo Tứ Thân và nón Quai Thao tạo nên hình ảnh đặc trưng của liền chị vùng đồng bằng Bắc Bộ.',
      source: 'Di sản Văn hóa Quan họ Bắc Ninh'
    }
  ],
  'ao-ba-ba': [
    {
      id: 'co-tim-ba-ba',
      label: 'Cổ tim thoáng',
      position: [0, 0.5, 0.09],
      title: 'Cổ tròn / cổ tim thanh thoát Nam Bộ',
      detail: 'Thiết kế không cổ đứng giúp thoáng khí trong khí hậu nhiệt đới sông nước phương Nam.',
      source: 'Bảo tàng Áo Dài TP.HCM'
    },
    {
      id: 'hang-khuy-giua',
      label: 'Hàng khuy thẳng',
      position: [0, 0.24, 0.09],
      title: 'Hàng khuy cài giữa & hai túi trước',
      detail: 'Đơn giản, thực dụng nhưng tôn đường nét gọn gàng, gần gũi của người dân Nam Bộ.',
      source: 'Bảo tàng Phụ nữ Nam Bộ'
    },
    {
      id: 'xe-ta-hong',
      label: 'Xẻ tà hai bên',
      position: [-0.22, -0.02, 0.09],
      title: 'Tà ngắn xẻ nhẹ ngang hông',
      detail: 'Phù hợp vận động chèo xuồng, sinh hoạt miệt vườn hay dạo phố phong cách tối giản.',
      source: 'Bảo tàng Phụ nữ Nam Bộ'
    }
  ],
  'ao-dai': [
    {
      id: 'co-cao-om-eo',
      label: 'Phom chiết eo',
      position: [0, 0.25, 0.09],
      title: 'Áo Dài Di Sản chiết eo thanh lịch',
      detail: 'Kế thừa từ áo Ngũ Thân cổ truyền kết hợp kỹ thuật cắt may hiện đại thế kỷ XX để tôn vóc dáng mềm mại.',
      source: 'Bảo tàng Áo Dài TP.HCM'
    },
    {
      id: 'co-dung-ao-dai',
      label: 'Cổ đứng thanh tú',
      position: [0, 0.56, 0.09],
      title: 'Cổ cao truyền thống',
      detail: 'Giữ nét kín đáo, trang nhã phương Đông khi dự lễ tốt nghiệp, cưới hỏi hay sự kiện đối ngoại.',
      source: 'Bảo tàng Áo Dài TP.HCM'
    },
    {
      id: 'ta-xe-cao',
      label: 'Hai tà bay cao',
      position: [0.18, -0.35, 0.09],
      title: 'Hai tà xẻ cao từ eo buông qua gối',
      detail: 'Tạo chuyển động thướt tha theo từng bước chân cùng quần lụa ống rộng đồng điệu.',
      source: 'Bảo tàng Áo Dài TP.HCM'
    }
  ]
};

export function getHotspotsForGarment(garmentId) {
  return GARMENT_HOTSPOTS[garmentId] || GARMENT_HOTSPOTS['ngu-than'];
}
