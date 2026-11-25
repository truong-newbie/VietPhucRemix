import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { retrieveVerifiedContext } from './_lib/ragRetriever.js';

const OUT_OF_SCOPE_REPLY =
  'Xin lỗi, tôi là Cố vấn Văn hóa chuyên trách về Việt Phục và nghi thức mặc truyền thống. Câu hỏi này nằm ngoài kho tư liệu đã thẩm định nên tôi xin phép không suy đoán để đảm bảo độ chính xác lịch sử.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const { question, activeOutfit = {} } = body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Vui lòng nhập câu hỏi.' });
  }

  // Kiểm tra ngoài phạm vi trước khi tốn quota LLM
  const retrieval = retrieveVerifiedContext(question, activeOutfit);
  if (retrieval.outOfScope || retrieval.matched.length === 0) {
    return res.status(200).json({
      answer: OUT_OF_SCOPE_REPLY,
      citations: [],
      outOfScope: true
    });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    // Fallback trả về trích đoạn tư liệu đã thẩm định nếu chưa điền GEMINI_API_KEY
    const topDoc = retrieval.matched[0];
    return res.status(200).json({
      answer: `(Chế độ tra cứu tư liệu cục bộ — chưa điền GEMINI_API_KEY vào .env)\n\n**${topDoc.title}:** ${topDoc.content}\n\n[Nguồn: ${topDoc.source}]`,
      citations: [topDoc.source],
      outOfScope: false,
      localFallback: true
    });
  }

  const ip = getClientIp(req);
  const passcode = req.headers?.['x-judge-passcode'] || '';
  const limitRes = checkRateLimit({
    key: `rag:${ip}`,
    limit: 30,
    passcode: String(passcode),
    expectedPasscode: process.env.JUDGE_PASSCODE || ''
  });

  if (!limitRes.allowed) {
    return res.status(429).json({
      code: 'RATE_LIMITED',
      error: 'Bạn đã đạt giới hạn 30 câu hỏi/ngày.'
    });
  }

  const sourcesText = retrieval.matched
    .map((d, i) => `[Tư liệu ${i + 1}] Tiêu đề: ${d.title}\nNội dung: ${d.content}\nNguồn: ${d.source}`)
    .join('\n\n');

  const systemPrompt = [
    'Bạn là Cố vấn Văn hóa của dự án Việt Phục Remix. Trả lời bằng tiếng Việt trang trọng, ngắn gọn, dễ hiểu.',
    'QUY TẮC TUYỆT ĐỐI: Chỉ trả lời dựa trên khối <VERIFIED_SOURCES> dưới đây. KHÔNG bịa thêm chi tiết lịch sử, số trang hay trích dẫn ngoài khối này.',
    'Cuối câu trả lời, BẮT BUỘC ghi rõ dòng `[Nguồn: ...]` liệt kê nguồn từ khối tư liệu đã dùng.',
    'Nếu <VERIFIED_SOURCES> không đủ thông tin trả lời câu hỏi, hãy nói rõ là chưa có tư liệu thẩm định.'
  ].join('\n');

  const userPrompt = `Ngữ cảnh người dùng đang phối trên màn hình: Áo=${activeOutfit.garmentId || 'chưa rõ'}, Sự kiện=${activeOutfit.eventId || 'chưa rõ'}.\n\n<VERIFIED_SOURCES>\n${sourcesText}\n</VERIFIED_SOURCES>\n\nCâu hỏi của người dùng: ${question}`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Gemini Flash lỗi (${resp.status}): ${errText.slice(0, 150)}`);
    }

    const json = await resp.json();
    const answer =
      json?.candidates?.[0]?.content?.parts?.[0]?.text || OUT_OF_SCOPE_REPLY;
    const citations = [...new Set(retrieval.matched.map((d) => d.source))];

    return res.status(200).json({
      answer,
      citations,
      outOfScope: false,
      remainingQuota: limitRes.remaining
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Lỗi kết nối Cố vấn AI.' });
  }
}
