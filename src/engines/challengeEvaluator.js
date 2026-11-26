// Hàm thuần túy chấm điểm Thử thách Phối Chuẩn theo thời gian thực

export function evaluateChallenge(challenge, { outfit, cultureResult, harmonyResult }) {
  if (!challenge || !outfit) {
    return { passed: false, checklist: [] };
  }

  const redCount = (cultureResult?.issues || []).filter((i) => i.severity === 'red').length;
  const score = harmonyResult?.score ?? 0;

  const checklist = [
    {
      id: 'event',
      label: 'Đúng bối cảnh sự kiện của thử thách',
      ok: !challenge.eventId || outfit.eventId === challenge.eventId
    },
    {
      id: 'garment',
      label:
        challenge.requiredGarmentIds && challenge.requiredGarmentIds.length > 0
          ? 'Đúng dòng cổ phục yêu cầu'
          : 'Chọn dòng cổ phục bất kỳ phù hợp',
      ok:
        !challenge.requiredGarmentIds ||
        challenge.requiredGarmentIds.length === 0 ||
        challenge.requiredGarmentIds.includes(outfit.garmentId)
    },
    {
      id: 'culture',
      label: `Không vi phạm đỏ Culture Guard (hiện có ${redCount})`,
      ok: redCount <= (challenge.maxRedViolations ?? 0)
    },
    {
      id: 'harmony',
      label: `Đạt ít nhất ${challenge.minHarmony} điểm Harmony (hiện ${score}đ)`,
      ok: score >= (challenge.minHarmony ?? 75)
    }
  ];

  return {
    passed: checklist.every((c) => c.ok),
    checklist
  };
}
