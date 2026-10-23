// Recebe os pedidos do site (pedido.js), grava uma linha na aba "Pedidos" e avisa por e-mail.
// Cole este arquivo em Extensões → Apps Script da planilha. Passo a passo em planilha/README.md.

const ABA = "Pedidos";
const AVISAR = "contato@prancheta.cloud"; // deixe "" pra não receber e-mail
const COLUNAS = ["Data", "Status", "Idioma", "Nome", "E-mail", "Pacote", "Cenário", "Música", "Trecho", "Bumbo", "Prazo", "Observações"];
const CAMPOS = [null, null, "idioma", "nome", "email", "pacote", "cenario", "musica", "trecho", "bumbo", "prazo", "obs"];
const STATUS = ["Novo", "Aceito", "Pago", "Entregue", "Recusado"];

function doPost(e) {
  const p = e.parameter;
  if (p.site) return ok(); // honeypot: só robô preenche

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const aba = abaPedidos();
    const linha = CAMPOS.map((c, i) => (i === 0 ? new Date() : i === 1 ? "Novo" : limpa(p[c])));
    aba.appendRow(linha);
  } finally {
    lock.releaseLock();
  }

  if (AVISAR) {
    const corpo = COLUNAS.slice(2).map((nome, i) => `${nome}: ${limpa(p[CAMPOS[i + 2]])}`).join("\n");
    MailApp.sendEmail({
      to: AVISAR,
      replyTo: limpa(p.email),
      subject: `Novo pedido — Banda de Papel (${limpa(p.pacote)})`,
      body: `${corpo}\n\nPlanilha: ${SpreadsheetApp.getActive().getUrl()}`,
    });
  }
  return ok();
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

// Texto que começa com = + - @ vira fórmula na planilha; o apóstrofo mantém como texto.
function limpa(v) {
  const s = String(v || "").trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function ok() {
  return ContentService.createTextOutput("ok");
}

// Rode uma vez pelo editor (botão Executar) pra criar a aba e autorizar planilha e e-mail.
function configurar() {
  abaPedidos();
}
