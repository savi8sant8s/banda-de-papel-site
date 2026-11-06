/* Monte sua banda de papel: o desenho dos bonecos portado de papel/band.py (banda-de-papel) para canvas.
   Mesmas formas, cores, borda de papel, sombra e tremidinha de stop motion. */
(() => {
  "use strict";

  // ---------- textos (o idioma vem do <html lang>) ----------
  const LANG = ((l) => (l.startsWith("en") ? "en" : l.startsWith("es") ? "es" : "pt"))((document.documentElement.lang || "pt").toLowerCase());
  const TX = {
    pt: { hint: "👆 Toque em alguém pra mudar<br>ou arraste pra mover", person: "Pessoa", text: "Texto", arrange: "Arrumar", shuffle: "Sortear",
      tShuffle: "Sortear", tPlays: "Toca", tHair: "Cabelo", tColor: "Cor", tSkin: "Pele", tOutfit: "Roupa", tDetail: "Detalhe", tRemove: "Tirar",
      tWrite: "Escrever", tRotate: "Girar", tSize: "Tamanho", band: "A banda", callMore: "Chamar mais alguém:", full: "A banda está cheia (6)",
      done: "Pronto", swapInst: "Trocar instrumento", namePh: "Toque e escreva o nome", textPh: "Escreva aqui",
      share: "Minha banda de papel 🎸📄 @abandadepapel · monte a sua em bandadepapel.cloud", file: "minha banda de papel",
      bar: "BAR DO PAPEL", beer1: "CERVEJA", beer2: "GELADA",
      tPhoto: "Foto", tPuppet: "Boneco", tFace: "Rosto", cropTitle: "Ajuste o rosto dentro do oval", use: "Usar", cancel: "Cancelar", zoom: "Zoom",
      privacy: "A foto fica só no seu aparelho: nada é enviado pra internet.",
      onlyHead: "✂️ Recortar só a cabeça (tira o fundo)", cutting: "Recortando a cabeça… na primeira vez demora um pouco",
      cutFail: "Não deu pra recortar automático; ficou no oval.",
      play: "Animar", stop: "Parar", video: "▶️ Gerar vídeo", modeImg: "🖼️ Imagem", modeVid: "🎬 Vídeo",
      shareImg: "Compartilhar", dlImg: "Baixar", shareVid: "Compartilhar", dlVid: "Baixar", close: "Fechar",
      previewTitle: "Prévia do vídeo", vidHint: "🎬 A banda se mexendo aí é a prévia do vídeo (6 segundos).", recording: "Gravando o vídeo…", noVideo: "Este navegador não grava vídeo. Tente no Chrome ou no Safari.",
      videoTip: "Poste com a música que quiser direto no Reels, Stories ou TikTok 🎶",
      roles: { vocal: "Vocal", guitar: "Guitarra", bass: "Baixo", drums: "Bateria", keys: "Teclado", acoustic: "Violão" },
      scenes: { palco: "Palco", garagem: "Garagem", luau: "Luau", lua: "Na Lua", arraia: "Arraiá", boteco: "Boteco", festival: "Festival", telhado: "Telhado", barco: "Barco no rio" } },
    en: { hint: "👆 Tap someone to change them<br>or drag to move", person: "Person", text: "Text", arrange: "Arrange", shuffle: "Shuffle",
      tShuffle: "Shuffle", tPlays: "Plays", tHair: "Hair", tColor: "Color", tSkin: "Skin", tOutfit: "Outfit", tDetail: "Detail", tRemove: "Remove",
      tWrite: "Write", tRotate: "Rotate", tSize: "Size", band: "The band", callMore: "Add someone:", full: "The band is full (6)",
      done: "Done", swapInst: "Change instrument", namePh: "Tap to write the band name", textPh: "Write here",
      share: "My paper band 🎸📄 @abandadepapel · make yours at bandadepapel.cloud/en", file: "my paper band",
      bar: "PAPER BAR", beer1: "COLD", beer2: "BEER",
      tPhoto: "Photo", tPuppet: "Puppet", tFace: "Face", cropTitle: "Fit the face inside the oval", use: "Use", cancel: "Cancel", zoom: "Zoom",
      privacy: "The photo stays on your device: nothing is uploaded.",
      onlyHead: "✂️ Cut out just the head (removes the background)", cutting: "Cutting out the head… the first time takes a moment",
      cutFail: "Couldn't cut it out automatically; kept the oval.",
      play: "Animate", stop: "Stop", video: "▶️ Make the video", modeImg: "🖼️ Image", modeVid: "🎬 Video",
      shareImg: "Share", dlImg: "Download", shareVid: "Share", dlVid: "Download", close: "Close",
      previewTitle: "Video preview", vidHint: "🎬 The band moving up there is the video preview (6 seconds).", recording: "Recording the video…", noVideo: "This browser can't record video. Try Chrome or Safari.",
      videoTip: "Post it with any song you like right from Reels, Stories or TikTok 🎶",
      roles: { vocal: "Vocals", guitar: "Guitar", bass: "Bass", drums: "Drums", keys: "Keys", acoustic: "Acoustic" },
      scenes: { palco: "Stage", garagem: "Garage", luau: "Beach", lua: "On the Moon", arraia: "June party", boteco: "Bar", festival: "Festival", telhado: "Rooftop", barco: "River boat" } },
    es: { hint: "👆 Toca a alguien para cambiarlo<br>o arrástralo para moverlo", person: "Persona", text: "Texto", arrange: "Ordenar", shuffle: "Sortear",
      tShuffle: "Sortear", tPlays: "Toca", tHair: "Pelo", tColor: "Color", tSkin: "Piel", tOutfit: "Ropa", tDetail: "Detalle", tRemove: "Quitar",
      tWrite: "Escribir", tRotate: "Girar", tSize: "Tamaño", band: "La banda", callMore: "Sumar a alguien:", full: "La banda está llena (6)",
      done: "Listo", swapInst: "Cambiar instrumento", namePh: "Toca y escribe el nombre", textPh: "Escribe aquí",
      share: "Mi banda de papel 🎸📄 @abandadepapel · arma la tuya en bandadepapel.cloud/es", file: "mi banda de papel",
      bar: "BAR DE PAPEL", beer1: "CERVEZA", beer2: "FRÍA",
      tPhoto: "Foto", tPuppet: "Muñeco", tFace: "Cara", cropTitle: "Ajusta la cara dentro del óvalo", use: "Usar", cancel: "Cancelar", zoom: "Zoom",
      privacy: "La foto se queda en tu dispositivo: no se sube nada.",
      onlyHead: "✂️ Recortar solo la cabeza (quita el fondo)", cutting: "Recortando la cabeza… la primera vez tarda un poco",
      cutFail: "No se pudo recortar automáticamente; quedó en el óvalo.",
      play: "Animar", stop: "Parar", video: "▶️ Crear video", modeImg: "🖼️ Imagen", modeVid: "🎬 Video",
      shareImg: "Compartir", dlImg: "Descargar", shareVid: "Compartir", dlVid: "Descargar", close: "Cerrar",
      previewTitle: "Vista previa", vidHint: "🎬 La banda moviéndose ahí es la vista previa del video (6 segundos).", recording: "Grabando el video…", noVideo: "Este navegador no graba video. Prueba en Chrome o Safari.",
      videoTip: "Publícalo con la canción que quieras desde Reels, Stories o TikTok 🎶",
      roles: { vocal: "Voz", guitar: "Guitarra", bass: "Bajo", drums: "Batería", keys: "Teclado", acoustic: "Acústica" },
      scenes: { palco: "Escenario", garagem: "Garaje", luau: "Playa", lua: "En la Luna", arraia: "Fiesta junina", boteco: "Bar", festival: "Festival", telhado: "Azotea", barco: "Barco en el río" } },
  }[LANG];

  // ---------- cores (band.py / draw.py) ----------
  const PAPER = [241, 234, 220], DARK = [28, 26, 32], WOOD = [150, 98, 58], METAL = [196, 198, 204],
    BRASS = [214, 176, 84], MOUTH = [110, 30, 40];
  const SKINS = [[243, 205, 175], [226, 176, 138], [200, 142, 102], [160, 106, 72], [112, 74, 52]];
  const HAIRS = [[42, 32, 28], [74, 48, 32], [22, 22, 26], [196, 156, 96], [156, 74, 42], [214, 210, 200],
    [226, 112, 72], [82, 150, 180], [200, 90, 180]];
  const CLOTHES = [[226, 112, 72], [82, 150, 180], [226, 186, 84], [30, 30, 36], [232, 228, 216], [150, 40, 36],
    [90, 140, 90], [120, 90, 160], [60, 64, 84]];
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const css = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  function rng(seed) {  // mulberry32
    let s = seed >>> 0;
    return () => {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------- caneta de papel (draw.py: Pen) ----------
  class Pen {
    constructor(ctx, frame = 0, jitter = 1.2) {
      this.ctx = ctx; this.frame = frame; this.jitter = jitter;
      this.m = [1, 0, 0, 0, 1, 0]; this.stack = []; this.n = 0;
    }
    push() { this.stack.push(this.m.slice()); }
    pop() { this.m = this.stack.pop(); }
    mul(a2, b2, c2, d2, e2, f2) {
      const [a, b, c, d, e, f] = this.m;
      this.m = [a * a2 + b * d2, a * b2 + b * e2, a * c2 + b * f2 + c, d * a2 + e * d2, d * b2 + e * e2, d * c2 + e * f2 + f];
    }
    translate(x, y) { this.mul(1, 0, x, 0, 1, y); }
    rotate(deg) { const r = deg * Math.PI / 180; this.mul(Math.cos(r), -Math.sin(r), 0, Math.sin(r), Math.cos(r), 0); }
    scale(sx, sy) { this.mul(sx, 0, 0, 0, sy === undefined ? sx : sy, 0); }
    pt(x, y) { const [a, b, c, d, e, f] = this.m; return [a * x + b * y + c, d * x + e * y + f]; }
    unit() { const [a, b, , d, e] = this.m; return Math.sqrt(Math.abs(a * e - b * d)); }
    shape(pts, fill, { border = true, shadow = true } = {}) {
      this.n += 1;
      const r = rng(this.frame * 7919 + this.n), j = this.jitter;
      const P = pts.map(([x, y]) => { const [px, py] = this.pt(x, y); return [px + (r() * 2 - 1) * j, py + (r() * 2 - 1) * j]; });
      if (P.length < 3) return;
      const u = this.unit(), g = this.ctx;
      const path = (dx = 0, dy = 0) => { g.beginPath(); P.forEach(([x, y], i) => i ? g.lineTo(x + dx, y + dy) : g.moveTo(x + dx, y + dy)); g.closePath(); };
      if (shadow) { const off = 5 * u; path(off * 0.6, off); g.fillStyle = "rgba(10,12,20,0.27)"; g.fill(); }
      if (border) { path(); g.fillStyle = css(PAPER); g.fill(); g.strokeStyle = css(PAPER); g.lineWidth = Math.max(1, 6 * u); g.lineJoin = "round"; g.stroke(); }
      path(); g.fillStyle = css(fill); g.fill();
    }
    rect(x, y, w, h, fill, o) { this.shape([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], fill, o); }
    ellipse(cx, cy, rx, ry, fill, n = 28, o) {
      const p = []; for (let i = 0; i < n; i++) { const a = 2 * Math.PI * i / n; p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
      this.shape(p, fill, o);
    }
    capsule(x1, y1, x2, y2, r, fill, o) {
      const ang = Math.atan2(y2 - y1, x2 - x1), p = [];
      for (const [cx, cy, a0] of [[x2, y2, ang - Math.PI / 2], [x1, y1, ang + Math.PI / 2]])
        for (let i = 0; i < 9; i++) p.push([cx + r * Math.cos(a0 + Math.PI * i / 8), cy + r * Math.sin(a0 + Math.PI * i / 8)]);
      this.shape(p, fill, o);
    }
    text(x, y, s, px, fill) {
      const [X, Y] = this.pt(x, y), g = this.ctx;
      g.font = `800 ${px}px Jost, Futura, sans-serif`; g.fillStyle = css(fill); g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(s, X, Y);
    }
  }
  const FLAT = { border: false, shadow: false }, NOSH = { shadow: false };

  function ik(sx, sy, hx, hy, l1, l2, bend) {
    const dx = hx - sx, dy = hy - sy, dist = Math.min(Math.hypot(dx, dy), l1 + l2 - 1e-3), a = Math.atan2(dy, dx);
    const cb = (l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * Math.max(dist, 1e-3));
    const b = Math.acos(Math.max(-1, Math.min(1, cb))) * bend;
    return [sx + l1 * Math.cos(a - b), sy + l1 * Math.sin(a - b)];
  }

  // ---------- cabeça ----------
  function eye(pen, x, y, mode) {
    if (mode === "happy") {
      pen.capsule(x - 8, y + 2, x, y - 5, 2.6, DARK, FLAT); pen.capsule(x, y - 5, x + 8, y + 2, 2.6, DARK, FLAT);
    } else pen.ellipse(x, y, 6, 8, DARK, 12, FLAT);
  }

  // ---------- ritmo da animação (120 bpm; tudo fecha em 6 s, então o vídeo vira loop sem emenda) ----------
  const BEAT = 0.5, TAU = Math.PI * 2;
  function motion(m, t) {
    if (t == null) return null;
    const ph = m.phase || 0, b = ((t / BEAT + ph) % 1 + 1) % 1, fall = Math.exp(-b * 5);   // cai no tempo e volta
    return { sq: 12 * fall, nod: 7 * fall, tilt: 4 * Math.sin(TAU * (t / 3 + ph)), strum: 0.5 + 0.5 * Math.sin(TAU * (t / (BEAT / 2) + ph)),
      sway: Math.sin(TAU * (t / 2 + ph)), fall, b, t, ph };
  }
  function photoHead(pen, m) {
    if (m.photoCut) {  // só a cabeça, já com borda de papel: a base encosta no pescoço
      const g = pen.ctx, u = pen.unit(), [nx, ny] = pen.pt(0, -286), h = 190 * u * m.headW, w = h * m.photo.width / m.photo.height;
      const [a, , , d] = pen.m, ang = Math.atan2(d, a);
      g.save(); g.shadowColor = "rgba(10,12,20,0.3)"; g.shadowOffsetX = 3 * u; g.shadowOffsetY = 6 * u;
      g.translate(nx, ny); g.rotate(ang); g.drawImage(m.photo, -w / 2, -h, w, h); g.restore(); return;
    }
    // o rosto recortado da foto, com borda de papel e sombra, no lugar da cabeça desenhada
    const g = pen.ctx, [cx, cy] = pen.pt(0, -358), u = pen.unit(), w = 128 * u * m.headW, h = 150 * u;
    g.save();
    g.fillStyle = "rgba(10,12,20,0.27)"; g.beginPath(); g.ellipse(cx + 3 * u, cy + 6 * u, w / 2 + 6 * u, h / 2 + 6 * u, 0, 0, 7); g.fill();
    g.fillStyle = css(PAPER); g.beginPath(); g.ellipse(cx, cy, w / 2 + 6 * u, h / 2 + 6 * u, 0, 0, 7); g.fill();
    g.beginPath(); g.ellipse(cx, cy, w / 2, h / 2, 0, 0, 7); g.clip();
    g.drawImage(m.photo, cx - w / 2, cy - h / 2, w, h);
    g.restore();
  }
  function head(pen, m, mouth, tilt = 0, eyes = "open", nod = 0) {
    if (m.photo) { pen.push(); pen.translate(0, -300 + nod); pen.rotate(tilt); pen.translate(0, 300); photoHead(pen, m); pen.pop(); return; }
    pen.push(); pen.translate(0, -300 + nod); pen.rotate(tilt); pen.translate(0, 300);
    const w = 50 * m.headW, hy = -352, st = m.style;
    if (st === "afro") pen.ellipse(0, hy - 18, w + 34, 76, m.hair);
    else if (st === "long" || st === "fringe") pen.shape([[-w - 8, hy - 20], [w + 8, hy - 20], [w + 12, hy + 80], [-w - 12, hy + 80]], m.hair);
    else if (st === "bob") pen.ellipse(0, hy + 4, w + 14, 66, m.hair);
    else if (st === "shag") {
      const tips = [[-w - 16, hy - 24]];
      for (let i = 0; i < 9; i++) { const u = i / 8; tips.push([-w - 16 + (2 * w + 32) * u, hy + 48 + 14 * (i % 2) - 10 * Math.sin(Math.PI * u)]); }
      pen.shape(tips.concat([[w + 16, hy - 24]]), m.hair);
    } else if (st === "curly") {
      pen.ellipse(0, hy + 14, w + 30, 78, m.hair);
      for (let i = 0; i < 12; i++) { const a = (150 + i * 240 / 11) * Math.PI / 180; pen.ellipse((w + 30) * Math.cos(a), hy + 14 + 74 * Math.sin(a), 26, 24, mix(m.hair, PAPER, 0.06 * (i % 2)), 14, NOSH); }
      for (const side of [-1, 1]) [70, 100].forEach((dy, k) => pen.ellipse(side * (w + 20 - 8 * k), hy + dy, 24, 22, m.hair, 14, NOSH));
    } else if (st === "ponytail") {  // rabo de cavalo preso de lado, caindo atrás do ombro
      pen.shape([[w * 0.5, hy - 44], [w + 20, hy - 26], [w + 40, hy + 30], [w + 34, hy + 96], [w + 14, hy + 128], [w + 2, hy + 80], [w * 0.75, hy - 6]], m.hair);
      pen.ellipse(w + 16, hy - 16, 10, 10, m.accent, 12, NOSH);
    } else if (st === "bun") {  // coque no alto da cabeça
      pen.ellipse(0, hy - 66, 32, 27, m.hair, 20);
      pen.ellipse(0, hy - 48, 22, 6, m.accent, 14, NOSH);
    } else if (st === "braids") {  // duas tranças caindo dos lados até o ombro, com lacinho na ponta
      pen.ellipse(0, hy - 2, w + 8, 60, m.hair);
      for (const side of [-1, 1]) {
        for (let k = 0; k < 6; k++) pen.ellipse(side * (w + 6 - k * 1.5), hy + 14 + k * 20, 14, 13, mix(m.hair, PAPER, 0.07 * (k % 2)), 14, k ? NOSH : undefined);
        pen.rect(side * (w - 2) - 8, hy + 128, 16, 10, m.accent, NOSH);
      }
    }
    if (m.headphones) for (let a0 = 0; a0 < 9; a0++) {
      const a1 = Math.PI + a0 * Math.PI / 8, a2 = Math.PI + (a0 + 1) * Math.PI / 8;
      pen.capsule((w + 14) * Math.cos(a1), hy - 4 + 66 * Math.sin(a1), (w + 14) * Math.cos(a2), hy - 4 + 66 * Math.sin(a2), 6, DARK, FLAT);
    }
    pen.ellipse(0, hy, w, 56, m.skin);
    const top = []; for (let i = 0; i < 13; i++) { const a = Math.PI + i * Math.PI / 12; top.push([w * 1.04 * Math.cos(a), hy - 4 + 58 * Math.sin(a)]); }
    if (["short", "bob", "long", "emo"].includes(st)) pen.shape(top.concat([[w * 0.6, hy - 22], [-w * 0.2, hy - 12], [-w, hy - 6]]), m.hair, NOSH);
    else if (["ponytail", "bun", "braids"].includes(st)) pen.shape(top.concat([[w * 0.95, hy - 10], [w * 0.15, hy - 26], [-w * 0.95, hy - 10]]), m.hair, NOSH);   // cabelo puxado pra trás
    else if (st === "spiky") {
      const sp = [];
      for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 7, r = i % 2 === 0 ? 74 : 60; sp.push([w * Math.cos(a - 0.2), hy + 52 * Math.sin(a - 0.2)], [r * Math.cos(a), hy - 6 + r * Math.sin(a)]); }
      pen.shape(sp.concat([[w, hy - 10], [-w, hy - 10]]), m.hair, NOSH);
    } else if (st === "cap") {
      pen.shape(top, m.accent, NOSH);
      pen.shape([[-w * 0.2, hy - 20], [w + 40, hy - 14], [w + 40, hy - 4], [-w * 0.2, hy - 8]], m.accent, NOSH);
    } else if (st === "beanie") {
      const b = []; for (let i = 0; i < 13; i++) { const a = Math.PI + i * Math.PI / 12; b.push([w * 1.08 * Math.cos(a), hy - 8 + 64 * Math.sin(a)]); }
      pen.shape(b, m.accent, NOSH); pen.rect(-w * 1.08, hy - 22, w * 2.16, 18, mix(m.accent, DARK, 0.25), NOSH);
      pen.ellipse(0, hy - 74, 13, 13, m.accent, 12, NOSH);
    } else if (st === "curly") [-34, -8, 18, 40].forEach((x, k) => pen.ellipse(x, hy - 46 + 6 * (k % 2), 22, 18, m.hair, 14, NOSH));
    else if (st === "bald") pen.shape([[-w * 0.8, hy + 18], [w * 0.8, hy + 18], [w * 0.5, hy + 62], [0, hy + 72], [-w * 0.5, hy + 62]], m.hair, NOSH);
    if (m.headphones) for (const side of [-1, 1]) pen.ellipse(side * (w + 6), hy + 2, 14, 22, m.accent, 14, NOSH);
    // rosto
    if (m.glasses) for (const ex of [-18, 18]) {
      if (m.glasses === "round") { pen.ellipse(ex, hy - 4, 16, 15, DARK, 16, FLAT); pen.ellipse(ex, hy - 4, 12, 11, mix(m.skin, PAPER, 0.55), 16, FLAT); }
      else if (m.glasses === "square") { pen.rect(ex - 17, hy - 16, 34, 24, DARK, FLAT); pen.rect(ex - 13, hy - 12, 26, 16, mix(m.skin, PAPER, 0.55), FLAT); }
    }
    if (m.glasses) pen.rect(-4, hy - 8, 8, 3, DARK, FLAT);
    for (const ex of [-18, 18]) {
      if (m.glasses !== "sun") eye(pen, ex, hy - 4, eyes);
    }
    if (m.glasses === "sun") {  // óculos escuros: lentes arredondadas mais largas em cima, ponte e reflexo
      for (const ex of [-19, 19]) {
        const d = ex > 0 ? 1 : -1, lens = [];
        for (let i = 0; i <= 16; i++) { const a = Math.PI * i / 16; lens.push([ex + 17 * Math.cos(a), hy - 8 + 15 * Math.sin(a)]); }
        lens.push([ex - 19, hy - 12], [ex + 19, hy - 12]);
        pen.shape(lens.map(([x, y]) => [x + d * 0, y]), [26, 26, 32], NOSH);
        pen.capsule(ex - 9, hy - 6, ex - 3, hy - 9, 2, [120, 124, 140], FLAT);
      }
      pen.rect(-6, hy - 12, 12, 4, [26, 26, 32], FLAT);
      for (const s of [-1, 1]) pen.rect(s > 0 ? 38 : -44, hy - 12, 6, 4, [26, 26, 32], FLAT);
    }
    if (st === "shag") {
      const fr = top.concat([[w * 1.04, hy - 10]]);
      for (let k = 0; k < 6; k++) { const u = k / 5; fr.push([w * (0.9 - 1.9 * u), hy - 2 + 10 * (k % 2) + 14 * u], [w * (0.75 - 1.9 * u), hy - 26]); }
      pen.shape(fr.concat([[-w * 1.06, hy + 18]]), m.hair, NOSH);
    }
    if (st === "fringe") pen.shape(top.concat([[w * 1.04, hy - 18], [-w * 1.04, hy - 18]]), m.hair, NOSH);
    if (m.lady && eyes === "open") for (const ex of [-18, 18]) {
      const d = ex > 0 ? 1 : -1;
      for (let k = 0; k < 3; k++) pen.capsule(ex + d * (2 + 4 * k), hy - 11, ex + d * (5 + 6 * k), hy - 18 + 2 * k, 1.3, DARK, FLAT);
    }
    if (st === "emo") pen.shape([[w * 0.9, hy - 40], [-w * 1.05, hy - 34], [-w * 1.1, hy + 12], [-w * 0.55, hy + 8], [-w * 0.1, hy - 8], [w * 0.4, hy - 22]], m.hair, FLAT);
    if (m.beard === "full") pen.shape([[-w, hy + 2], [-w * 0.9, hy + 34], [-w * 0.5, hy + 62], [0, hy + 72], [w * 0.5, hy + 62], [w * 0.9, hy + 34], [w, hy + 2], [w * 0.62, hy + 18], [0, hy + 16], [-w * 0.62, hy + 18]], m.hair, FLAT);
    else if (m.beard === "goatee") pen.shape([[-16, hy + 38], [16, hy + 38], [12, hy + 70], [0, hy + 80], [-12, hy + 70]], m.hair, FLAT);
    if (m.mustache) pen.shape([[-24, hy + 24], [-10, hy + 14], [0, hy + 17], [10, hy + 14], [24, hy + 24], [0, hy + 21]], m.hair, FLAT);
    const [shape, amount] = mouth;
    if (shape === "A") pen.ellipse(0, hy + 30, 13 + 3 * amount, 4 + 18 * amount, MOUTH, 16, FLAT);
    else if (shape === "grin") pen.shape([[-14, hy + 24], [14, hy + 24], [8, hy + 34], [-8, hy + 34]], MOUTH, FLAT);
    else if (m.lady) { pen.ellipse(0, hy + 27.5, 10, 3, [186, 44, 60], 12, FLAT); pen.ellipse(0, hy + 31, 9, 3, [186, 44, 60], 12, FLAT); }
    else pen.rect(-9, hy + 27, 18, 4, DARK, FLAT);
    if (m.earrings) for (const sd of [-1, 1]) { pen.ellipse(sd * (w - 1), hy + 24, 7, 7, BRASS, 12, FLAT); pen.ellipse(sd * (w - 1), hy + 24, 3, 3, mix(BRASS, DARK, 0.4), 8, FLAT); }
    const blush = mix(m.skin, [230, 110, 110], 0.35);
    pen.ellipse(-30, hy + 14, 9, 6, blush, 12, FLAT); pen.ellipse(30, hy + 14, 9, 6, blush, 12, FLAT);
    pen.pop();
  }

  // ---------- corpo ----------
  function legs(pen, m, sq = 0) {
    const hipY = -150 + sq;
    for (const side of [-1, 1]) {
      const hx = 22 * side, fx = 30 * side, a = ik(hx, hipY, fx, -16, 70, 70, 1), b = ik(hx, hipY, fx, -16, 70, 70, -1);
      const [kx, ky] = Math.abs(a[0]) >= Math.abs(b[0]) ? a : b;
      pen.capsule(hx, hipY, kx, ky, 17, m.pants); pen.capsule(kx, ky, fx, -16, 16, m.pants);
      pen.ellipse(34 * side, -8, 28, 12, DARK);
    }
  }
  function torso(pen, m, seated = false) {
    const hip = seated ? -170 : -145;
    pen.shape([[-48, -292], [48, -292], [40, hip], [-40, hip]], m.shirt);
    pen.rect(-40, hip - 30, 80, 12, m.accent, FLAT);
    if (m.jacket) for (const s of [-1, 1]) pen.shape([[48 * s, -292], [20 * s, -292], [16 * s, hip], [42 * s, hip]], m.jacket, NOSH);
    if (m.skirt && !seated) pen.shape([[-40, hip - 30], [40, hip - 30], [66, hip + 52], [-66, hip + 52]], m.shirt);
  }
  function elbow(sx, sy, hx, hy) { const a = ik(sx, sy, hx, hy, 68, 68, 1), b = ik(sx, sy, hx, hy, 68, 68, -1); return a[1] >= b[1] ? a : b; }
  function arm(pen, m, sx, sy, hx, hy) {
    const [ex, ey] = elbow(sx, sy, hx, hy);
    pen.capsule(sx, sy, ex, ey, 16, m.jacket || m.shirt); pen.capsule(ex, ey, hx, hy, 12, m.skin); pen.ellipse(hx, hy, 17, 16, m.skin);
  }

  // ---------- instrumentos ----------
  const BODY = [[-22, -12], [-42, -30], [-44, -42], [-30, -46], [-10, -38], [14, -40], [40, -48], [64, -40], [76, -20], [72, 0], [80, 24], [70, 44], [44, 52], [14, 46], [-10, 40], [-34, 38], [-46, 30], [-40, 18], [-22, 12]];
  const GUARD = [[-30, -26], [-6, -28], [22, -24], [34, -6], [52, 26], [34, 38], [2, 34], [-30, 28]];
  function stringed(pen, color, neck, bass, kind) {
    const n = bass ? 4 : 6;
    pen.rect(-neck, -9, neck - 20, 18, WOOD);
    for (let k = 1; k < 9; k++) pen.rect(-neck + k * (neck - 30) / 9, -9, 2, 18, mix(WOOD, PAPER, 0.5), FLAT);
    const hx = -neck;
    pen.shape([[hx + 4, -9], [hx - 40, -16], [hx - 46, 6], [hx + 4, 9]], DARK);
    for (let i = 0; i < n / 2; i++) { pen.ellipse(hx - 12 - 12 * i, -17, 4, 4, METAL, 8, FLAT); pen.ellipse(hx - 12 - 12 * i, 10, 4, 4, METAL, 8, FLAT); }
    let end;
    if (kind === "acoustic") {
      pen.ellipse(-6, 0, 50, 44, color); pen.ellipse(34, 2, 62, 56, color);
      pen.ellipse(12, 0, 17, 17, mix(color, DARK, 0.5), 20, FLAT); pen.ellipse(12, 0, 13, 13, DARK, 20, FLAT);
      pen.rect(46, -18, 9, 36, DARK, FLAT); end = 50;
    } else {
      const k = bass ? [1.15, 1.08] : [1, 1];
      pen.shape(BODY.map(([x, y]) => [x * k[0], y * k[1]]), color);
      const dark = color[0] + color[1] + color[2] < 330, guard = dark ? mix(PAPER, color, 0.12) : [34, 32, 38];
      pen.shape(GUARD.map(([x, y]) => [x * k[0], y * k[1]]), guard, FLAT);
      for (const px of bass ? [14] : [6, 28]) pen.rect(px * k[0] - 5, -16, 10, 32, dark ? mix(DARK, PAPER, 0.25) : DARK, FLAT);
      pen.rect(48 * k[0], -14, 9, 28, METAL, FLAT);
      for (const [kx, ky] of [[58, 30], [68, 20]]) pen.ellipse(kx * k[0], ky * k[1], 5, 5, METAL, 8, FLAT);
      end = 52 * k[0];
    }
    for (let i = 0; i < n; i++) pen.rect(hx - 8, -6 + i * (12 / (n - 1)), end - hx + 8, 1.2, PAPER, FLAT);
  }

  // ---------- músicos (pose congelada de quem está tocando com vontade) ----------
  function player(pen, m, x, y, scale, t) {
    const A = motion(m, t), sq = A ? A.sq : 0;
    pen.push(); pen.translate(x, y); pen.scale(scale * m.height);
    legs(pen, m, sq);
    pen.push(); pen.translate(0, sq);
    const happy = m.eyes === "happy" ? "happy" : "open";
    if (m.role === "vocal") {
      torso(pen, m);
      const open = A ? 0.2 + 0.6 * Math.abs(Math.sin(TAU * (A.t + A.ph))) : 0.55;
      head(pen, m, ["A", open], 6 + (A ? A.tilt : 0), happy, A ? A.nod * 0.6 : 0);
      const fx = A ? -150 + 26 * A.sway : -150, fy = A ? -330 + 40 * Math.sin(TAU * (A.t / 1 + A.ph)) : -330;
      arm(pen, m, -46, -280, fx, fy);            // braço livre no alto
      pen.capsule(26, -296, 16, -250, 8, DARK); pen.ellipse(28, -304, 13, 13, METAL);
      arm(pen, m, 46, -280, 20, -258);
    } else {
      const bass = m.role === "bass", kind = m.role === "acoustic" ? "acoustic" : "electric";
      torso(pen, m);
      head(pen, m, happy === "happy" ? ["grin", 0] : ["closed", 0], (bass ? 4 : -4) + (A ? A.tilt : 0), happy, A ? A.nod : 0);
      const ang = m.neck + (A ? 3 * A.sway - 0.4 * A.sq : 0);
      pen.push(); pen.translate(14, -186); pen.rotate(ang);
      stringed(pen, m.inst, bass ? 230 : 170, bass, kind);
      pen.pop();
      const reach = bass ? -190 : -150, r = ang * Math.PI / 180;
      arm(pen, m, -46, -280, 14 + reach * Math.cos(r), -186 + reach * Math.sin(r) + 10);
      arm(pen, m, 46, -280, 34, -206 + (A ? 34 * A.strum - 12 : 0));   // palhetada
    }
    pen.pop(); pen.pop();
  }

  function kickName(pen, name) {
    const words = name.toUpperCase().split(/\s+/).filter(Boolean); if (!words.length) return;
    let rows = [];
    for (const w of words) { if (rows.length && rows[rows.length - 1].length + 1 + w.length <= 10) rows[rows.length - 1] += " " + w; else rows.push(w); }
    if (rows.length > 2) rows = [words.slice(0, words.length >> 1).join(" "), words.slice(words.length >> 1).join(" ")];
    const size = Math.min(150 / Math.max(...rows.map(r => r.length)) * (rows.length === 1 ? 1 : 0.95), 34);
    rows.forEach((row, i) => pen.text(0, -112 + (i - (rows.length - 1) / 2) * size * 1.15, row, Math.max(8, size * pen.unit()), DARK));
  }

  function _drum(pen, cx, top, w, h, shell) {
    pen.push(); pen.translate(cx, top);
    pen.rect(-w / 2, 0, w, h, shell); pen.ellipse(0, h, w / 2, w * 0.1, shell, 20, FLAT);
    pen.rect(-w / 2, 2, w, 4, METAL, FLAT); pen.rect(-w / 2, h - 6, w, 4, METAL, FLAT);
    pen.ellipse(0, 0, w / 2 + 2, w * 0.14 + 2, METAL, 24, NOSH); pen.ellipse(0, 0, w / 2 - 3, w * 0.14 - 2, PAPER, 24, FLAT);
    pen.pop();
  }
  function _stand(pen, x, top) {
    pen.capsule(x, top, x, -30, 3.5, METAL, FLAT);
    for (const d of [-1, 1]) pen.capsule(x, -34, x + 34 * d, 0, 3, METAL, FLAT);
    pen.capsule(x, -34, x, -2, 3, METAL, FLAT);
  }
  function _cymbal(pen, x, y, r, tilt) {
    pen.push(); pen.translate(x, y); pen.rotate(tilt);
    pen.ellipse(0, 0, r, r * 0.16, BRASS, 28); pen.ellipse(0, 0, r * 0.75, r * 0.1, mix(BRASS, PAPER, 0.2), 24, FLAT);
    pen.ellipse(0, -2, r * 0.16, r * 0.08, mix(BRASS, DARK, 0.3), 12, FLAT);
    pen.pop();
  }
  // baterista sentado de frente num kit simples (band.drummer_front): corpo inteiro aparece atrás do bumbo
  function drummer(pen, m, x, y, scale, name, t) {
    const shell = m.inst, A = motion(m, t);
    // baquetas alternando em colcheias; o bumbo pulsa e o prato balança no tempo
    const hitL = A ? Math.exp(-((t / (BEAT / 2)) % 1) * 4) * ((Math.floor(t / (BEAT / 2)) % 2) ? 1 : 0.2) : 0;
    const hitR = A ? Math.exp(-((t / (BEAT / 2)) % 1) * 4) * ((Math.floor(t / (BEAT / 2)) % 2) ? 0.2 : 1) : 0;
    const kick = A ? A.fall : 0;
    pen.push(); pen.translate(x, y); pen.scale(scale * m.height);
    _stand(pen, -175, -330); _stand(pen, 180, -310);
    pen.rect(-60, -128, 120, 18, DARK);                       // banco
    const sh = 8 + 4 * kick;
    pen.push(); pen.translate(0, sh);
    torso(pen, m, true);
    head(pen, m, m.eyes === "happy" ? ["grin", 0] : ["closed", 0], 3 + (A ? 5 * kick - 2 * hitL : 0), m.eyes === "happy" ? "happy" : "open", A ? 6 * kick : 0);
    pen.pop();
    for (const side of [-1, 1]) {                             // pernas sentadas dos lados do bumbo
      const kx = 90 * side, ky = -122;
      pen.capsule(24 * side, -112, kx, ky, 18, m.pants); pen.capsule(kx, ky, 84 * side, -10, 16, m.pants);
      pen.ellipse(84 * side, -8, 22, 10, DARK);
    }
    const kk = 1 + 0.04 * kick;
    pen.ellipse(0, -92, 92 * kk, 92 * kk, shell); pen.ellipse(0, -92, 80 * kk, 80 * kk, PAPER, 28, FLAT);   // bumbo
    for (const d of [-1, 1]) pen.capsule(70 * d, -40, 100 * d, -2, 4, METAL, FLAT);
    pen.push(); pen.translate(0, 20); pen.scale(0.82); pen.translate(0, -20); kickName(pen, name); pen.pop();
    pen.capsule(-140, -150, -140, -30, 3.5, METAL, FLAT);                                 // caixa no pedestal
    for (const d of [-1, 1]) pen.capsule(-140, -34, -140 + 30 * d, -2, 3, METAL, FLAT);
    _drum(pen, -140, -176 - 3 * hitL, 80, 30, shell);
    _drum(pen, 145, -176, 84, 140, shell);                                                // surdo
    _cymbal(pen, -175, -336, 70, -10 - 6 * kick); _cymbal(pen, 180, -316, 74, 10 + 5 * hitR);
    const liftL = A ? 1 - hitL : 1, liftR = A ? 1 - hitR : 1;
    for (const [side, hx, hy, tx, ty, lift] of [[-1, -104, -214 - 34 * liftL, -140, -178, liftL], [1, 104, -214 - 34 * liftR, 145, -178, liftR]]) {
      arm(pen, m, 46 * side, -282 + sh, hx, hy);
      const ang = Math.atan2(ty - hy, tx - hx) - 0.8 * lift * (tx > hx ? 1 : -1);
      pen.capsule(hx, hy, hx + 74 * Math.cos(ang), hy + 74 * Math.sin(ang), 4, WOOD, NOSH);
    }
    pen.pop();
  }

  // ---------- cenários (1080x1920, tamanho de story) ----------
  const SW = 1080, SH = 1920, FLOOR = 1500;
  const VY = 600;   // o editor esconde o céu acima disso (a imagem e o vídeo saem inteiros, 9:16)
  function stars(g, n, seed, h) { const r = rng(seed); g.fillStyle = "rgba(241,234,220,.75)"; for (let i = 0; i < n; i++) { g.beginPath(); g.arc(r() * SW, r() * h, r() * 3 + 1, 0, 7); g.fill(); } }
  function planks(g, top, col) {
    g.fillStyle = css(col); g.fillRect(0, top, SW, SH - top);
    g.strokeStyle = css(mix(col, DARK, 0.25)); g.lineWidth = 5;
    for (let x = -600; x < SW + 600; x += 150) { g.beginPath(); g.moveTo(SW / 2 + (x - SW / 2) * 0.55, top); g.lineTo(x, SH); g.stroke(); }
  }
  const SCENES = {
    palco: { label: "Palco", icon: "🎤", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, FLOOR); grd.addColorStop(0, "#10162b"); grd.addColorStop(1, "#2a3a62");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH); stars(g, 70, 7, 1100);
      const cols = [[226, 112, 72], [82, 150, 180], [226, 186, 84], [226, 112, 72], [82, 150, 180]];
      cols.forEach((c, i) => { const x = 120 + i * 210; g.fillStyle = css(c, 0.16); g.beginPath(); g.moveTo(x, 0); g.lineTo(x - 230, FLOOR + 40); g.lineTo(x + 230, FLOOR + 40); g.fill(); });
      planks(g, FLOOR - 120, [150, 98, 58]);
    } },
    garagem: { label: "Garagem", icon: "🚪", draw(g) {
      g.fillStyle = "#8a4f3e"; g.fillRect(0, 0, SW, SH);
      g.strokeStyle = "rgba(40,20,16,.35)"; g.lineWidth = 4;
      for (let y = 0, row = 0; y < FLOOR; y += 60, row++) { g.beginPath(); g.moveTo(0, y); g.lineTo(SW, y); g.stroke(); for (let x = (row % 2) * 70; x < SW; x += 140) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 60); g.stroke(); } }
      const pen = new Pen(g, 11, 1.5);
      pen.rect(50, 640, 170, 240, [226, 186, 84]); pen.rect(72, 670, 126, 90, [30, 30, 36], { border: false, shadow: false });
      pen.ellipse(135, 715, 30, 30, [226, 112, 72], 20, { border: false, shadow: false });
      pen.rect(860, 650, 180, 100, [240, 236, 220]); pen.rect(876, 666, 148, 68, [120, 170, 210], { border: false, shadow: false });
      g.fillStyle = "#6f6b70"; g.fillRect(0, FLOOR - 120, SW, SH); g.fillStyle = "rgba(0,0,0,.12)"; for (let x = 0; x < SW; x += 270) g.fillRect(x, FLOOR - 120, 6, SH);
    } },
    luau: { label: "Luau", icon: "🌴", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, 1150); grd.addColorStop(0, "#2a2350"); grd.addColorStop(1, "#d8735e");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH); stars(g, 40, 3, 600);
      g.fillStyle = "#f3e6b0"; g.beginPath(); g.arc(930, 720, 70, 0, 7); g.fill();
      g.fillStyle = "#2c5f86"; g.fillRect(0, 1100, SW, 300); g.fillStyle = "rgba(255,255,255,.25)";
      for (let i = 0; i < 12; i++) g.fillRect(80 + i * 80, 1150 + (i % 3) * 60, 60, 6);
      g.fillStyle = "#e3c58f"; g.fillRect(0, FLOOR - 140, SW, SH);
      const pen = new Pen(g, 5, 1.5);
      pen.capsule(140, FLOOR - 120, 190, 760, 22, [120, 80, 50]);
      for (let k = 0; k < 6; k++) { const a = (-160 + k * 34) * Math.PI / 180; pen.shape([[190, 760], [190 + 220 * Math.cos(a - 0.12), 760 + 220 * Math.sin(a - 0.12) + 60], [190 + 260 * Math.cos(a), 760 + 260 * Math.sin(a) + 80], [190 + 220 * Math.cos(a + 0.12), 760 + 220 * Math.sin(a + 0.12) + 60]], [70, 130, 80]); }
    } },
    lua: { label: "Na Lua", icon: "🌙", draw(g) {
      g.fillStyle = "#07091a"; g.fillRect(0, 0, SW, SH); stars(g, 160, 21, 1300);
      const pen = new Pen(g, 13, 1.5);
      pen.ellipse(800, 700, 120, 120, [70, 130, 200]);
      pen.shape([[740, 640], [810, 620], [850, 670], [800, 710], [760, 690]], [90, 160, 90], { border: false, shadow: false });
      pen.shape([[820, 750], [880, 730], [890, 780], [840, 790]], [90, 160, 90], { border: false, shadow: false });
      // foguete
      pen.shape([[140, 1150], [200, 980], [260, 1150]], [226, 112, 72]); pen.rect(150, 1150, 100, 230, [232, 228, 216]);
      pen.ellipse(200, 1230, 26, 26, [82, 150, 180]); pen.shape([[150, 1300], [110, 1390], [150, 1380]], [226, 112, 72]); pen.shape([[250, 1300], [290, 1390], [250, 1380]], [226, 112, 72]);
      g.fillStyle = "#b9b9c2"; g.beginPath(); g.moveTo(0, 1390); for (let x = 0; x <= SW; x += 60) g.lineTo(x, 1370 + 18 * Math.sin(x / 90)); g.lineTo(SW, SH); g.lineTo(0, SH); g.fill();
      const r = rng(4); for (let i = 0; i < 14; i++) { const x = r() * SW, y = 1440 + r() * 440, w = 40 + r() * 90; g.fillStyle = "#9d9da8"; g.beginPath(); g.ellipse(x, y, w, w * 0.32, 0, 0, 7); g.fill(); g.fillStyle = "#c9c9d1"; g.beginPath(); g.ellipse(x, y - 6, w * 0.8, w * 0.22, 0, 0, 7); g.fill(); }
      pen.capsule(930, 1400, 930, 1180, 5, [196, 198, 204]); pen.shape([[930, 1180], [1040, 1200], [930, 1250]], [226, 186, 84]);
    } },
    arraia: { label: "Arraiá", icon: "🎉", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, 1400); grd.addColorStop(0, "#151a3a"); grd.addColorStop(1, "#3c3566");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH); stars(g, 60, 9, 900);
      const pen = new Pen(g, 17, 1.5), cols = [[230, 70, 70], [250, 200, 60], [70, 160, 220], [90, 180, 90], [240, 130, 50], [200, 90, 180]];
      for (const [y0, sag, off] of [[640, 50, 0], [860, 50, 2], [1060, 40, 4]]) {
        g.strokeStyle = "rgba(241,234,220,.8)"; g.lineWidth = 3; g.beginPath();
        for (let i = 0; i <= 24; i++) { const x = i * SW / 24, y = y0 + sag * Math.sin(Math.PI * i / 24); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
        for (let i = 0; i < 24; i++) { const x = (i + 0.5) * SW / 24, y = y0 + sag * Math.sin(Math.PI * (i + 0.5) / 24); pen.shape([[x - 18, y], [x + 18, y], [x + 18, y + 44], [x, y + 32], [x - 18, y + 44]], cols[(i + off) % 6], { shadow: false }); }
      }
      for (const [x, y, c] of [[110, 930, 0], [970, 920, 1]]) { pen.shape([[x - 34, y], [x + 34, y], [x + 22, y + 70], [x - 22, y + 70]], cols[c]); pen.rect(x - 22, y + 70, 44, 14, [226, 186, 84]); }
      g.fillStyle = "#7a5236"; g.fillRect(0, 1380, SW, SH);
      g.fillStyle = "rgba(0,0,0,.12)"; const r = rng(2); for (let i = 0; i < 60; i++) g.fillRect(r() * SW, 1400 + r() * 500, 30 + r() * 40, 6);
      // fogueira
      for (let i = 0; i < 4; i++) pen.capsule(70 + i * 22, 1430, 150 - i * 10, 1330, 12, [110, 70, 40]);
      pen.shape([[60, 1420], [100, 1250], [125, 1330], [150, 1220], [185, 1420]], [240, 130, 50]); pen.shape([[90, 1420], [120, 1320], [150, 1420]], [250, 200, 60], { shadow: false });
    } },
    boteco: { label: "Boteco", icon: "🍺", draw(g) {
      g.fillStyle = "#e9e1c8"; g.fillRect(0, 0, SW, SH);
      for (let y = 760; y < 1380; y += 62) for (let x = (y / 62 % 2) * 31; x < SW; x += 62) { g.fillStyle = (Math.floor(x / 62) + Math.floor(y / 62)) % 2 ? "#4a9cc9" : "#f3ecdc"; g.fillRect(x, y, 60, 60); }
      g.fillStyle = "#c95a37"; g.fillRect(0, 730, SW, 30);
      const pen = new Pen(g, 23, 1.5);
      pen.rect(330, 850, 420, 96, [150, 40, 36]); g.fillStyle = css(PAPER); g.font = "800 50px Jost, Futura, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(TX.bar, 540, 900);
      g.strokeStyle = "#333"; g.lineWidth = 3; g.beginPath(); for (let i = 0; i <= 20; i++) { const x = i * SW / 20, y = 640 + 50 * Math.sin(Math.PI * i / 20); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
      for (let i = 0; i < 20; i++) { const x = (i + 0.5) * SW / 20, y = 640 + 50 * Math.sin(Math.PI * (i + 0.5) / 20); g.fillStyle = "rgba(255,220,120,.35)"; g.beginPath(); g.arc(x, y + 18, 26, 0, 7); g.fill(); g.fillStyle = "#ffe38a"; g.beginPath(); g.arc(x, y + 18, 11, 0, 7); g.fill(); }
      pen.rect(60, 840, 180, 104, [40, 120, 60]); g.fillStyle = css(PAPER); g.font = "700 30px Jost, sans-serif"; g.fillText(TX.beer1, 150, 876); g.fillText(TX.beer2, 150, 912);
      g.fillStyle = "#8a8378"; g.fillRect(0, 1380, SW, SH); g.fillStyle = "rgba(0,0,0,.1)"; for (let x = 0; x < SW; x += 120) g.fillRect(x, 1380, 4, SH);
      // mesa amarela de plástico com garrafa
      pen.rect(860, 1300, 190, 26, [242, 200, 75]); pen.rect(880, 1326, 14, 110, [242, 200, 75]); pen.rect(1016, 1326, 14, 110, [242, 200, 75]);
      pen.rect(930, 1190, 34, 110, [120, 70, 30]); pen.rect(940, 1160, 14, 34, [120, 70, 30]); pen.rect(985, 1250, 30, 50, [240, 236, 220]);
    } },
    festival: { label: "Festival", icon: "🎪", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, 1300); grd.addColorStop(0, "#1b1035"); grd.addColorStop(1, "#5a2d6e");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH);
      g.strokeStyle = "#9aa0aa"; g.lineWidth = 10; g.strokeRect(40, 620, SW - 80, 40);
      for (let x = 40; x < SW - 40; x += 40) { g.lineWidth = 3; g.beginPath(); g.moveTo(x, 620); g.lineTo(x + 40, 660); g.stroke(); }
      g.lineWidth = 14; for (const x of [50, SW - 50]) { g.beginPath(); g.moveTo(x, 640); g.lineTo(x, 1400); g.stroke(); }
      [[226, 112, 72], [82, 150, 180], [242, 200, 75], [200, 90, 180], [82, 150, 180], [226, 112, 72]].forEach((c, i) => {
        const x = 130 + i * 165; g.fillStyle = css(c, 0.22); g.beginPath(); g.moveTo(x, 660); g.lineTo(x - 220, 1400); g.lineTo(x + 220, 1400); g.fill();
        g.fillStyle = css(c); g.beginPath(); g.arc(x, 675, 18, 0, 7); g.fill(); });
      g.fillStyle = "#3a2a2a"; g.fillRect(0, 1380, SW, SH);
      planks(g, 1380, [70, 60, 70]);
      // público: cabeças e mãos no pé da imagem
      const r = rng(31); for (let i = 0; i < 22; i++) { const x = r() * SW, y = 1870 + r() * 40; g.fillStyle = "#120c1c"; g.beginPath(); g.arc(x, y - 60, 34, 0, 7); g.fill(); g.fillRect(x - 46, y - 30, 92, 90); if (r() < 0.4) { g.fillRect(x + 20, y - 150, 14, 90); g.beginPath(); g.arc(x + 27, y - 156, 14, 0, 7); g.fill(); } }
    } },
    telhado: { label: "Telhado", icon: "🏙️", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, 1300); grd.addColorStop(0, "#f2a65a"); grd.addColorStop(0.6, "#e0707a"); grd.addColorStop(1, "#6a5a8a");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH);
      g.fillStyle = "#ffe9a8"; g.beginPath(); g.arc(760, 900, 120, 0, 7); g.fill();
      const pen = new Pen(g, 29, 1.5), r = rng(8);
      for (let x = -40, k = 0; x < SW; k++) { const w = 90 + r() * 120, h = 300 + r() * 560, c = mix([60, 52, 90], [110, 90, 130], r());
        pen.rect(x, 1300 - h, w, h + 100, c);
        for (let wy = 1300 - h + 30; wy < 1260; wy += 60) for (let wx = x + 18; wx < x + w - 24; wx += 40) if (r() < 0.55) pen.rect(wx, wy, 18, 26, [255, 220, 130], { border: false, shadow: false });
        x += w + 8; }
      g.fillStyle = "#5b4d5e"; g.fillRect(0, 1360, SW, SH); g.fillStyle = "#4a3e4c"; g.fillRect(0, 1360, SW, 30);
      pen.rect(860, 1150, 160, 220, [140, 120, 110]); pen.rect(880, 1100, 120, 60, [110, 90, 80]);   // caixa d'água
      pen.capsule(120, 1360, 120, 1130, 5, [196, 198, 204]); pen.capsule(70, 1170, 170, 1130, 5, [196, 198, 204]);   // antena
    } },
    barco: { label: "Barco no rio", icon: "🛶", draw(g) {
      const grd = g.createLinearGradient(0, 0, 0, 1000); grd.addColorStop(0, "#9fd3e8"); grd.addColorStop(1, "#f3e3b8");
      g.fillStyle = grd; g.fillRect(0, 0, SW, SH);
      const pen = new Pen(g, 37, 1.5);
      g.fillStyle = "#5f9a5a"; g.beginPath(); g.moveTo(0, 980); for (let x = 0; x <= SW; x += 40) g.lineTo(x, 900 - 70 * Math.sin(x / 170) - 40 * Math.sin(x / 61)); g.lineTo(SW, 1080); g.lineTo(0, 1080); g.fill();
      for (const [x, y] of [[90, 900], [300, 860], [930, 880], [1020, 930]]) { pen.capsule(x, y + 140, x, y, 10, [110, 76, 52]); pen.ellipse(x, y - 30, 70, 60, [70, 130, 70]); }
      g.fillStyle = "#2f6f8f"; g.fillRect(0, 1060, SW, SH);
      g.fillStyle = "rgba(255,255,255,.35)"; for (let i = 0; i < 26; i++) g.fillRect((i * 173) % SW, 1100 + (i * 97) % 220, 70, 6);
      // casco e o convés de madeira (o chão da banda)
      g.fillStyle = "#8a3b2e"; g.beginPath(); g.moveTo(-20, 1330); g.lineTo(SW + 20, 1330); g.lineTo(SW - 60, 1920); g.lineTo(60, 1920); g.fill();
      planks(g, 1360, [176, 124, 78]); g.fillStyle = "#6b2d23"; g.fillRect(0, 1330, SW, 34);
      pen.capsule(980, 1360, 980, 760, 9, [110, 76, 52]); pen.shape([[990, 780], [990, 1180], [1070, 1180]], [240, 236, 220]);   // mastro e vela
    } },
  };

  // ---------- tecladista (band.keyboardist, pose parada) ----------
  function keyboardist(pen, m, x, y, scale, t) {
    const A = motion(m, t), sq = A ? A.sq * 0.5 : 0;
    pen.push(); pen.translate(x, y); pen.scale(scale * m.height);
    legs(pen, m, sq); pen.push(); pen.translate(0, sq); torso(pen, m);
    head(pen, m, m.eyes === "happy" ? ["grin", 0] : ["closed", 0], -3 + (A ? A.tilt : 0), m.eyes === "happy" ? "happy" : "open", A ? A.nod * 0.7 : 0);
    pen.pop();
    for (const a of [-1, 1]) pen.capsule(-112 * a, -150, 96 * a, -4, 6, METAL, NOSH);
    pen.ellipse(0, -78, 7, 7, DARK, 10, FLAT);
    const body = [34, 32, 40], back = -184, front = -166;
    pen.shape([[-138, back], [138, back], [146, front], [-146, front]], body);
    pen.rect(-132, back + 4, 264, front - back - 6, PAPER, FLAT);
    for (let k = 1; k < 24; k++) { const kx = -132 + 264 * k / 24; pen.rect(kx - 0.7, back + 4, 1.4, front - back - 6, [150, 146, 150], FLAT); if (k % 7 !== 3 && k % 7 !== 0) pen.rect(kx - 3, back + 4, 6, 8, DARK, FLAT); }
    pen.rect(-146, front, 292, 22, mix(body, PAPER, 0.08)); pen.rect(-134, front + 8, 32, 6, m.inst, FLAT);
    for (let k = 0; k < 4; k++) pen.ellipse(92 + 13 * k, front + 11, 4, 4, mix(body, PAPER, 0.5), 8, FLAT);
    const walk = k => (A ? 30 * Math.sin(TAU * (A.t * (0.5 + 0.5 * k) + A.ph + k * 0.3)) : 0);
    for (const [side, hx0, k] of [[-1, -80, 0], [1, 60, 1]]) {
      const hx = hx0 + walk(k), press = A ? 6 * Math.max(0, Math.sin(TAU * (A.t * 2 + k * 0.5 + A.ph))) : 0;
      const sx = 46 * side, sy = -280 + sq, ex = 74 * side + 0.15 * (hx - 75 * side), ey = -212 + sq * 0.6, hy = back + 8 + press;
      pen.capsule(sx, sy, ex, ey, 16, m.jacket || m.shirt); pen.capsule(ex, ey, hx, hy, 12, m.skin); pen.ellipse(hx, hy, 15, 11, m.skin);
    }
    pen.pop();
  }

  // ---------- a banda ----------
  const ROLES = [["vocal", "Vocal", "🎤"], ["guitar", "Guitarra", "🎸"], ["bass", "Baixo", "🎸"], ["drums", "Bateria", "🥁"], ["keys", "Teclado", "🎹"], ["acoustic", "Violão", "🪕"]];
  const STYLES = ["short", "curly", "afro", "long", "bob", "ponytail", "bun", "braids", "spiky", "bald", "cap", "fringe", "beanie"];
  const FEM_STYLES = ["long", "bob", "ponytail", "bun", "braids", "curly", "afro", "fringe", "long", "ponytail"];
  const MASC_STYLES = ["short", "curly", "afro", "spiky", "bald", "cap", "beanie", "long", "short"];
  const HAIR6 = [[42, 32, 28], [100, 64, 40], [196, 156, 96], [156, 74, 42], [200, 196, 190], [200, 90, 180]];
  const DETAILS = ["", "glasses", "sun", "beard", "mustache", "earrings"];
  const OUTFITS = ["shirt", "jacket", "dress"];
  const TEXT_COLORS = [[226, 112, 72], [82, 150, 180], [226, 186, 84], [90, 140, 90]];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const next = (a, v) => a[(a.findIndex(x => JSON.stringify(x) === JSON.stringify(v)) + 1) % a.length];

  function randomMember(role) {
    const femme = Math.random() < 0.5, r = Math.random();
    return { role, femme, skin: pick(SKINS), style: pick(femme ? FEM_STYLES : MASC_STYLES), hair: pick(HAIR6), shirt: pick(CLOTHES),
      outfit: femme && r < 0.25 ? "dress" : r < 0.5 ? "jacket" : "shirt",
      jacketColor: pick([[30, 30, 36], [60, 64, 84], [150, 40, 36], [110, 86, 60]]),
      detail: Math.random() < 0.55 ? "" : pick(femme ? ["glasses", "sun", "earrings", "earrings"] : ["glasses", "sun", "beard", "mustache", "beard"]),
      accent: pick(CLOTHES), inst: pick(CLOTHES), pants: pick([[40, 44, 60], [30, 30, 36], [70, 90, 130]]),
      headW: 0.9 + Math.random() * 0.2, height: 0.95 + Math.random() * 0.1, neck: 18 + Math.random() * 14, happy: Math.random() < 0.3, x: SW / 2, y: 1700,
      phase: Math.round(Math.random() * 8) / 8 * 0.5 };
  }
  function toDraw(s) {
    return { role: s.role, skin: s.skin, style: s.style, hair: s.hair, shirt: s.shirt, pants: s.pants, accent: s.accent, inst: s.inst,
      jacket: s.outfit === "jacket" ? s.jacketColor : null, lady: !!s.femme, skirt: s.outfit === "dress", earrings: s.detail === "earrings",
      glasses: s.detail === "glasses" ? "round" : s.detail === "sun" ? "sun" : null, beard: s.detail === "beard" ? "full" : null,
      mustache: s.detail === "mustache", headphones: false, eyes: s.happy ? "happy" : "open", headW: s.headW, height: s.height, neck: s.neck, phase: s.phase || 0,
      photo: s.photo || null, photoCut: !!s.photoCut };
  }

  const st = {
    scene: "palco", layout: 0,
    members: ["guitar", "vocal", "bass", "drums"].map(randomMember),
    texts: [{ text: "", x: SW / 2, y: 730, rot: -2, color: TEXT_COLORS[0], size: 92, main: true }],
    sel: null, touched: false,
  };
  const SCENE_KEYS = Object.keys(SCENES);
  const LAYOUTS = ["Palco", "Fila", "Roda"];

  const scaleAt = y => 0.72 + 0.6 * Math.max(0, Math.min(1, (y - 1380) / 420));
  const drumK = y => (y < 1600 ? 1.35 : 0.95);
  function arrange() {
    const ms = st.members, n = ms.length, L = LAYOUTS[st.layout];
    if (L === "Palco") {
      const back = ms.filter(m => m.role === "drums" || m.role === "keys"), front = ms.filter(m => !back.includes(m));
      const voc = front.filter(m => m.role === "vocal"), oth = front.filter(m => m.role !== "vocal"), row = oth.slice();
      row.splice(Math.floor(oth.length / 2), 0, ...voc);
      back.forEach((m, k) => { m.x = SW / 2 + (k - (back.length - 1) / 2) * 400; m.y = 1500; });
      const x0 = row.length > 3 ? 190 : row.length === 3 ? 230 : 300;
      row.forEach((m, k) => { m.x = row.length === 1 ? SW / 2 : x0 + (SW - 2 * x0) * k / (row.length - 1); m.y = 1760; });
    } else if (L === "Fila") {
      const big = ms.filter(m => m.role === "drums" || m.role === "keys"), rest = ms.filter(m => !big.includes(m)), row = rest.slice();
      row.splice(Math.floor(rest.length / 2), 0, ...big);   // bateria e teclado no meio: o kit não sai da tela
      row.forEach((m, k) => { m.x = n === 1 ? SW / 2 : 170 + (SW - 340) * k / (n - 1); m.y = 1680; });
    } else {
      ms.forEach((m, k) => { const u = n === 1 ? 0.5 : k / (n - 1); m.x = 170 + (SW - 340) * u; m.y = 1500 + Math.abs(u - 0.5) * 2 * 280; });
    }
  }
  arrange();

  const dxOf = m => (m.role === "vocal" ? 10 : m.role === "drums" || m.role === "keys" ? 0 : 30);
  function box(m) {  // área de toque de cada um (coordenadas do canvas)
    const s = scaleAt(m.y) * (m.role === "drums" ? drumK(m.y) : 1), cx = m.x + dxOf(m) * s;
    const w = m.role === "drums" ? 230 : m.role === "keys" ? 160 : 120, h = m.role === "drums" ? 470 : 600;
    return { x0: cx - w * s, x1: cx + w * s, y0: m.y - h * s, y1: m.y + 20, s, cx };
  }

  const TEXT_MAX_W = SW - 140;  // o adesivo nunca passa da largura do palco: quebra em linhas
  function wrapLines(g, text, maxW) {
    const out = [];
    let cur = "";
    for (const word of text.split(/\s+/).filter(Boolean)) {
      const tryLine = cur ? `${cur} ${word}` : word;
      if (g.measureText(tryLine).width <= maxW) { cur = tryLine; continue; }
      if (cur) out.push(cur);
      cur = "";
      let piece = "";  // palavra sozinha maior que a linha: quebra por letra
      for (const ch of word) {
        if (g.measureText(piece + ch).width > maxW && piece) { out.push(piece); piece = ch; } else piece += ch;
      }
      cur = piece;
    }
    if (cur) out.push(cur);
    return out.length ? out : [text];
  }
  function stickerBox(g, t) {
    const label = t.text || (t.main ? TX.namePh : TX.textPh), fs = t.text ? t.size : t.size * 0.48;
    g.font = `800 ${fs}px Jost, Futura, sans-serif`;
    const pad = fs * 1.4, lines = wrapLines(g, label, TEXT_MAX_W - pad), lh = fs * 1.12;
    const w = Math.max(...lines.map(l => g.measureText(l).width)) + pad, h = t.size * 1.5 + (lines.length - 1) * lh;
    return { w, h, label, lines, lh };
  }
  function drawLines(g, lines, lh) {
    lines.forEach((l, k) => g.fillText(l, 0, 4 + (k - (lines.length - 1) / 2) * lh));
  }
  function drawSticker(g, t, editing) {
    const { w, h, lines, lh } = stickerBox(g, t);
    if (!t.text && !editing) return;
    t.x = Math.min(Math.max(t.x, w / 2 + 20), SW - w / 2 - 20);  // texto que cresceu não sai pela lateral
    t.y = Math.min(Math.max(t.y, VY + h / 2 + 20), SH - h / 2 - 20);  // nem pelo topo da parte visível
    g.save(); g.translate(t.x, t.y); g.rotate(t.rot * Math.PI / 180);
    if (!t.text) { g.fillStyle = "rgba(20,24,44,.55)"; g.fillRect(-w / 2, -h / 2, w, h); g.setLineDash([18, 12]); g.strokeStyle = "rgba(241,234,220,.85)"; g.lineWidth = 5; g.strokeRect(-w / 2, -h / 2, w, h);
      g.fillStyle = "rgba(241,234,220,.85)"; g.textAlign = "center"; g.textBaseline = "middle"; drawLines(g, lines, lh); g.restore(); return; }
    g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(-w / 2 + 10, -h / 2 + 14, w, h);
    g.fillStyle = css(PAPER); g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = css(t.color); g.fillRect(-w / 2, -h / 2, w, 10);
    g.fillStyle = css(DARK); g.textAlign = "center"; g.textBaseline = "middle"; drawLines(g, lines, lh);
    g.restore();
  }

  const anim = { on: false, t: 0, t0: 0, raf: 0 };
  const canvas = document.getElementById("palco"), g = canvas.getContext("2d");
  canvas.width = SW; canvas.height = SH;
  function drawMember(pen, m, main, t = null) {
    const d = toDraw(m), s = scaleAt(m.y);
    if (m.role === "drums") drummer(pen, d, m.x, m.y, s * drumK(m.y), main, t);
    else if (m.role === "keys") keyboardist(pen, d, m.x, m.y, s, t);
    else player(pen, d, m.x + dxOf(m) * s, m.y, s, t);
  }
  // teste de toque pelo desenho de verdade: de quem está na frente pra trás, vê se o boneco cobre o ponto
  const hitCanvas = document.createElement("canvas"); hitCanvas.width = SW; hitCanvas.height = SH;
  const hg = hitCanvas.getContext("2d", { willReadFrequently: true });
  function membersAt(x, y) {  // todos que cobrem o ponto, de quem está na frente pra trás
    const order = st.members.map((m, i) => [m, i]).sort((a, b) => b[0].y - a[0].y), r = 10, out = [];
    for (const [m, i] of order) {
      hg.clearRect(0, 0, SW, SH); drawMember(new Pen(hg, 3, 1.6), m, "", anim.on ? anim.t : null);
      const px = hg.getImageData(Math.round(x - r), Math.round(y - r), 2 * r + 1, 2 * r + 1).data;
      for (let k = 3; k < px.length; k += 4) if (px[k] > 40) { out.push(i); break; }
    }
    return out;
  }
  const memberAt = (x, y) => { const l = membersAt(x, y); return l.length ? l[0] : -1; };
  function draw(editing = true, t = anim.on ? anim.t : null, extra = null) {
    SCENES[st.scene].draw(g);
    const main = (st.texts.find(t => t.main) || {}).text || "";
    if (LAYOUTS[st.layout] === "Palco" && st.members.some(m => m.role === "drums")) new Pen(g, 9, 1.4).rect(SW / 2 - 300, 1490, 600, 70, [46, 42, 50]);
    const pen = new Pen(g, 3, 1.6);
    for (const m of st.members.slice().sort((a, b) => a.y - b.y)) drawMember(new Pen(g, t == null ? 3 : 3 + Math.floor(t * 12), 1.6), m, main, t);
    st.texts.forEach(tx => drawSticker(g, tx, editing));
    tagMark(g);
    if (extra) extra(g);
    if (editing && st.sel && st.sel.type === "m") {  // contorno pontilhado em quem está selecionado
      const b = box(st.members[st.sel.i]); g.save(); g.setLineDash([16, 12]); g.strokeStyle = css([242, 200, 75]); g.lineWidth = 6;
      g.strokeRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0); g.restore();
    }
    placeUi();
  }
  function tagMark(g) {
    g.save(); g.translate(SW / 2, SH - 70); g.rotate(1.5 * Math.PI / 180); g.font = "800 36px Jost, Futura, sans-serif";
    const w = g.measureText("@abandadepapel").width + 40; g.fillStyle = css(PAPER); g.fillRect(-w / 2, -30, w, 60);
    g.fillStyle = css([82, 150, 180]); g.fillRect(-w / 2, -30, w, 8); g.fillStyle = css(DARK); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("@abandadepapel", 0, 4); g.restore();
  }

  // ---------- interação direto na tela ----------
  const $ = q => document.querySelector(q);
  const stage = $("#stage"), tool = $("#tool"), hint = $("#hint"), input = $("#texto");
  const k = () => canvas.getBoundingClientRect().width / SW;
  function toCanvas(e) { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * SW / r.width, (e.clientY - r.top) * SH / r.height]; }
  function hitAt(x, y) {
    for (let i = st.texts.length - 1; i >= 0; i--) { const t = st.texts[i], { w, h } = stickerBox(g, t); if (Math.abs(x - t.x) < w / 2 && Math.abs(y - t.y) < h / 2) return { type: "t", i }; }
    // tocar de novo em quem já está selecionado passa pro de trás (quem está tapado também dá pra pegar)
    const l = membersAt(x, y);
    if (!l.length) return null;
    const cur = st.sel && st.sel.type === "m" ? l.indexOf(st.sel.i) : -1;
    // quem já está selecionado e está debaixo do dedo continua sendo o alvo (pra arrastar);
    // "behind" é quem vem depois dele, pra um toque parado passar pro de trás
    return { type: "m", i: cur >= 0 ? st.sel.i : l[0], behind: cur >= 0 && l.length > 1 ? l[(cur + 1) % l.length] : null };
  }
  let drag = null;
  canvas.addEventListener("pointerdown", e => {
    const [x, y] = toCanvas(e), h = hitAt(x, y);
    input.blur();
    if (!h) { st.sel = null; draw(); return; }
    const o = h.type === "m" ? st.members[h.i] : st.texts[h.i];
    drag = { h, dx: o.x - x, dy: o.y - y, moved: 0, sx: x, sy: y, was: st.sel && st.sel.type === h.type && st.sel.i === h.i };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (!drag) return;
    const [x, y] = toCanvas(e); drag.moved = Math.max(drag.moved, Math.hypot(x - drag.sx, y - drag.sy));
    if (drag.moved < 12) return;
    const o = drag.h.type === "m" ? st.members[drag.h.i] : st.texts[drag.h.i];
    o.x = Math.max(60, Math.min(SW - 60, x + drag.dx));
    o.y = drag.h.type === "m" ? Math.max(1360, Math.min(1840, y + drag.dy)) : Math.max(VY + 60, Math.min(SH - 200, y + drag.dy));
    st.sel = { type: drag.h.type, i: drag.h.i }; st.touched = true; draw();
  });
  canvas.addEventListener("pointerup", () => {
    if (!drag) return;
    const tap = drag.moved < 12;
    if (tap && drag.was && drag.h.behind != null) st.sel = { type: "m", i: drag.h.behind };   // toque de novo: o de trás
    else st.sel = { type: drag.h.type, i: drag.h.i };
    st.touched = true;
    if (drag.h.type === "t" && tap) editText();
    drag = null; draw();
  });

  function btn(icon, label, fn) {
    const b = document.createElement("button"); b.type = "button"; b.innerHTML = `<span>${icon}</span><small>${label}</small>`;
    b.onpointerdown = e => e.stopPropagation(); b.onclick = e => { e.stopPropagation(); fn(); draw(); }; return b;
  }
  function placeUi() {
    const kk = k();
    hint.hidden = st.touched;
    if (!st.touched) { const m = st.members.find(m => m.role === "vocal") || st.members[0], b = box(m); hint.style.left = `${m.x * kk}px`; hint.style.top = `${(b.y0 - VY) * kk}px`; }
    tool.innerHTML = ""; tool.hidden = !st.sel;
    if (!st.sel) return;
    if (st.sel.type === "m") {
      const m = st.members[st.sel.i], b = box(m);
      tool.append(
        btn("🎲", TX.tShuffle, () => { const { role, x, y, photo, photoCut } = m; Object.assign(m, randomMember(role), { x, y, photo, photoCut }); }),
        btn("📷", TX.tPhoto, () => pickPhoto(m)),
        btn(ROLES.find(r => r[0] === m.role)[2], TX.tPlays, () => { m.role = next(ROLES.map(r => r[0]), m.role); }),
        btn("💇", TX.tHair, () => { m.style = next(STYLES, m.style); }),
        btn("🎨", TX.tColor, () => { m.hair = next(HAIR6, m.hair); }),
        btn("✋", TX.tSkin, () => { m.skin = next(SKINS, m.skin); }),
        btn("💄", TX.tFace, () => { m.femme = !m.femme; if (m.femme && (m.detail === "beard" || m.detail === "mustache")) m.detail = ""; }),
        btn("👕", TX.tOutfit, () => { if (m.outfit === "dress") { m.outfit = "shirt"; m.shirt = next(CLOTHES, m.shirt); } else m.outfit = next(OUTFITS, m.outfit); }),
        btn("👓", TX.tDetail, () => { m.detail = next(DETAILS, m.detail); }),
        btn("🗑️", TX.tRemove, () => { st.members.splice(st.sel.i, 1); st.sel = null; }));
      if (m.photo) tool.append(btn("🙂", TX.tPuppet, () => { m.photo = null; m.photoCut = false; }));
      pos(b.cx * kk, Math.max(0, b.y0 - 20 - VY) * kk);
    } else {
      const t = st.texts[st.sel.i];
      tool.append(btn("✏️", TX.tWrite, editText), btn("🎨", TX.tColor, () => { t.color = next(TEXT_COLORS, t.color); }),
        btn("↻", TX.tRotate, () => { t.rot = t.rot > 4 ? -6 : t.rot + 3; }), btn("🔠", TX.tSize, () => { t.size = t.size >= 110 ? 56 : t.size + 18; }));
      if (!t.main) tool.append(btn("🗑️", TX.tRemove, () => { st.texts.splice(st.sel.i, 1); st.sel = null; }));
      pos(t.x * kk, (t.y + stickerBox(g, t).h / 2 - VY) * kk + tool.offsetHeight + 10);
    }
  }
  function pos(x, y) {
    const W2 = stage.clientWidth, half = tool.offsetWidth / 2;
    tool.style.left = `${Math.max(half + 4, Math.min(W2 - half - 4, x))}px`;
    tool.style.top = `${Math.max(tool.offsetHeight + 4, y)}px`;
  }
  function editText() {
    const t = st.texts[st.sel.i]; input.value = t.text; input.hidden = false;
    input.style.top = `${Math.max(0, t.y - stickerBox(g, t).h / 2 - VY) * k()}px`; input.focus(); input.select();
  }
  input.oninput = () => { if (st.sel && st.sel.type === "t") { st.texts[st.sel.i].text = input.value.slice(0, 40); draw(); } };
  input.onblur = () => { input.hidden = true; };
  input.onkeydown = e => { if (e.key === "Enter") input.blur(); };

  const roleOf = r => ROLES.find(x => x[0] === r);
  function pessoas() {
    const box = $("#roles"); box.innerHTML = "";
    const h = document.createElement("strong"); h.textContent = `${TX.band} (${st.members.length}/6)`; box.append(h);
    st.members.forEach((m, i) => {
      const row = document.createElement("div"); row.className = "row";
      const name = document.createElement("button"); name.type = "button"; name.className = "who";
      name.textContent = `${roleOf(m.role)[2]} ${i + 1}. ${TX.roles[m.role]}`;
      name.onclick = () => { st.sel = { type: "m", i }; st.touched = true; box.hidden = true; draw(); };
      const troca = document.createElement("button"); troca.type = "button"; troca.textContent = "🔁"; troca.title = TX.swapInst;
      troca.onclick = () => { m.role = next(ROLES.map(r => r[0]), m.role); pessoas(); draw(); };
      const tira = document.createElement("button"); tira.type = "button"; tira.textContent = "🗑️"; tira.title = TX.tRemove; tira.disabled = st.members.length <= 1;
      tira.onclick = () => { st.members.splice(i, 1); st.sel = null; pessoas(); draw(); };
      row.append(name, troca, tira); box.append(row);
    });
    const add = document.createElement("div"); add.className = "addrow";
    const lbl = document.createElement("small"); lbl.textContent = st.members.length >= 6 ? TX.full : TX.callMore; add.append(lbl);
    if (st.members.length < 6) ROLES.forEach(([r, label, icon]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = `${icon} ${TX.roles[r]}`;
      b.onclick = () => { st.members.push(randomMember(r)); arrange(); st.touched = true; pessoas(); draw(); };
      add.append(b);
    });
    const ok = document.createElement("button"); ok.type = "button"; ok.className = "ok"; ok.textContent = TX.done;
    ok.onclick = () => { box.hidden = true; };
    box.append(add, ok);
  }
  $("#add").onclick = () => { const box = $("#roles"); box.hidden = !box.hidden; $("#cenas").hidden = true; if (!box.hidden) { st.sel = null; pessoas(); draw(); } };
  $("#addtext").onclick = () => { st.texts.push({ text: "", x: SW / 2, y: VY + 330 + 120 * (st.texts.length % 3), rot: 3, color: pick(TEXT_COLORS), size: 64, main: false }); st.sel = { type: "t", i: st.texts.length - 1 }; st.touched = true; draw(); editText(); };
  function cenas() {
    const box = $("#cenas"); box.innerHTML = "";
    for (const key of SCENE_KEYS) {
      const b = document.createElement("button"); b.type = "button"; b.innerHTML = `<span>${SCENES[key].icon}</span>${TX.scenes[key]}`;
      b.setAttribute("aria-pressed", String(st.scene === key));
      b.onclick = () => { st.scene = key; $("#cena small").textContent = TX.scenes[key]; box.hidden = true; draw(); };
      box.append(b);
    }
  }
  $("#cena").onclick = () => { const box = $("#cenas"); box.hidden = !box.hidden; if (!box.hidden) { $("#roles").hidden = true; cenas(); } };
  $("#arranjo").onclick = () => { st.layout = (st.layout + 1) % LAYOUTS.length; $("#arranjo small").textContent = TX.arrange; arrange(); draw(); };
  $("#dado").onclick = () => { st.members = st.members.map(m => Object.assign(randomMember(m.role), { x: m.x, y: m.y, photo: m.photo, photoCut: m.photoCut })); draw(); };

  // ---------- foto do rosto: escolhe, ajusta no oval e recorta (tudo no aparelho, nada é enviado) ----------
  const crop = { img: null, base: 1, z: 1, ox: 0, oy: 0, target: null }, CW = 600, RX = 214, RY = 250;
  const ccv = $("#cropcv"), cg = ccv.getContext("2d");
  function pickPhoto(m) { crop.target = m; $("#foto").value = ""; $("#foto").click(); }
  $("#foto").onchange = e => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const img = new Image();
    img.onload = () => {
      Object.assign(crop, { img, base: Math.max((2 * RX) / img.width, (2 * RY) / img.height), z: 1, ox: 0, oy: 0 });
      $("#zoom").value = 1; $("#crop").hidden = false; drawCrop();
    };
    img.src = URL.createObjectURL(f);
  };
  function cropRect() { const s = crop.base * crop.z, w = crop.img.width * s, h = crop.img.height * s; return [CW / 2 + crop.ox - w / 2, CW / 2 + crop.oy - h / 2, w, h]; }
  function drawCrop() {
    cg.fillStyle = "#141c33"; cg.fillRect(0, 0, CW, CW);
    cg.drawImage(crop.img, ...cropRect());
    cg.fillStyle = "rgba(10,12,24,.6)"; cg.beginPath(); cg.rect(0, 0, CW, CW); cg.ellipse(CW / 2, CW / 2, RX, RY, 0, 0, 7); cg.fill("evenodd");
    cg.setLineDash([14, 10]); cg.strokeStyle = "#f2c84b"; cg.lineWidth = 5; cg.beginPath(); cg.ellipse(CW / 2, CW / 2, RX, RY, 0, 0, 7); cg.stroke(); cg.setLineDash([]);
  }
  let cdrag = null;
  ccv.addEventListener("pointerdown", e => { cdrag = { x: e.clientX, y: e.clientY, ox: crop.ox, oy: crop.oy }; ccv.setPointerCapture(e.pointerId); });
  ccv.addEventListener("pointermove", e => {
    if (!cdrag) return; const k = CW / ccv.getBoundingClientRect().width;
    crop.ox = cdrag.ox + (e.clientX - cdrag.x) * k; crop.oy = cdrag.oy + (e.clientY - cdrag.y) * k; drawCrop();
  });
  ccv.addEventListener("pointerup", () => { cdrag = null; });
  ccv.addEventListener("wheel", e => { e.preventDefault(); crop.z = Math.max(1, Math.min(5, crop.z * (e.deltaY < 0 ? 1.08 : 0.93))); $("#zoom").value = crop.z; drawCrop(); }, { passive: false });
  $("#zoom").oninput = e => { crop.z = +e.target.value; drawCrop(); };
  $("#cropno").onclick = () => { $("#crop").hidden = true; };
  // recorte automático da cabeça: segmentação do MediaPipe (cabelo + pele do rosto) rodando no navegador
  const MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
  const MODEL = "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite";
  let segP = null;
  function segmenter() {
    if (!segP) segP = (async () => {
      const v = await import(`${MP}/vision_bundle.mjs`);
      const files = await v.FilesetResolver.forVisionTasks(`${MP}/wasm`);
      return v.ImageSegmenter.createFromOptions(files, { baseOptions: { modelAssetPath: MODEL, delegate: "CPU" },
        runningMode: "IMAGE", outputCategoryMask: true, outputConfidenceMasks: false });
    })();
    segP.catch(() => { segP = null; });
    return segP;
  }
  async function cutHead(src) {
    const seg = await segmenter(), res = seg.segment(src), mk = res.categoryMask;
    const W2 = mk.width, H2 = mk.height, cat = mk.getAsUint8Array().slice(); mk.close();
    // fica com cabelo (1), pele do rosto (3) e acessórios (5) ligados ao rosto: o resto do quadro sai
    const keep = new Uint8Array(W2 * H2), want = c => c === 1 || c === 3 || c === 5;
    let seed = -1, best = 1e9;
    for (let i = 0; i < cat.length; i++) if (cat[i] === 3) { const x = i % W2, y = (i / W2) | 0, d = Math.hypot(x - W2 / 2, y - H2 / 2); if (d < best) { best = d; seed = i; } }
    if (seed < 0) return null;
    const stack = [seed]; keep[seed] = 1;
    while (stack.length) { const i = stack.pop(), x = i % W2, y = (i / W2) | 0;
      for (const j of [x > 0 ? i - 1 : -1, x < W2 - 1 ? i + 1 : -1, y > 0 ? i - W2 : -1, y < H2 - 1 ? i + W2 : -1])
        if (j >= 0 && !keep[j] && want(cat[j])) { keep[j] = 1; stack.push(j); } }
    let x0 = W2, y0 = H2, x1 = 0, y1 = 0;
    for (let i = 0; i < keep.length; i++) if (keep[i]) { const x = i % W2, y = (i / W2) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    // máscara com borda suave, aplicada na foto
    const mc = document.createElement("canvas"); mc.width = W2; mc.height = H2; const mg = mc.getContext("2d"), id = mg.createImageData(W2, H2);
    for (let i = 0; i < keep.length; i++) id.data[i * 4 + 3] = keep[i] ? 255 : 0;
    mg.putImageData(id, 0, 0);
    const head = document.createElement("canvas"); head.width = W2; head.height = H2; const hg2 = head.getContext("2d");
    hg2.filter = "blur(1.2px)"; hg2.drawImage(mc, 0, 0); hg2.filter = "none";
    hg2.globalCompositeOperation = "source-in"; hg2.drawImage(src, 0, 0);
    // adesivo: contorno branco de papel em volta da cabeça
    const B = 9, cw = x1 - x0 + 1 + 2 * B, ch = y1 - y0 + 1 + 2 * B, st2 = document.createElement("canvas"); st2.width = cw; st2.height = ch;
    const sg = st2.getContext("2d"), sil = document.createElement("canvas"); sil.width = cw; sil.height = ch;
    const sl = sil.getContext("2d"); sl.drawImage(head, x0 - B, y0 - B, cw, ch, 0, 0, cw, ch); sl.globalCompositeOperation = "source-in"; sl.fillStyle = css(PAPER); sl.fillRect(0, 0, cw, ch);
    for (let a = 0; a < 24; a++) sg.drawImage(sil, Math.cos(a * Math.PI / 12) * B * 0.8, Math.sin(a * Math.PI / 12) * B * 0.8);
    sg.drawImage(head, x0 - B, y0 - B, cw, ch, 0, 0, cw, ch);
    return st2;
  }
  $("#cropok").onclick = async () => {
    const target = crop.target, [x, y, w, h] = cropRect();
    if ($("#so-cabeca").checked) {
      // área maior que o oval (pega o cabelo todo), recortada depois pela segmentação
      const AW = 512, sx = CW / 2 - RX * 1.35, sy = CW / 2 - RY * 1.3, k = AW / (2 * RX * 1.35), AH = Math.round(2 * RY * 1.3 * k);
      const area = document.createElement("canvas"); area.width = AW; area.height = AH;
      area.getContext("2d").drawImage(crop.img, (x - sx) * k, (y - sy) * k, w * k, h * k);
      $("#crop-status").textContent = TX.cutting; $("#cropok").disabled = true;
      try {
        const cut = await cutHead(area);
        if (cut) { target.photo = cut; target.photoCut = true; $("#crop-status").textContent = ""; $("#cropok").disabled = false; $("#crop").hidden = true; st.touched = true; draw(); return; }
      } catch (e) { console.warn("recorte", e); }
      $("#crop-status").textContent = TX.cutFail; $("#cropok").disabled = false;
    }
    const OW = 256, OH = Math.round(OW * RY / RX), k = OW / (2 * RX), out = document.createElement("canvas");
    out.width = OW; out.height = OH; const og = out.getContext("2d");
    og.beginPath(); og.ellipse(OW / 2, OH / 2, OW / 2, OH / 2, 0, 0, 7); og.clip();
    og.drawImage(crop.img, (x - (CW / 2 - RX)) * k, (y - (CW / 2 - RY)) * k, w * k, h * k);
    target.photo = out; target.photoCut = false;
    if (!$("#crop-status").textContent) $("#crop").hidden = true;
    else setTimeout(() => { $("#crop").hidden = true; $("#crop-status").textContent = ""; }, 1800);
    st.touched = true; draw();
  };
  $("#m-img").textContent = TX.modeImg; $("#m-vid").textContent = TX.modeVid; $("#compartilhar").textContent = TX.shareImg; $("#baixar").textContent = TX.dlImg;
  $("#v-compartilhar").textContent = TX.shareVid; $("#v-baixar").textContent = TX.dlVid; $("#gravando-txt").textContent = TX.recording;
  $("#crop-title").textContent = TX.cropTitle; $("#cropok").textContent = TX.use; $("#cropno").textContent = TX.cancel;
  $("#crop-priv").textContent = TX.privacy; $("#so-cabeca-txt").textContent = TX.onlyHead; $("#zoom").setAttribute("aria-label", TX.zoom);

  // ---------- animação ao vivo e vídeo ----------
  function tick(now) {
    if (!anim.on) return;
    anim.t = ((now - anim.t0) / 1000) % 6; draw(); anim.raf = requestAnimationFrame(tick);
  }
  function setAnim(on) {
    anim.on = on;
    cancelAnimationFrame(anim.raf);
    if (on) { anim.t0 = performance.now() - anim.t * 1000; anim.raf = requestAnimationFrame(tick); } else { anim.t = 0; draw(); }
  }
  function videoMime() {
    if (!window.MediaRecorder) return null;
    for (const m of ["video/mp4;codecs=avc1.42E01E", "video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"])
      if (MediaRecorder.isTypeSupported(m)) return m;
    return null;
  }
  async function recordVideo() {
    const mime = videoMime(); if (!mime || !canvas.captureStream) { alertBox(TX.noVideo); return null; }
    const was = anim.on; anim.on = false; cancelAnimationFrame(anim.raf);
    const sel = st.sel; st.sel = null; tool.hidden = true; hint.hidden = true;
    const stream = canvas.captureStream(30), rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 6e6 }), parts = [];
    rec.ondataavailable = e => e.data.size && parts.push(e.data);
    const done = new Promise(r => (rec.onstop = r));
    $("#gravando").hidden = false; rec.start(250);
    const LOOP = 6, END = 6, t0 = performance.now();
    await new Promise(res => {
      const step = now => {
        const t = (now - t0) / 1000;
        $("#gravando-bar").style.width = `${Math.min(100, (t / END) * 100)}%`;
        draw(false, Math.min(t, LOOP - 1e-3));
        if (t < END) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    rec.stop(); await done; stream.getTracks().forEach(tr => tr.stop());
    $("#gravando").hidden = true; st.sel = sel; setAnim(was); if (!was) draw();
    const ext = mime.includes("mp4") ? "mp4" : "webm", blob = new Blob(parts, { type: mime.split(";")[0] });
    return new File([blob], `${TX.file}.${ext}`, { type: blob.type });
  }
  let busy = false;
  function saveFile(file) { const a = document.createElement("a"); a.download = file.name; a.href = URL.createObjectURL(file); a.click(); }
  $("#v-baixar").onclick = async () => { if (busy) return; busy = true; const f = await recordVideo(); busy = false; if (f) { saveFile(f); alertBox(TX.videoTip); } };
  $("#v-compartilhar").onclick = async () => {
    if (busy) return; busy = true; const f = await recordVideo(); busy = false; if (!f) return;
    if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], text: TX.share }).then(() => alertBox(TX.videoTip)).catch(() => {});
    else { saveFile(f); alertBox(TX.videoTip); }
  };
  function setMode(vid) {
    $("#m-img").setAttribute("aria-pressed", String(!vid)); $("#m-vid").setAttribute("aria-pressed", String(vid));
    $("#acoes-img").hidden = vid; $("#acoes-vid").hidden = !vid; setAnim(vid); placeUi(); if (vid) alertBox(TX.vidHint);
  }
  $("#m-img").onclick = () => setMode(false);
  $("#m-vid").onclick = () => setMode(true);
  function alertBox(msg) { const b = $("#aviso"); b.textContent = msg; b.hidden = false; clearTimeout(b._t); b._t = setTimeout(() => (b.hidden = true), 5000); }

  async function png() { const sel = st.sel; st.sel = null; draw(false); const blob = await new Promise(r => canvas.toBlob(r, "image/png")); st.sel = sel; draw(); return blob; }
  $("#baixar").onclick = async () => { const a = document.createElement("a"); a.download = TX.file + ".png"; a.href = URL.createObjectURL(await png()); a.click(); };
  $("#compartilhar").onclick = async () => {
    const file = new File([await png()], "banda-de-papel.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) navigator.share({ files: [file], text: TX.share }).catch(() => {});
    else $("#baixar").click();
  };
  $("#hint").innerHTML = TX.hint;
  $("#add small").textContent = TX.person; $("#addtext small").textContent = TX.text;
  $("#arranjo small").textContent = TX.arrange; $("#dado small").textContent = TX.shuffle; $("#cena small").textContent = TX.scenes[st.scene];
  $("#texto").placeholder = TX.textPh;
  function fitStage() {
    // altura livre = página menos título, barra de cima e área de baixo; o palco fica no maior tamanho que couber
    const app = $(".app"), wrap = $(".stage-wrap"), cs = getComputedStyle(app), gap = parseFloat(cs.rowGap) || 8;
    const others = [...app.children].filter(el => el !== wrap && !el.hidden && getComputedStyle(el).display !== "none" && getComputedStyle(el).position !== "fixed" && getComputedStyle(el).position !== "absolute");
    const H = app.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - others.reduce((a, el) => a + el.offsetHeight, 0) - gap * others.length;
    const W = app.clientWidth - 16, h = Math.max(200, Math.min(H, W * 1320 / 1080));
    wrap.style.height = `${h}px`; stage.style.height = `${h}px`; stage.style.width = `${h * 1080 / 1320}px`;
  }
  window.addEventListener("resize", () => { fitStage(); draw(); });
  fitStage();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => draw());
  draw();
})();
