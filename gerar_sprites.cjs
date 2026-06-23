// Script Node.js para gerar sprites PNG usando canvas API (sem dependências externas)
// Usa a API Canvas do Node.js se disponível, senão gera PNGs mínimos válidos

const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "public", "sprites");
fs.mkdirSync(outDir, { recursive: true });

// Função para criar um PNG mínimo válido (64x64 RGBA)
// Usa a especificação PNG para criar arquivos válidos sem bibliotecas externas

function crc32(buf) {
  let crc = 0xffffffff;
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function uint32BE(n) {
  return Buffer.from([(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]);
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, "ascii");
  const crcBuf = Buffer.concat([typeBytes, data]);
  const crc = crc32(crcBuf);
  return Buffer.concat([uint32BE(data.length), typeBytes, data, uint32BE(crc)]);
}

function deflateNone(data) {
  // zlib non-compressed format (method 0x78 0x01)
  // Split into 65535-byte blocks
  const chunks = [];
  chunks.push(Buffer.from([0x78, 0x01])); // zlib header
  let adler_s1 = 1, adler_s2 = 0;
  for (let i = 0; i < data.length; i++) {
    adler_s1 = (adler_s1 + data[i]) % 65521;
    adler_s2 = (adler_s2 + adler_s1) % 65521;
  }

  let offset = 0;
  while (offset < data.length) {
    const blockSize = Math.min(65535, data.length - offset);
    const isLast = (offset + blockSize >= data.length) ? 1 : 0;
    const block = data.slice(offset, offset + blockSize);
    chunks.push(Buffer.from([isLast, blockSize & 0xff, (blockSize >> 8) & 0xff, (~blockSize) & 0xff, ((~blockSize) >> 8) & 0xff]));
    chunks.push(block);
    offset += blockSize;
  }

  // adler32 checksum big-endian
  chunks.push(Buffer.from([(adler_s2 >> 8) & 0xff, adler_s2 & 0xff, (adler_s1 >> 8) & 0xff, adler_s1 & 0xff]));
  return Buffer.concat(chunks);
}

function makePNG(width, height, pixels) {
  // pixels: array of {r,g,b,a} length width*height, row by row
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.concat([
    uint32BE(width), uint32BE(height),
    Buffer.from([8, 6, 0, 0, 0]) // bit depth=8, color type=6 (RGBA), compression=0, filter=0, interlace=0
  ]);

  // Build raw image data (filter byte 0 per row)
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = [0]; // filter type None
    for (let x = 0; x < width; x++) {
      const p = pixels[y * width + x];
      row.push(p.r, p.g, p.b, p.a);
    }
    rows.push(Buffer.from(row));
  }
  const rawData = Buffer.concat(rows);
  const idat = deflateNone(rawData);

  return Buffer.concat([
    sig,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function pixel(r, g, b, a = 255) { return { r, g, b, a }; }
const TRANSPARENT = pixel(0, 0, 0, 0);

// ── Sprite 1: recompensa_flores.png (buquê pixel art 64x64) ─────────────────
{
  const W = 64, H = 64;
  const px = new Array(W * H).fill(TRANSPARENT);

  function set(x, y, r, g, b, a = 255) {
    if (x >= 0 && x < W && y >= 0 && y < H) px[y * W + x] = pixel(r, g, b, a);
  }

  function rect(x1, y1, x2, y2, r, g, b) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        set(x, y, r, g, b);
  }

  function ellipse(x1, y1, x2, y2, r, g, b) {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rx = (x2 - x1) / 2, ry = (y2 - y1) / 2;
    for (let y = Math.floor(y1); y <= Math.ceil(y2); y++) {
      for (let x = Math.floor(x1); x <= Math.ceil(x2); x++) {
        const dx = (x - cx) / rx, dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1) set(x, y, r, g, b);
      }
    }
  }

  // Scale from 32x32 logic to 64x64 (multiply by 2)
  // caule verde
  rect(28, 36, 34, 56, 34, 139, 34);
  rect(24, 40, 28, 48, 34, 139, 34);
  rect(34, 44, 38, 52, 34, 139, 34);
  // flores rosas
  ellipse(16, 16, 32, 32, 255, 105, 180);
  ellipse(26, 10, 42, 26, 255, 80, 160);
  ellipse(36, 18, 52, 34, 255, 130, 190);
  // centros amarelos
  ellipse(22, 20, 26, 24, 255, 230, 0);
  ellipse(32, 14, 36, 18, 255, 230, 0);
  ellipse(42, 22, 46, 26, 255, 230, 0);

  fs.writeFileSync(path.join(outDir, "recompensa_flores.png"), makePNG(W, H, px));
  console.log("recompensa_flores.png gerado!");
}

// ── Sprite 2: recompensa_beijos.png (coração com beijo 64x64) ───────────────
{
  const W = 64, H = 64;
  const px = new Array(W * H).fill(TRANSPARENT);

  function set(x, y, r, g, b, a = 255) {
    if (x >= 0 && x < W && y >= 0 && y < H) px[y * W + x] = pixel(r, g, b, a);
  }

  function ellipse(x1, y1, x2, y2, r, g, b) {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rx = (x2 - x1) / 2, ry = (y2 - y1) / 2;
    for (let y = Math.floor(y1); y <= Math.ceil(y2); y++) {
      for (let x = Math.floor(x1); x <= Math.ceil(x2); x++) {
        const dx = (x - cx) / rx, dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1) set(x, y, r, g, b);
      }
    }
  }

  // Coração grande (dois círculos superiores + triângulo inferior)
  ellipse(8, 12, 32, 32, 220, 40, 50);
  ellipse(32, 12, 56, 32, 220, 40, 50);
  // Parte inferior do coração (triângulo)
  for (let y = 28; y < 58; y++) {
    const halfW = Math.max(1, Math.round((58 - y) * 24 / 30));
    for (let x = 32 - halfW; x <= 32 + halfW; x++) set(x, y, 200, 30, 40);
  }
  // Brilhos
  ellipse(12, 16, 24, 28, 255, 80, 80);
  ellipse(40, 16, 52, 28, 255, 80, 80);
  // Beijos rosa
  ellipse(20, 26, 30, 34, 255, 105, 180);
  ellipse(34, 26, 44, 34, 255, 105, 180);
  ellipse(26, 30, 38, 40, 255, 130, 190);

  fs.writeFileSync(path.join(outDir, "recompensa_beijos.png"), makePNG(W, H, px));
  console.log("recompensa_beijos.png gerado!");
}

// ── Sprite 3: recompensa_interrogacao.png (? sobre fundo roxo 64x64) ────────
{
  const W = 64, H = 64;
  const px = new Array(W * H).fill(TRANSPARENT);

  function set(x, y, r, g, b, a = 255) {
    if (x >= 0 && x < W && y >= 0 && y < H) px[y * W + x] = pixel(r, g, b, a);
  }

  function rect(x1, y1, x2, y2, r, g, b) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        set(x, y, r, g, b);
  }

  // Fundo roxo com cantos arredondados
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const r = 12;
      const inCorner = (
        (x < r && y < r && Math.hypot(x - r, y - r) > r) ||
        (x >= W - r && y < r && Math.hypot(x - (W - r), y - r) > r) ||
        (x < r && y >= H - r && Math.hypot(x - r, y - (H - r)) > r) ||
        (x >= W - r && y >= H - r && Math.hypot(x - (W - r), y - (H - r)) > r)
      );
      if (!inCorner) set(x, y, 60, 20, 80);
    }
  }

  // ? em pixel art (branco) — escala 2x do original 32x32
  // Topo do ? (arco superior)
  rect(22, 12, 42, 16, 255, 255, 255);
  rect(38, 16, 42, 26, 255, 255, 255);
  rect(28, 24, 36, 30, 255, 255, 255);
  // Ponto do ?
  rect(28, 34, 36, 38, 255, 255, 255);

  fs.writeFileSync(path.join(outDir, "recompensa_interrogacao.png"), makePNG(W, H, px));
  console.log("recompensa_interrogacao.png gerado!");
}

console.log("Todos os sprites gerados com sucesso!");
