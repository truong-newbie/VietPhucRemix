// Công thức tính điểm SUS chuẩn Brooke (1996): 10 câu thang 1-5 -> thang [0, 100]

export function calculateSusScore(answers = []) {
  if (!Array.isArray(answers) || answers.length !== 10) {
    throw new Error('Bảng hỏi SUS bắt buộc đủ 10 câu trả lời (1..5).');
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const val = Number(answers[i]);
    if (!Number.isFinite(val) || val < 1 || val > 5) {
      throw new Error(`Giá trị câu SUS số ${i + 1} không hợp lệ: ${answers[i]}`);
    }
    // Chỉ số 0-based: câu lẻ (i=0,2,4,6,8) -> val - 1; câu chẵn (i=1,3,5,7,9) -> 5 - val
    sum += i % 2 === 0 ? val - 1 : 5 - val;
  }

  return Number((sum * 2.5).toFixed(2));
}

export function classifySusGrade(score) {
  if (score >= 85) return { grade: 'A', label: 'Xuất sắc' };
  if (score >= 75) return { grade: 'B', label: 'Tốt (Đạt mục tiêu)' };
  if (score >= 68) return { grade: 'C', label: 'Khá / Chấp nhận được' };
  return { grade: 'D', label: 'Cần cải thiện' };
}
