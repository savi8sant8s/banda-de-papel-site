// Recebe os pedidos e as avaliações do site (pedido.js), grava na planilha e avisa por e-mail.
// Também entrega as avaliações aprovadas pro site (avaliacoes.js).
// Cole este arquivo em Extensões → Apps Script da planilha. Passo a passo em planilha/README.md.

const ABA = "Pedidos";
const AVISAR = "contato@prancheta.cloud"; // deixe "" pra não receber e-mail
const COLUNAS = ["Data", "Status", "Idioma", "Nome", "E-mail", "Pacote", "Cenário", "Música", "Trecho", "Bumbo", "Prazo", "Observações"];
const CAMPOS = [null, null, "idioma", "nome", "email", "pacote", "cenario", "musica", "trecho", "bumbo", "prazo", "obs"];
const STATUS = ["Novo", "Aceito", "Pago", "Entregue", "Recusado"];

const ABA_AV = "Avaliações";
const COLUNAS_AV = ["Data", "Mostrar", "Nome", "E-mail", "Nota", "Comentário", "Pode mostrar", "Idioma", "Pacote"];

// Limites contra spam. Passou do limite, o envio é ignorado em silêncio.
const LIMITES = {
  pedido: { porHora: 15, porEmailDia: 3 },
  avaliacao: { porHora: 10, porEmailDia: 1 },
};
const NOTA_RECAPTCHA = 0.5; // reCAPTCHA v3: abaixo disso é tratado como robô
const CACHE_SITE = 300; // segundos que o site guarda as avaliações aprovadas

function doPost(e) {
  const p = e.parameter;
  if (p.site) return ok(); // honeypot: só robô preenche
  if (!humano(p.recaptcha)) return ok();
  const tipo = p.tipo === "avaliacao" ? "avaliacao" : "pedido";

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (!dentroDoLimite(tipo, limpa(p.email).toLowerCase())) return ok();
    if (tipo === "avaliacao") {
      if (!gravaAvaliacao(p)) return ok();
    } else {
      const linha = CAMPOS.map((c, i) => (i === 0 ? new Date() : i === 1 ? "Novo" : limpa(p[c])));
      abaPedidos().appendRow(linha);
    }
  } finally {
    lock.releaseLock();
  }

  if (AVISAR) tipo === "avaliacao" ? avisaAvaliacao(p) : avisaPedido(p);
  return ok();
}

// Avaliações aprovadas (Mostrar marcado e o cliente deixou mostrar), pro site.
function doGet() {
  const cache = CacheService.getScriptCache();
  let json = cache.get("aprovadas");
  if (!json) {
    const linhas = abaAvaliacoes().getDataRange().getValues().slice(1);
    const aprovadas = linhas
      .filter((l) => l[1] === true && l[6] === "Sim")
      .reverse()
      .map((l) => ({ nome: l[2], nota: l[4], comentario: l[5], idioma: l[7], pacote: l[8] }));
    json = JSON.stringify(aprovadas);
    cache.put("aprovadas", json, CACHE_SITE);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// Só avalia quem tem pedido Entregue com esse e-mail.
function gravaAvaliacao(p) {
  const email = limpa(p.email).toLowerCase();
  const pedido = abaPedidos().getDataRange().getValues().slice(1).reverse()
    .find((l) => l[1] === "Entregue" && String(l[4]).trim().toLowerCase() === email);
  if (!pedido) return false;

  const nota = Math.min(5, Math.max(1, parseInt(p.nota, 10) || 5));
  // appendRow não serve: as caixas de seleção contam como preenchidas e a linha iria pro fim da aba.
  const aba = abaAvaliacoes();
  const linha = aba.getRange("A:A").getValues().filter((l) => l[0] !== "").length + 1;
  aba.getRange(linha, 1, 1, COLUNAS_AV.length).setValues([[
    new Date(), false, limpa(p.nome).slice(0, 60), email, nota, limpa(p.comentario).slice(0, 600),
    p.mostrar === "sim" ? "Sim" : "Não", limpa(p.idioma), pedido[5],
  ]]);
  aba.getRange(linha, 2).insertCheckboxes();
  return true;
}

// A chave secreta fica em Configurações do projeto → Propriedades do script (RECAPTCHA_SECRET), fora do código.
// Sem a chave, não confere (o site continua funcionando antes de configurar).
function humano(token) {
  const segredo = PropertiesService.getScriptProperties().getProperty("RECAPTCHA_SECRET");
  if (!segredo) return true;
  if (!token) return false;
  const r = UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "post",
    payload: { secret: segredo, response: token },
    muteHttpExceptions: true,
  });
  const res = JSON.parse(r.getContentText() || "{}");
  return res.success === true && (res.score === undefined || res.score >= NOTA_RECAPTCHA);
}

function dentroDoLimite(tipo, email) {
  const cache = CacheService.getScriptCache();
  const lim = LIMITES[tipo];
  const hora = `${tipo}:h:${Utilities.formatDate(new Date(), "GMT", "yyyyMMddHH")}`;
  const doEmail = `${tipo}:e:${email}`;
  const nHora = Number(cache.get(hora) || 0);
  const nEmail = Number(cache.get(doEmail) || 0);
  if (nHora >= lim.porHora || nEmail >= lim.porEmailDia) return false;
  cache.put(hora, String(nHora + 1), 3600);
  cache.put(doEmail, String(nEmail + 1), 86400);
  return true;
}

function avisaPedido(p) {
  const corpo = COLUNAS.slice(2).map((nome, i) => `${nome}: ${limpa(p[CAMPOS[i + 2]])}`).join("\n");
  MailApp.sendEmail({
    to: AVISAR,
    replyTo: limpa(p.email),
    subject: `Novo pedido — Banda de Papel (${limpa(p.pacote)})`,
    body: `${corpo}\n\nPlanilha: ${SpreadsheetApp.getActive().getUrl()}`,
  });
}

function avisaAvaliacao(p) {
  MailApp.sendEmail({
    to: AVISAR,
    subject: `Nova avaliação — Banda de Papel (${limpa(p.nota)}/5)`,
    body: `Nome: ${limpa(p.nome)}\nE-mail: ${limpa(p.email)}\nNota: ${limpa(p.nota)}\nPode mostrar: ${p.mostrar === "sim" ? "Sim" : "Não"}\n\n${limpa(p.comentario)}\n\n` +
      `Pra aparecer no site, marque "Mostrar" na aba ${ABA_AV}: ${SpreadsheetApp.getActive().getUrl()}`,
  });
}

function abaPedidos() {
  const planilha = SpreadsheetApp.getActive();
  let aba = planilha.getSheetByName(ABA);
  if (aba) return aba;
  aba = planilha.insertSheet(ABA);
  aba.appendRow(COLUNAS);
  aba.setFrozenRows(1);
  aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
  const regra = SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).build();
  aba.getRange("B2:B").setDataValidation(regra);
  return aba;
}

function abaAvaliacoes() {
  const planilha = SpreadsheetApp.getActive();
  let aba = planilha.getSheetByName(ABA_AV);
  if (aba) return aba;
  aba = planilha.insertSheet(ABA_AV);
  aba.appendRow(COLUNAS_AV);
  aba.setFrozenRows(1);
  aba.getRange(1, 1, 1, COLUNAS_AV.length).setFontWeight("bold");
  return aba;
}

// Texto que começa com = + - @ vira fórmula na planilha; o apóstrofo mantém como texto.
function limpa(v) {
  const s = String(v || "").trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function ok() {
  return ContentService.createTextOutput("ok");
}

// Rode uma vez pelo editor (botão Executar) pra criar as abas e autorizar planilha, e-mail e reCAPTCHA.
function configurar() {
  abaPedidos();
  abaAvaliacoes();
  UrlFetchApp.fetch("https://www.google.com/recaptcha/api.js"); // só pra pedir a permissão de acesso externo
}
