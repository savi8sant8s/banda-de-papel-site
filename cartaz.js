(() => {
  const W = 1080, H = 1920;
  const cv = document.getElementById('cartaz');
  const ctx = cv.getContext('2d');
  const $nome = document.getElementById('nome');
  let estilo = 'lambe';
  const ANO = new Date().getFullYear();
  // temas: título do cartaz, pergunta do topo da página e exemplo de lista
  const TEMAS = {
    favoritas: { botao: 'Minhas favoritas', titulo: 'MINHAS FAVORITAS', pergunta: 'As bandas que você levaria pra uma ilha deserta.' },
    descobri: { botao: `Descobri em ${ANO}`, titulo: `DESCOBRI EM ${ANO}`, pergunta: 'As bandas que você conheceu esse ano.' },
    ano: { botao: `Meu ${ANO}`, titulo: `MEU ${ANO} EM BANDAS`, pergunta: `O que mais tocou no seu ${ANO}.` },
    adolescencia: { botao: 'Trilha dos 15 anos', titulo: 'TRILHA DOS MEUS 15 ANOS', pergunta: 'O que tocava no seu fone aos 15.' },
    onibus: { botao: 'Pra chorar no ônibus', titulo: 'PRA CHORAR NO ÔNIBUS', pergunta: 'As que doem bonito com a cabeça na janela.' },
    quarto: { botao: 'Festival do quarto', titulo: 'FESTIVAL DO QUARTO', longo: 'O FESTIVAL DO QUARTO', prep: 'de', pergunta: 'Quem tocaria no seu quarto?' },
    shows: { botao: 'Shows que quero ver', titulo: 'SHOWS QUE EU QUERO VER', pergunta: 'Quem você precisa ver ao vivo um dia.' },
  };
  let tema = new URLSearchParams(location.search).get('tema');
  if (!TEMAS[tema]) tema = 'favoritas';
  let semente = 1;

  const PAPEIS = ['#f3ecdc', '#e9dfc8', '#ffffff', '#1c1a22', '#e8704a', '#f2c84b', '#4a9cc9', '#d9c7a3', '#c9463d'];
  const FONTES_LETRA = ['Anton', 'Rubik Mono One', 'Special Elite', 'Abril Fatface', 'Bebas Neue', 'Permanent Marker'];
  const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const hoje = new Date();
  const dataCurta = `${String(hoje.getDate()).padStart(2, '0')} ${MESES[hoje.getMonth()]} ${hoje.getFullYear()}`;
  const RODAPE = 'faça o seu: bandadepapel.cloud/cartaz';

  // números aleatórios repetíveis: o mesmo texto gera o mesmo cartaz
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

  // textura de papel: um ladrilho de ruído reaproveitado
  const ruido = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d'); const img = x.createImageData(256, 256); const r = rng(7);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = r() < .5 ? 0 : 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = r() * 22;
    }
    x.putImageData(img, 0, 0);
    x.globalAlpha = .07; x.strokeStyle = '#5a4a30'; x.lineWidth = 1;
    for (let i = 0; i < 40; i++) { const a = r() * 256, b = r() * 256; x.beginPath(); x.moveTo(a, b); x.lineTo(a + (r() - .5) * 30, b + (r() - .5) * 30); x.stroke(); }
    return ctx.createPattern(c, 'repeat');
  })();
  function textura(alpha = 1) { ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = ruido; ctx.fill(); ctx.restore(); }

  // pedaço de papel recortado à mão, centrado na origem atual
  function recorte(r, w, h, cor, sombra = 10) {
    const j = Math.min(w, h) * .05, pts = [];
    const lado = (x0, y0, x1, y1) => { for (let i = 0; i < 3; i++) { const t = i / 3; pts.push([x0 + (x1 - x0) * t + (r() - .5) * j, y0 + (y1 - y0) * t + (r() - .5) * j]); } };
    lado(-w / 2, -h / 2, w / 2, -h / 2); lado(w / 2, -h / 2, w / 2, h / 2); lado(w / 2, h / 2, -w / 2, h / 2); lado(-w / 2, h / 2, -w / 2, -h / 2);
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = sombra; ctx.shadowOffsetY = sombra * .5;
    ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath();
    ctx.fillStyle = cor; ctx.fill();
    ctx.shadowColor = 'transparent'; textura(cor === '#1c1a22' ? .5 : 1);
    ctx.restore();
  }

  function fita(r, x, y, w, ang, cor = 'rgba(236,224,186,.82)') {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    const h = 54; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2);
    for (let i = 0; i <= 6; i++) ctx.lineTo(-w / 2 + (r() - .5) * 8, -h / 2 + h * i / 6);
    ctx.lineTo(w / 2, h / 2);
    for (let i = 6; i >= 0; i--) ctx.lineTo(w / 2 + (r() - .5) * 8, -h / 2 + h * i / 6);
    ctx.closePath(); ctx.fillStyle = cor; ctx.fill(); textura(.6); ctx.restore();
  }

  function fonte(tam, familia) { ctx.font = `${tam}px "${familia}"`; }
  function caber(txt, familia, max, larg) { let t = max; fonte(t, familia); while (t > 20 && ctx.measureText(txt).width > larg) { t -= 2; fonte(t, familia); } return t; }
  function centroV(txt) { const m = ctx.measureText(txt); return (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2; }
  function texto(txt, x, y, cor) { ctx.fillStyle = cor; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(txt, x, y + centroV(txt)); }
  function contraste(cor) { return ['#1c1a22', '#c9463d', '#4a9cc9', '#e8704a'].includes(cor) ? '#f3ecdc' : '#1c1a22'; }
  function quebrar(palavras, larg, medir) {
    const linhas = []; let atual = [];
    for (const p of palavras) { const t = [...atual, p]; if (atual.length && medir(t) > larg) { linhas.push(atual); atual = [p]; } else atual = t; }
    if (atual.length) linhas.push(atual); return linhas;
  }
  function parede(cor) { ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.fillStyle = cor; ctx.fill(); textura(.8); }
  function rodape(cor) { ctx.save(); fonte(34, 'Jost'); ctx.font = '600 34px Jost'; texto(RODAPE, W / 2, 1690, cor); ctx.font = '700 40px Jost'; texto('@abandadepapel', W / 2, 1745, cor); ctx.restore(); }

  // 1. Lambe-lambe: letras recortadas de revista
  function lambe(r, nome, bandas) {
    parede('#2a2f45');
    ctx.save(); ctx.translate(W / 2, 900); ctx.rotate((r() - .5) * .03); recorte(r, 960, 1440, '#efe6d2', 24); ctx.restore();
    fita(r, 150, 200, 180, -.6); fita(r, 930, 200, 180, .6); fita(r, 150, 1600, 180, .6); fita(r, 930, 1600, 180, -.6);
    ctx.save(); ctx.font = '40px "Special Elite"'; const T = TEMAS[tema], quarto = T.prep === 'de';
    const cab = (T.longo || T.titulo) + (nome && quarto ? ' DE ' + nome.toUpperCase() : '');
    fonte(caber(cab, 'Special Elite', 40, 860), 'Special Elite'); texto(cab, W / 2, 290, '#1c1a22');
    const sub = (nome && !quarto ? 'POR ' + nome.toUpperCase() + ' · ' : '') + dataCurta + ' · ENTRADA FRANCA';
    fonte(caber(sub, 'Special Elite', 32, 860), 'Special Elite'); texto(sub, W / 2, 340, '#4a4552'); ctx.restore();

    const palavras = bandas[0].toUpperCase().split(/\s+/);
    const maiorPalavra = Math.max(...palavras.map(p => p.length));
    let cel = Math.min(150, 820 / maiorPalavra);
    let linhas = quebrar(palavras, 840, ps => ps.join(' ').length * cel);
    while (linhas.length * cel * 1.15 > 560) { cel *= .9; linhas = quebrar(palavras, 840, ps => ps.join(' ').length * cel); }
    let y = 420 + cel * .6;
    for (const ln of linhas) {
      const chars = [...ln.join(' ')]; let x = W / 2 - chars.length * cel / 2 + cel / 2;
      for (const c of chars) {
        if (c !== ' ') {
          const cor = PAPEIS[Math.floor(r() * PAPEIS.length)], fam = FONTES_LETRA[Math.floor(r() * FONTES_LETRA.length)];
          ctx.save(); ctx.translate(x + (r() - .5) * cel * .1, y + (r() - .5) * cel * .15); ctx.rotate((r() - .5) * .3);
          recorte(r, cel * (.86 + r() * .14), cel * (1 + r() * .15), cor, 6);
          const t = caber(c, fam, cel * .82, cel * .72); fonte(t, fam); texto(c, 0, 0, contraste(cor));
          ctx.restore();
        }
        x += cel;
      }
      y += cel * 1.15;
    }
    const resto = bandas.slice(1); if (!resto.length) return rodapeLambe();
    const topo = y + 10, fundo = 1530, passo = Math.min(118, (fundo - topo) / resto.length);
    resto.forEach((b, i) => {
      const escuro = i % 2 === 0, cor = escuro ? '#1c1a22' : '#f3ecdc', tam = caber(b.toUpperCase(), 'Special Elite', Math.min(64, passo * .55), 760);
      fonte(tam, 'Special Elite'); const w = ctx.measureText(b.toUpperCase()).width + 70;
      ctx.save(); ctx.translate(W / 2 + (r() - .5) * 60, topo + passo * (i + .5)); ctx.rotate((r() - .5) * .06);
      recorte(r, w, tam * 1.5, cor, 5); fonte(tam, 'Special Elite'); texto(b.toUpperCase(), 0, 0, contraste(cor)); ctx.restore();
    });
    rodapeLambe();
    function rodapeLambe() { rodape('#f3ecdc'); }
  }

  // 2. Line-up: cartaz de festival com morros de papel
  function lineup(r, nome, bandas) {
    const paletas = [['#f2c84b', '#e8704a', '#c95a37', '#7a3b2e', '#3b2430'], ['#4a9cc9', '#2f6f99', '#1d4a6b', '#163650', '#0f2236'], ['#e9a6a0', '#c9463d', '#8b2f3c', '#562335', '#2d1a2a']];
    const p = paletas[Math.floor(r() * paletas.length)];
    parede(p[0]);
    const sx = 260 + r() * 560;
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(sx, 1330, 170, 0, Math.PI * 2); ctx.fillStyle = '#f3ecdc'; ctx.fill(); ctx.shadowColor = 'transparent'; textura(); ctx.restore();
    [1240, 1380, 1520].forEach((base, i) => {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = -6;
      ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, base);
      const f = r() * 6, a = 50 + r() * 50;
      for (let x = 0; x <= W; x += 30) ctx.lineTo(x, base - Math.sin(x / 180 + f) * a - (r() - .5) * 6);
      ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = p[i + 1]; ctx.fill(); ctx.shadowColor = 'transparent'; textura(); ctx.restore();
    });
    const tinta = p === paletas[0] ? '#1c1a22' : '#f3ecdc';
    ctx.save();
    const T = TEMAS[tema], prep = (T.prep || 'por') + ' ';
    fonte(caber(T.titulo, 'Anton', 110, 960), 'Anton'); texto(T.titulo, W / 2, 300, tinta);
    if (nome) { const t = caber(prep + nome, 'Permanent Marker', 72, 800); fonte(t, 'Permanent Marker'); texto(prep + nome, W / 2, 400, tinta); }
    ctx.font = '600 38px Jost'; texto(dataCurta + '  ·  ENTRADA FRANCA', W / 2, nome ? 475 : 400, tinta);
    let y = nome ? 560 : 500;
    const cartaz = (txt, fam, max, alt) => { const t = caber(txt, fam, max, 920); fonte(t, fam); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowOffsetY = 6; texto(txt, W / 2, y + t * .5, tinta); ctx.restore(); y += t * alt; };
    cartaz(bandas[0].toUpperCase(), 'Anton', 230, 1.15);
    bandas.slice(1, 3).forEach(b => cartaz(b.toUpperCase(), 'Anton', 110, 1.15));
    const resto = bandas.slice(3);
    if (resto.length) {
      fonte(66, 'Bebas Neue');
      const linhas = quebrar(resto.map(b => b.toUpperCase()), 920, ps => ctx.measureText(ps.join('  •  ')).width);
      linhas.forEach(ln => { y += 6; fonte(66, 'Bebas Neue'); const t = caber(ln.join('  •  '), 'Bebas Neue', 66, 920); fonte(t, 'Bebas Neue'); texto(ln.join('  •  '), W / 2, y + t * .5, tinta); y += t * 1.1; });
    }
    ctx.restore();
    rodape('#f3ecdc');
  }

  // 3. Setlist: folha colada no chão do palco
  function setlist(r, nome, bandas) {
    parede('#1b1a1f');
    for (let i = 0; i < 6; i++) fita(r, r() * W, r() * H, 300 + r() * 300, (r() - .5) * 3, i % 2 ? 'rgba(60,60,66,.9)' : 'rgba(150,150,156,.5)');
    ctx.save(); ctx.translate(W / 2, 880); ctx.rotate(-.03 + (r() - .5) * .02);
    recorte(r, 860, 1300, '#fbfaf5', 28);
    ctx.save(); ctx.beginPath(); ctx.arc(250 + r() * 60, 460 + r() * 60, 110, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(140,95,50,.18)'; ctx.lineWidth = 14; ctx.stroke(); ctx.restore();
    ctx.font = '120px "Permanent Marker"'; texto('SETLIST', 0, -520, '#1c1a22');
    const T = TEMAS[tema], quarto = T.prep === 'de';
    const sub = (quarto ? (nome ? 'quarto de ' + nome : 'quarto') : T.titulo.toLowerCase() + (nome ? ' · ' + nome : '')) + ' · ' + dataCurta.toLowerCase();
    fonte(caber(sub, 'Permanent Marker', 42, 780), 'Permanent Marker'); texto(sub, 0, -430, '#4a4552');
    const topo = -340, fundo = 560, passo = Math.min(120, (fundo - topo) / bandas.length);
    bandas.forEach((b, i) => {
      const txt = `${i + 1}. ${b}`, t = caber(txt, 'Permanent Marker', Math.min(84, passo * .7), 720);
      fonte(t, 'Permanent Marker'); ctx.textAlign = 'left'; ctx.fillStyle = i === 0 ? '#c9463d' : '#1c1a22';
      const yy = topo + passo * (i + .5);
      ctx.save(); ctx.translate(-360, yy); ctx.rotate((r() - .5) * .03); ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 0);
      if (i === 0) { const w = ctx.measureText(txt).width; ctx.strokeStyle = '#c9463d'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, t * .45); ctx.quadraticCurveTo(w / 2, t * .6, w, t * .4); ctx.stroke(); }
      ctx.restore();
    });
    ctx.restore();
    fita(r, 250, 250, 220, -.5, 'rgba(40,40,46,.95)'); fita(r, 830, 250, 220, .5, 'rgba(40,40,46,.95)');
    fita(r, 830, 1510, 220, -.4, 'rgba(40,40,46,.95)');
    rodape('#f3ecdc');
  }

  function arred(x, y, w, h, rr) { ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }
  function cabecalho(nome) { const T = TEMAS[tema]; return { titulo: T.titulo, quem: nome ? (T.prep || 'por') + ' ' + nome : '' }; }
  function esq(txt, x, y, cor) { ctx.fillStyle = cor; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y); }
  function coracao(x, y, s, cor) { ctx.save(); ctx.translate(x, y); ctx.scale(s / 30, s / 30); ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-30, -10, -12, -32, 0, -14); ctx.bezierCurveTo(12, -32, 30, -10, 0, 10); ctx.fillStyle = cor; ctx.fill(); ctx.restore(); }

  // 4. Ingresso: bilhete com canhoto picotado
  function ingresso(r, nome, bandas) {
    const fundo = '#2b2233'; parede(fundo);
    const cores = ['#f2c84b', '#e9a6a0', '#4a9cc9', '#efe6d2', '#e8704a'];
    const cor = cores[Math.floor(r() * cores.length)], tinta = contraste(cor);
    const { titulo, quem } = cabecalho(nome);
    const w = 860, h = 1380, corte = 400;
    ctx.save(); ctx.translate(W / 2, 860); ctx.rotate((r() - .5) * .05);
    recorte(r, w, h, cor, 26);
    ctx.fillStyle = fundo; [-1, 1].forEach(s => { ctx.beginPath(); ctx.arc(s * w / 2, corte, 38, 0, Math.PI * 2); ctx.fill(); });
    ctx.save(); ctx.setLineDash([18, 14]); ctx.strokeStyle = tinta; ctx.globalAlpha = .6; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-w / 2 + 60, corte); ctx.lineTo(w / 2 - 60, corte); ctx.stroke(); ctx.restore();
    ctx.strokeStyle = tinta; ctx.lineWidth = 4; ctx.strokeRect(-w / 2 + 40, -h / 2 + 40, w - 80, corte + h / 2 - 80);
    ctx.font = '600 32px Jost'; texto('INGRESSO  ·  PISTA  ·  ENTRADA FRANCA', 0, -h / 2 + 100, tinta);
    fonte(caber(titulo, 'Anton', 96, w - 140), 'Anton'); texto(titulo, 0, -h / 2 + 200, tinta);
    let y = -h / 2 + 280;
    if (quem) { fonte(caber(quem, 'Permanent Marker', 56, w - 160), 'Permanent Marker'); texto(quem, 0, y, tinta); y += 70; }
    y += 20;
    const t0 = caber(bandas[0].toUpperCase(), 'Anton', 170, w - 140); fonte(t0, 'Anton'); texto(bandas[0].toUpperCase(), 0, y + t0 * .5, tinta); y += t0 * 1.1 + 10;
    const resto = bandas.slice(1), passo = resto.length ? Math.min(80, (corte - 60 - y) / resto.length) : 0;
    resto.forEach((b, i) => { const t = caber(b.toUpperCase(), 'Bebas Neue', passo * .85, w - 160); fonte(t, 'Bebas Neue'); texto(b.toUpperCase(), 0, y + passo * (i + .5), tinta); });
    const num = String(hash(tema + nome + bandas.join()) % 1000000).padStart(6, '0');
    ctx.font = '600 34px Jost'; esq('Nº ' + num, -w / 2 + 60, corte + 90, tinta); esq(dataCurta, -w / 2 + 60, corte + 145, tinta); esq('SETOR: PAPEL', -w / 2 + 60, corte + 200, tinta);
    ctx.fillStyle = tinta; let x = 40; while (x < w / 2 - 60) { const lw = 3 + Math.floor(r() * 4) * 3; ctx.fillRect(x, corte + 60, lw, 170); x += lw + 4 + Math.floor(r() * 3) * 3; }
    ctx.restore();
    rodape('#f3ecdc');
  }

  // 5. Fita K7: a fita gravada e o encarte com lado A e lado B
  function k7(r, nome, bandas) {
    const fundos = ['#e8704a', '#4a9cc9', '#2a2f45', '#c9463d', '#3d6b4f'];
    parede(fundos[Math.floor(r() * fundos.length)]);
    const { titulo, quem } = cabecalho(nome), caneta = '#1f2a6b';
    const cw = 900, ch = 560;
    ctx.save(); ctx.translate(W / 2, 420); ctx.rotate((r() - .5) * .07);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14; arred(-cw / 2, -ch / 2, cw, ch, 34); ctx.fillStyle = '#1c1a22'; ctx.fill(); ctx.restore();
    ctx.fillStyle = '#55525c'; [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a * (cw / 2 - 36), b * (ch / 2 - 36), 12, 0, 7); ctx.fill(); });
    const lc = ['#f3ecdc', '#f2c84b', '#e9a6a0', '#ffffff'][Math.floor(r() * 4)];
    arred(-cw / 2 + 64, -ch / 2 + 56, cw - 128, 370, 16); ctx.fillStyle = lc; ctx.fill(); textura();
    ctx.fillStyle = '#c9463d'; ctx.fillRect(-cw / 2 + 64, -ch / 2 + 116, cw - 128, 12);
    ctx.font = '700 40px Jost'; esq('A', -cw / 2 + 96, -ch / 2 + 88, '#1c1a22');
    ctx.font = '600 28px Jost'; ctx.textAlign = 'right'; ctx.fillText('C-60', cw / 2 - 96, -ch / 2 + 88);
    const tt = titulo.toLowerCase(); fonte(caber(tt, 'Caveat', 84, cw - 200), 'Caveat'); texto(tt, 0, -ch / 2 + 180, caneta);
    if (quem) { fonte(caber(quem, 'Caveat', 50, cw - 240), 'Caveat'); texto(quem, 0, -ch / 2 + 240, caneta); }
    arred(-270, -10, 540, 130, 60); ctx.fillStyle = '#3a3640'; ctx.fill();
    [[-165, 58], [165, 34]].forEach(([x, rolo]) => {
      ctx.beginPath(); ctx.arc(x, 55, rolo, 0, 7); ctx.fillStyle = '#5b3b2b'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, 55, 26, 0, 7); ctx.fillStyle = '#f3ecdc'; ctx.fill();
      ctx.fillStyle = '#3a3640'; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + r(); ctx.beginPath(); ctx.arc(x + Math.cos(a) * 17, 55 + Math.sin(a) * 17, 5, 0, 7); ctx.fill(); }
    });
    ctx.beginPath(); ctx.moveTo(-280, ch / 2); ctx.lineTo(-230, ch / 2 - 110); ctx.lineTo(230, ch / 2 - 110); ctx.lineTo(280, ch / 2); ctx.closePath(); ctx.fillStyle = '#2b2830'; ctx.fill();
    ctx.fillStyle = '#111'; [-120, 120].forEach(x => { ctx.beginPath(); ctx.arc(x, ch / 2 - 50, 16, 0, 7); ctx.fill(); });
    ctx.restore();
    // encarte
    const eh = 860;
    ctx.save(); ctx.translate(W / 2, 1170); ctx.rotate((r() - .5) * .04);
    recorte(r, 900, eh, '#f6f1e4', 20);
    const passo = Math.min(92, (eh - 100) / bandas.length);
    bandas.forEach((b, i) => {
      const y = -eh / 2 + 50 + passo * (i + .5);
      ctx.strokeStyle = 'rgba(80,110,170,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-390, y + passo * .38); ctx.lineTo(390, y + passo * .38); ctx.stroke();
      const txt = `${i + 1}. ${b}`; fonte(caber(txt, 'Caveat', Math.min(80, passo * .8), 740), 'Caveat'); esq(txt, -380, y, i === 0 ? '#c9463d' : caneta);
    });
    ctx.restore();
    rodape('#f3ecdc');
  }

  // 6. Caderno: página de fichário escrita de caneta
  function caderno(r, nome, bandas) {
    parede('#f7f3e6');
    const azul = '#24378a', vermelho = '#c9463d';
    ctx.strokeStyle = 'rgba(80,130,200,.35)'; ctx.lineWidth = 3;
    for (let y = 256; y < H - 60; y += 68) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(210,70,70,.55)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(170, 0); ctx.lineTo(170, H); ctx.stroke();
    for (let y = 80; y < H; y += 96) {
      ctx.beginPath(); ctx.arc(80, y, 18, 0, 7); ctx.fillStyle = '#2a2f45'; ctx.fill();
      ctx.beginPath(); ctx.arc(46, y, 36, -Math.PI / 2 - .3, Math.PI / 2 - .9, true); ctx.strokeStyle = '#a3a3ad'; ctx.lineWidth = 9; ctx.stroke();
    }
    const { titulo } = cabecalho(nome);
    ctx.font = '48px Caveat'; esq('Nome: ' + (nome || '________'), 200, 160, azul);
    ctx.textAlign = 'right'; ctx.fillText(dataCurta.toLowerCase(), W - 60, 160);
    const tt = titulo.charAt(0) + titulo.slice(1).toLowerCase();
    ctx.font = `700 ${caber(tt, 'Caveat', 112, 820)}px Caveat`; esq(tt, 200, 330, azul);
    const wt = ctx.measureText(tt).width;
    ctx.strokeStyle = vermelho; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(200, 378); ctx.quadraticCurveTo(200 + wt / 2, 392 + r() * 10, 200 + wt, 372); ctx.stroke();
    const n = bandas.length, passo = Math.max(1, Math.min(2, Math.floor(1180 / n / 68))) * 68;
    bandas.forEach((b, i) => {
      const y = 460 + 68 + i * passo - 22, x = 230 + (r() - .5) * 16, tam = caber(b, 'Caveat', Math.min(96, passo * .72), 720);
      ctx.font = `${i === 0 ? 700 : 400} ${tam}px Caveat`; esq(b, x, y, i === 0 ? vermelho : azul);
      const w = ctx.measureText(b).width;
      if (i === 0) {
        ctx.save(); ctx.strokeStyle = vermelho; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x + w / 2, y, w / 2 + 34, tam * .62, -.03, .2, Math.PI * 2.05); ctx.stroke(); ctx.restore();
        coracao(Math.min(x + w + 80, W - 50), y - 10, 44, vermelho);
      } else { ctx.font = `${tam * .8}px Caveat`; esq('·', x - 34, y, azul); }
    });
    rodape(azul);
  }

  // 7. Xerox: fanzine fotocopiado em preto e branco
  function xerox(r, nome, bandas) {
    parede('#e9e7e1');
    const preto = '#141414', claro = '#ecebe6';
    for (let gy = 470; gy < 1000; gy += 26) for (let gx = 0; gx < W; gx += 26) {
      const d = Math.hypot(gx - W, gy - 470) / 1100, rr = 12 * (1 - d); if (rr > .8) { ctx.beginPath(); ctx.arc(gx + (gy / 26 % 2) * 13, gy, rr, 0, 7); ctx.fillStyle = preto; ctx.fill(); }
    }
    ctx.fillStyle = 'rgba(0,0,0,.55)'; for (let i = 0; i < 900; i++) ctx.fillRect(r() * W, r() * H, 1 + r() * 3, 1 + r() * 3);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(0, 0, 26, H); ctx.fillRect(W - 18, 0, 18, H);
    const { titulo, quem } = cabecalho(nome);
    ctx.save(); ctx.translate(W / 2, 250); ctx.rotate(-.04); recorte(r, 1000, 210, preto, 8);
    fonte(caber(titulo, 'Rubik Mono One', 84, 900), 'Rubik Mono One'); texto(titulo, 0, 0, claro); ctx.restore();
    ctx.save(); ctx.translate(W / 2 + 80, 410); ctx.rotate(.03);
    const sub = (quem ? quem + ' · ' : '') + dataCurta.toLowerCase(); fonte(caber(sub, 'Special Elite', 52, 760), 'Special Elite'); texto(sub, 0, 0, preto); ctx.restore();
    const cab = bandas[0].toUpperCase(), t0 = caber(cab, 'Anton', 220, 860);
    ctx.save(); ctx.translate(W / 2, 700); ctx.rotate((r() - .5) * .06); fonte(t0, 'Anton'); recorte(r, ctx.measureText(cab).width + 90, t0 * 1.25, claro, 14);
    fonte(t0, 'Anton'); texto(cab, 0, 0, preto); ctx.restore();
    const resto = bandas.slice(1), topo = 700 + t0 * .75 + 40, fundo = 1580, passo = resto.length ? Math.min(120, (fundo - topo) / resto.length) : 0;
    resto.forEach((b, i) => {
      const txt = b.toUpperCase(), escuro = i % 2 === 0, tam = caber(txt, 'Special Elite', Math.min(66, passo * .56), 720);
      fonte(tam, 'Special Elite'); const w = ctx.measureText(txt).width + 60, lado = i % 2 ? 1 : -1;
      ctx.save(); ctx.translate(W / 2 + lado * (90 + r() * 40) * (1 - w / 1000), topo + passo * (i + .5)); ctx.rotate((r() - .5) * .08);
      recorte(r, w, tam * 1.5, escuro ? preto : claro, 4); fonte(tam, 'Special Elite'); texto(txt, 0, 0, escuro ? claro : preto); ctx.restore();
    });
    rodape(preto);
  }

  const ESTILOS = { lambe, lineup, setlist, ingresso, k7, caderno, xerox };

  const EXEMPLO = ['The Strokes', 'Pitty', 'Supercombo', 'Arctic Monkeys', 'Os Mutantes', 'Fresno', 'Tim Maia'];
  const SUGESTOES = ['Legião Urbana', 'Charlie Brown Jr.', 'NX Zero', 'CPM 22', 'Fresno', 'Pitty', 'Los Hermanos', 'Skank', 'Engenheiros do Hawaii', 'Titãs', 'Paralamas do Sucesso', 'Raul Seixas', 'Cássia Eller', 'Tim Maia', 'Marisa Monte', 'Djavan', 'Belchior', 'Supercombo', 'Scalene', 'Fresno', 'Jão', 'Tim Bernardes', 'Linkin Park', 'My Chemical Romance', 'Paramore', 'Evanescence', 'Green Day', 'Blink-182', 'Arctic Monkeys', 'The Strokes', 'Red Hot Chili Peppers', 'Queen', 'Nirvana', 'Radiohead', 'Coldplay', 'Twenty One Pilots', 'Bruno Mars', 'Avril Lavigne', 'Guns N\' Roses', 'System of a Down'].filter((s, i, a) => a.indexOf(s) === i).sort(() => Math.random() - .5);
  const $nova = document.getElementById('nova'), $lista = document.getElementById('lista'), $sug = document.getElementById('sugestoes');
  const igual = (a, b) => a.toLocaleLowerCase('pt-BR') === b.toLocaleLowerCase('pt-BR');
  let bandas = (() => { try { const v = JSON.parse(localStorage.getItem('cartaz.bandas')); if (Array.isArray(v) && v.length) return v.filter(s => typeof s === 'string').slice(0, 9); } catch (e) {} return EXEMPLO.slice(); })();
  let vez = 0;
  function mudou() { try { localStorage.setItem('cartaz.bandas', JSON.stringify(bandas)); } catch (e) {} lista(); desenhar(); }
  function adicionar(txt) {
    txt.split(/[\n,;]+/).map(s => s.trim().slice(0, 40)).filter(Boolean).forEach(s => { if (bandas.length < 9 && !bandas.some(b => igual(b, s))) bandas.push(s); });
    mudou();
  }
  function lista() {
    $lista.innerHTML = '';
    bandas.forEach((b, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="pos"></span><span class="nome"></span><button type="button" aria-label="Subir">↑</button><button type="button" aria-label="Tirar">×</button>';
      li.querySelector('.pos').textContent = i ? i + 1 : '★';
      li.querySelector('.nome').textContent = b;
      const [sobe, tira] = li.querySelectorAll('button');
      sobe.disabled = !i;
      sobe.addEventListener('click', () => { [bandas[i - 1], bandas[i]] = [bandas[i], bandas[i - 1]]; mudou(); });
      tira.addEventListener('click', () => { bandas.splice(i, 1); mudou(); });
      $lista.appendChild(li);
    });
    const cheia = bandas.length >= 9;
    $nova.disabled = cheia; $nova.placeholder = cheia ? 'Lista cheia (9)' : bandas.length ? 'Mais uma banda' : 'Digite uma banda';
    $sug.innerHTML = '';
    if (cheia) return;
    const livres = SUGESTOES.filter(s => !bandas.some(b => igual(b, s)));
    for (let k = 0; k < Math.min(8, livres.length); k++) {
      const s = livres[(vez * 8 + k) % livres.length], bt = document.createElement('button');
      bt.type = 'button'; bt.textContent = '+ ' + s; bt.addEventListener('click', () => adicionar(s)); $sug.appendChild(bt);
    }
    const outras = document.createElement('button'); outras.type = 'button'; outras.className = 'outras'; outras.textContent = 'outras';
    outras.addEventListener('click', () => { vez++; lista(); }); $sug.appendChild(outras);
    if (bandas.length) { const limpa = document.createElement('button'); limpa.type = 'button'; limpa.className = 'outras'; limpa.textContent = 'limpar lista'; limpa.addEventListener('click', () => { bandas = []; mudou(); $nova.focus(); }); $sug.appendChild(limpa); }
  }
  document.getElementById('add').addEventListener('submit', e => { e.preventDefault(); adicionar($nova.value); $nova.value = ''; $nova.focus(); });
  $nova.addEventListener('paste', e => { const t = (e.clipboardData || window.clipboardData).getData('text'); if (/[\n,;]/.test(t)) { e.preventDefault(); adicionar(t); } });

  function ler() {
    const nome = $nome.value.trim().slice(0, 24);
    return { nome, bandas: bandas.length ? bandas : ['Sua banda favorita'] };
  }
  function desenhar() {
    const { nome, bandas } = ler();
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    ESTILOS[estilo](rng(hash(estilo + tema + nome + bandas.join('|')) + semente * 9973), nome, bandas);
  }

  let fila; const agendar = () => { clearTimeout(fila); fila = setTimeout(desenhar, 120); };
  $nome.addEventListener('input', agendar);
  document.querySelectorAll('[data-estilo]').forEach(b => b.addEventListener('click', () => {
    estilo = b.dataset.estilo;
    document.querySelectorAll('[data-estilo]').forEach(o => o.setAttribute('aria-pressed', o === b));
    desenhar();
  }));
  const $temas = document.getElementById('temas'), $pergunta = document.getElementById('pergunta');
  function marcarTema() {
    $temas.querySelectorAll('button').forEach(o => o.setAttribute('aria-pressed', o.dataset.tema === tema));
    $pergunta.textContent = TEMAS[tema].pergunta;
  }
  Object.entries(TEMAS).forEach(([k, t]) => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.tema = k; b.textContent = t.botao;
    b.addEventListener('click', () => {
      tema = k; marcarTema(); desenhar();
      try { history.replaceState(null, '', k === 'favoritas' ? location.pathname : '?tema=' + k); } catch (e) {}
    });
    $temas.appendChild(b);
  });
  marcarTema();
  document.getElementById('embaralhar').addEventListener('click', () => { semente++; desenhar(); });

  const arquivo = () => new Promise(ok => cv.toBlob(b => ok(new File([b], 'cartaz-de-papel.png', { type: 'image/png' })), 'image/png'));
  function baixar(f) { const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  document.getElementById('baixar').addEventListener('click', async () => baixar(await arquivo()));
  document.getElementById('compartilhar').addEventListener('click', async () => {
    const f = await arquivo();
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      try { await navigator.share({ files: [f] }); } catch (e) { if (e.name !== 'AbortError') baixar(f); }
    } else baixar(f);
  });

  const fontes = ['Caveat', 'Anton', 'Bebas Neue', 'Rubik Mono One', 'Special Elite', 'Permanent Marker', 'Abril Fatface', 'Jost'];
  lista();
  Promise.all(fontes.map(f => document.fonts.load(`40px "${f}"`))).then(desenhar, desenhar);
  document.fonts.ready.then(desenhar);
})();
