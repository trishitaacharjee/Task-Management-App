import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../data');
fs.mkdirSync(root, { recursive: true });
const filePath = (name) => path.join(root, `${name}.json`);
function read(name, fallback = []) { const file = filePath(name); if (!fs.existsSync(file)) { fs.writeFileSync(file, JSON.stringify(fallback, null, 2)); return fallback; } try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function write(name, value) { fs.writeFileSync(filePath(name), JSON.stringify(value, null, 2)); }
export const jsonStore = { read, write };
