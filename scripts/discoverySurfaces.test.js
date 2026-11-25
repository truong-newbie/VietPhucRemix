import { describe, it, expect } from 'vitest';
import { buildSurfaces, normalizeOrigin } from './discoverySurfaces.js';

describe('discovery surfaces', () => {
  it('builds robots, sitemap and llms files from one origin', () => {
    const origin = normalizeOrigin('https://example.vn/');
    expect(origin).toBe('https://example.vn');
    const s = buildSurfaces(origin, '2026-11-25');
    expect(s['robots.txt'].body).toContain('Sitemap: https://example.vn/sitemap.xml');
    expect(s['sitemap.xml'].body).toContain('<loc>https://example.vn/</loc>');
    expect(s['llms.txt'].body).toMatch(/^# Việt Phục Remix\n\n> /);
    expect(s['index.html.md'].noindex).toBe(true);
  });
});
