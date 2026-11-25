// Dữ liệu khảo sát thực nghiệm (?study=1): 5 câu đối chứng văn hóa + 10 câu SUS chuẩn tiếng Việt

export const AGE_GROUPS = ['16–24', '25–35', '36–50', '50+'];

export const CULTURAL_SURVEY_QUESTIONS = [
  {
    id: 'cs-1',
    question: 'Áo Ngũ Thân có 5 khuy cài từ cổ sang nách phải tượng trưng cho điều gì?',
    options: ['Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín)', 'Ngũ Hành', 'Ngũ Phúc', 'Ngũ Vị'],
    correctIndex: 0
  },
  {
    id: 'cs-2',
    question: 'Khi đi lễ chùa, màu sắc và phom dáng nào cần tránh để giữ nét tôn nghiêm?',
    options: ['Lam chàm & áo dài kín cổ', 'Đỏ son rực rỡ & quần/váy ngắn', 'Nâu non & quần dài', 'Lục bảo & guốc mộc'],
    correctIndex: 1
  },
  {
    id: 'cs-3',
    question: 'Nón Quai Thao (Nón Ba Tầm) là phụ kiện đặc trưng của dòng áo nào?',
    options: ['Áo Bà Ba Nam Bộ', 'Áo Tứ Thân Bắc Bộ', 'Áo Nhật Bình Huế', 'Áo Dài Lemur'],
    correctIndex: 1
  },
  {
    id: 'cs-4',
    question: 'Áo Giao Lĩnh có đặc điểm nhận diện nào ở phần cổ áo?',
    options: ['Cổ chữ nhật bản lớn', 'Cổ đứng cài khuy bên', 'Hai vạt cổ đắp chéo hình chữ Y (tả khâm)', 'Cổ tròn không viền'],
    correctIndex: 2
  },
  {
    id: 'cs-5',
    question: 'Trong Ngũ Hành Ngũ Sắc, khi áo (Thủy) xung khắc quần (Hỏa), thắt lưng hành nào giúp hòa giải?',
    options: ['Hành Mộc (Xanh Lục Bảo)', 'Hành Kim (Trắng Sứ)', 'Hành Thủy (Đen)', 'Hành Hỏa (Đỏ)'],
    correctIndex: 0
  }
];

export const SUS_QUESTIONS_VI = [
  'Tôi nghĩ rằng mình sẽ muốn sử dụng nền tảng này thường xuyên.',
  'Tôi thấy ứng dụng này phức tạp một cách không cần thiết.',
  'Tôi thấy ứng dụng này dễ sử dụng.',
  'Tôi nghĩ mình cần sự hỗ trợ của người có chuyên môn kỹ thuật để dùng được ứng dụng này.',
  'Tôi thấy các chức năng khác nhau trong ứng dụng được tích hợp rất mạch lạc.',
  'Tôi thấy ứng dụng có quá nhiều điểm thiếu nhất quán.',
  'Tôi hình dung đa số mọi người sẽ học cách dùng ứng dụng này rất nhanh.',
  'Tôi thấy ứng dụng này khá cồng kềnh khi thao tác.',
  'Tôi cảm thấy rất tự tin khi sử dụng ứng dụng này.',
  'Tôi cần phải tìm hiểu rất nhiều thứ trước khi có thể bắt đầu sử dụng ứng dụng.'
];
