import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CULTURE_RULES } from '../src/data/cultureRules.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../docs');
const outFile = path.join(outDir, 'culture-rules-review.csv');

fs.mkdirSync(outDir, { recursive: true });

const csvEscape = (val) => {
  const s = String(val ?? '');
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
};

const header = ['id', 'level', 'category', 'priority', 'condition_text', 'title', 'message', 'source'];
const rows = [header.join(',')];

for (const r of CULTURE_RULES) {
  const condParts = [];
  if (r.when) condParts.push(`when=${JSON.stringify(r.when)}`);
  if (r.whenNot) condParts.push(`whenNot=${JSON.stringify(r.whenNot)}`);
  if (r.anyOf) condParts.push(`anyOf=${JSON.stringify(r.anyOf)}`);

  rows.push(
    [
      r.id,
      r.level,
      r.category,
      r.priority ?? 0,
      condParts.join(' | '),
      r.title,
      r.message,
      r.source
    ]
      .map(csvEscape)
      .join(',')
  );
}

fs.writeFileSync(outFile, '\uFEFF' + rows.join('\n'), 'utf8');
console.log(`Exported ${CULTURE_RULES.length} rules to ${outFile}`);
