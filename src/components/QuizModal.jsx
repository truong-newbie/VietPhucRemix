import React, { useState, useMemo } from 'react';
import { X, Award, CheckCircle2, XCircle, Sparkles, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_DATA } from '../data/quizData';
import { PARTNERS_DATA } from '../data/partnersData';
import { GARMENTS_DATA } from '../data/garmentsData';
import { CHALLENGES_DATA } from '../data/challengesData';

function pickRandomThree(questions) {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

export function QuizModal({
  isOpen,
  onClose,
  garment,
  earnedBadges,
  onEarnBadge,
  onQuizComplete,
  onStartChallenge
}) {
  const [modalTab, setModalTab] = useState('quiz'); // 'quiz' | 'challenges'
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = useMemo(() => {
    if (!isOpen || !garment) return [];
    const pool = QUIZ_DATA[garment.id] || QUIZ_DATA['ngu-than'] || [];
    return pickRandomThree(pool);
  }, [isOpen, garment]);

  if (!isOpen || !garment) return null;

  const correctCount = questions.reduce(
    (sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );
  const passed = submitted && correctCount >= 2;
  const totalGarments = GARMENTS_DATA.length;
  const allMastered = earnedBadges.length >= totalGarments;

  const handleSubmit = () => {
    setSubmitted(true);
    if (correctCount >= 2) {
      onEarnBadge(garment.id);
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#8B1A1A', '#C9A227', '#1F6F5C']
      });
    }
    if (onQuizComplete) {
      onQuizComplete({ garmentId: garment.id, score: correctCount, total: questions.length });
    }
  };

  const handleResetAndClose = () => {
    setAnswers({});
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-surface-subtle rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-[#8B1A1A] to-[#600C0C] text-white p-4 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#F9D423]" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
                Mini-Quiz Di Sản • Nhận Huy Hiệu ({earnedBadges.length}/{totalGarments})
              </span>
              <h3 className="font-bold text-base">Am hiểu {garment.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Đóng quiz"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#FAF3DD] px-5 py-2.5 border-b border-border-subtle flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setModalTab('quiz')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              modalTab === 'quiz'
                ? 'bg-[#8B1A1A] text-white shadow-xs'
                : 'bg-white text-[#664422] border border-border-warm'
            }`}
          >
            Trắc nghiệm ({garment.name.split(' (')[0]})
          </button>
          <button
            type="button"
            onClick={() => setModalTab('challenges')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition ${
              modalTab === 'challenges'
                ? 'bg-[#1D2440] text-white shadow-xs'
                : 'bg-white text-[#664422] border border-border-warm'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Thử thách Thực hành ({CHALLENGES_DATA.length})</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-sm">
          {modalTab === 'challenges' ? (
            <div className="space-y-2.5">
              <p className="text-xs text-[#574C43]">
                Nhận đề bài thực tế và trực tiếp phối đồ trên Studio đạt <strong>0 vi phạm đỏ</strong> cùng mốc điểm Harmony để mở khóa huy hiệu!
              </p>
              {CHALLENGES_DATA.map((ch) => (
                <div
                  key={ch.id}
                  className="bg-white rounded-2xl p-3.5 border border-border-warm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#1D2440]">{ch.title}</h4>
                    <p className="text-[#574C43] leading-snug">{ch.brief}</p>
                    <span className="inline-block text-[11px] font-bold text-[#8B1A1A] bg-[#FAF3DD] px-2 py-0.5 rounded-full">
                      Mục tiêu: ≥ {ch.minHarmony}đ Harmony • 0 lỗi đỏ
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onStartChallenge) onStartChallenge(ch);
                      handleResetAndClose();
                    }}
                    className="shrink-0 flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-[#1F6F5C] hover:bg-[#165B66] text-white font-bold text-xs transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Nhận thử thách</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
          {questions.map((q, qIdx) => {
            const chosen = answers[q.id];
            return (
              <div key={q.id} className="bg-white rounded-2xl p-4 border border-border-subtle space-y-2.5">
                <p className="font-bold text-[#1D2440] text-xs sm:text-sm">
                  Câu {qIdx + 1}: {q.question}
                </p>
                <div className="space-y-1.5">
                  {q.options.map((opt, oIdx) => {
                    const isChosen = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    let cls = 'border-border-subtle bg-surface-subtle hover:border-[#8B1A1A]/50 text-gray-800';
                    if (submitted) {
                      if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                      else if (isChosen) cls = 'border-rose-400 bg-rose-50 text-rose-900';
                    } else if (isChosen) {
                      cls = 'border-[#8B1A1A] bg-[#8B1A1A]/10 text-[#8B1A1A] font-semibold';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={submitted}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`w-full text-left px-3 py-2 rounded-xl border text-xs flex items-center justify-between gap-2 transition ${cls}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {submitted && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="text-[11px] text-gray-600 bg-[#FAF3DD] p-2 rounded-lg">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          {submitted && (
            <div
              className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 ${
                passed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <p className="font-bold text-sm">
                Kết quả: {correctCount}/{questions.length} câu đúng —{' '}
                {passed ? 'Chúc mừng! Bạn đã nhận huy hiệu dòng áo này!' : 'Hãy thử đọc lại Thẻ văn hóa và làm lại nhé (cần ≥ 2/3 câu đúng).'}
              </p>
              {allMastered && (
                <div className="mt-2 p-2.5 rounded-xl bg-white border border-emerald-300 flex items-center gap-2 text-emerald-900">
                  <Sparkles className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>
                    Tuyệt vời! Bạn đã sưu tầm đủ {totalGarments}/{totalGarments} huy hiệu — Mã ưu đãi đối tác mở khóa:{' '}
                    <strong className="font-mono text-[#8B1A1A]">{PARTNERS_DATA[0]?.voucherCode || 'VIETPHUC10'}</strong>
                  </span>
                </div>
              )}
            </div>
          )}
            </>
          )}
        </div>

        {modalTab === 'quiz' && (
        <div className="bg-[#FAF3DD] p-4 border-t border-border-warm flex items-center justify-end gap-2">
          {!submitted ? (
            <button
              type="button"
              disabled={Object.keys(answers).length < questions.length}
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] disabled:opacity-40 transition shadow"
            >
              Nộp bài &amp; Nhận Huy Hiệu
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1D2440] hover:bg-[#2C365E] transition shadow"
            >
              Hoàn tất
            </button>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
