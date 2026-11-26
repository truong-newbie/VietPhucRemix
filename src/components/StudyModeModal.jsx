import React, { useState } from 'react';
import { ClipboardCheck, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { AGE_GROUPS, CULTURAL_SURVEY_QUESTIONS, SUS_QUESTIONS_VI } from '../data/surveyData';
import { calculateSusScore, classifySusGrade } from '../utils/sus';
import { getSupabaseClient } from '../services/supabase';
import { getSessionId } from '../utils/analytics';
import { loadJson, saveJson } from '../utils/storage';

const LOCAL_STUDY_KEY = 'vpr_study_responses';

export function StudyModeModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Consent+Age | 2: Pre | 3: Task banner | 4: Post | 5: SUS | 6: Done
  const [ageGroup, setAgeGroup] = useState('16–24');
  const [preAnswers, setPreAnswers] = useState({});
  const [postAnswers, setPostAnswers] = useState({});
  const [susAnswers, setSusAnswers] = useState(() => Array(10).fill(4));
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [finalSus, setFinalSus] = useState(null);

  if (!isOpen) return null;

  const scoreCultural = (ans) =>
    CULTURAL_SURVEY_QUESTIONS.reduce((s, q) => s + (ans[q.id] === q.correctIndex ? 1 : 0), 0);

  const handleSubmitStudy = async () => {
    setSubmitting(true);
    const susScore = calculateSusScore(susAnswers);
    const preScore = scoreCultural(preAnswers);
    const postScore = scoreCultural(postAnswers);

    const record = {
      session_id: getSessionId(),
      age_group: ageGroup,
      pre_score: preScore,
      post_score: postScore,
      sus_answers: susAnswers,
      sus_score: susScore,
      feedback: feedback.trim(),
      created_at: new Date().toISOString()
    };

    const existing = loadJson(LOCAL_STUDY_KEY, []);
    saveJson(LOCAL_STUDY_KEY, [...(Array.isArray(existing) ? existing : []), record]);

    const client = getSupabaseClient();
    if (client) {
      await client.from('study_responses').insert({
        session_id: record.session_id,
        age_group: record.age_group,
        pre_score: record.pre_score,
        post_score: record.post_score,
        sus_answers: record.sus_answers,
        sus_score: record.sus_score,
        feedback: record.feedback
      });
    }

    setFinalSus(susScore);
    setSubmitting(false);
    setStep(6);
  };

  // Khi ở Bước 3 (Thực hành trên Studio), thu gọn thành thanh nhiệm vụ nổi phía dưới để không che sân khấu
  if (step === 3) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#1D2440] text-white p-4 rounded-2xl border-2 border-[#C9A227] shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase text-[#F9D423]">
            Chế độ Khảo sát (?study=1) • Bước 3/5
          </span>
          <button type="button" onClick={onClose} aria-label="Thoát khảo sát" className="text-gray-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs leading-relaxed">
          <strong>Nhiệm vụ thực hành:</strong> Hãy thử phối 1 bộ <em>Đi lễ chùa</em> chuẩn mực và 1 bộ <em>Dạo phố Tết</em> rồi bấm <strong>Xuất Lookbook</strong>.
        </p>
        <button
          type="button"
          onClick={() => setStep(4)}
          className="w-full py-2 rounded-xl bg-[#C9A227] text-black font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <span>Tôi đã làm xong nhiệm vụ → Tiếp tục</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface-subtle rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-[#1D2440] to-[#2C365E] text-white p-4 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-[#F9D423]" />
            <div>
              <span className="text-[11px] font-bold uppercase text-[#F9D423] block">
                Thực nghiệm Người dùng &amp; Đo lường SUS (?study=1)
              </span>
              <h3 className="font-bold text-base">Khảo sát Trải nghiệm Việt Phục Remix</h3>
            </div>
          </div>
          <button onClick={onClose} aria-label="Đóng khảo sát" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Cảm ơn bạn đã tham gia đánh giá sản phẩm <strong>Việt Phục Remix</strong>. Khảo sát ẩn danh mất khoảng 5 phút, gồm 5 câu hỏi trước trải nghiệm, thao tác phối đồ thực tế và bảng đánh giá SUS chuẩn quốc tế.
              </p>
              <div>
                <span className="font-bold text-[#1D2440] block mb-2">Nhóm tuổi của bạn:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AGE_GROUPS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setAgeGroup(g)}
                      className={`py-2 px-3 rounded-xl font-bold border ${
                        ageGroup === g
                          ? 'bg-[#8B1A1A] text-white border-[#8B1A1A]'
                          : 'bg-white text-gray-700 border-border-warm'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-[#8B1A1A] text-white font-bold"
              >
                Đồng ý tham gia &amp; Bắt đầu
              </button>
            </div>
          )}

          {(step === 2 || step === 4) && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#8B1A1A]">
                {step === 2 ? 'Bước 2/5: Kiểm tra nhanh trước khi dùng (Pre-test)' : 'Bước 4/5: Kiểm tra sau trải nghiệm (Post-test)'}
              </h4>
              {(step === 4 ? [...CULTURAL_SURVEY_QUESTIONS].reverse() : CULTURAL_SURVEY_QUESTIONS).map((q, idx) => {
                const map = step === 2 ? preAnswers : postAnswers;
                const setMap = step === 2 ? setPreAnswers : setPostAnswers;
                return (
                  <div key={q.id} className="bg-white p-3.5 rounded-xl border border-border-warm space-y-2">
                    <p className="font-bold text-[#1D2440]">
                      Câu {idx + 1}: {q.question}
                    </p>
                    <div className="space-y-1">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => setMap((prev) => ({ ...prev, [q.id]: oIdx }))}
                          className={`w-full text-left px-3 py-1.5 rounded-lg border ${
                            map[q.id] === oIdx
                              ? 'border-[#8B1A1A] bg-[#8B1A1A]/10 font-bold text-[#8B1A1A]'
                              : 'border-border-subtle bg-surface-subtle'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => setStep(step === 2 ? 3 : 5)}
                className="w-full py-3 rounded-xl bg-[#8B1A1A] text-white font-bold"
              >
                {step === 2 ? 'Sang bước thực hành trên Studio →' : 'Sang bảng đánh giá SUS (10 câu) →'}
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#1D2440]">
                Bước 5/5: Bảng đánh giá Mức độ Khả dụng SUS (1 = Rất không đồng ý → 5 = Rất đồng ý)
              </h4>
              {SUS_QUESTIONS_VI.map((qText, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-border-warm space-y-2">
                  <p className="font-semibold text-gray-800">
                    {i + 1}. {qText}
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setSusAnswers((prev) => prev.map((v, idx) => (idx === i ? val : v)))
                        }
                        className={`flex-1 py-1.5 rounded-lg font-bold border ${
                          susAnswers[i] === val
                            ? 'bg-[#1D2440] text-white border-[#1D2440]'
                            : 'bg-surface-subtle text-gray-700 border-border-warm'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <label className="font-bold text-gray-700 block mb-1">Góp ý mở cho nhóm phát triển:</label>
                <textarea
                  rows={2}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Điều bạn thích nhất hoặc muốn cải thiện thêm..."
                  className="w-full px-3 py-2 rounded-xl border border-border-warm bg-white"
                />
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmitStudy}
                className="w-full py-3 rounded-xl bg-[#1F6F5C] text-white font-bold"
              >
                {submitting ? 'Đang gửi kết quả...' : 'Hoàn tất & Gửi khảo sát'}
              </button>
            </div>
          )}

          {step === 6 && finalSus !== null && (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-[#1D2440]">Cảm ơn bạn đã hoàn thành khảo sát!</h4>
              <p className="text-sm text-gray-700">
                Điểm SUS bạn chấm: <strong className="text-[#8B1A1A]">{finalSus}/100</strong> ({classifySusGrade(finalSus).label})
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#8B1A1A] text-white font-bold"
              >
                Quay lại ứng dụng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
