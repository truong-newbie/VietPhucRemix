import { describe, it, expect } from 'vitest';
import { retrieveVerifiedContext } from './ragRetriever';
import { buildVerifiedKnowledgeBase } from '../../src/data/ragKnowledgeBase';

describe('ragRetriever', () => {
  it('never includes entries marked CẦN THẨM ĐỊNH in verified knowledge base', () => {
    const kb = buildVerifiedKnowledgeBase();
    expect(kb.length).toBeGreaterThanOrEqual(15);
    expect(kb.every((d) => d.source && d.source !== 'CẦN THẨM ĐỊNH')).toBe(true);
  });

  it('retrieves relevant heritage sources for garment questions', () => {
    const res = retrieveVerifiedContext('Áo ngũ thân có mấy khuy và nguồn gốc 1744?', {
      garmentId: 'ngu-than',
      eventId: 'tet-xuan'
    });
    expect(res.outOfScope).toBe(false);
    expect(res.matched.length).toBeGreaterThan(0);
    expect(res.matched[0].source).toBeTruthy();
  });

  it('marks completely unrelated queries as outOfScope', () => {
    const res = retrieveVerifiedContext('Giá bitcoin hôm nay bao nhiêu tiền?', {
      garmentId: 'ngu-than'
    });
    expect(res.outOfScope).toBe(true);
    expect(res.matched).toEqual([]);
  });
});
