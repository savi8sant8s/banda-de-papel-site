// URL do app da Web do Apps Script (Implantar → Nova implantação → App da Web). Ver planilha/README.md.
const PLANILHA_URL = "https://script.google.com/macros/s/AKfycbxsFphUFdnPd_gpKRMaN88hhRHTDJuUoC4TJroPdfjuWGnVP6FQzCkKpMz6ZDAAZ178tg/exec";
// Chave de site do reCAPTCHA v3. É pública de propósito (o navegador precisa dela); a secreta fica só no Apps Script.
const RECAPTCHA_SITE = "6LchpP0tAAAAAIgrn3y5whbL6_FhxRPlZ0jLkORb";

// Serve pro formulário de pedido e pro de avaliação: o que tiver data-obrigado.
const form = document.querySelector("form[data-obrigado]");
const pt = document.documentElement.lang.startsWith("pt");

if (form) {
  const erro = form.querySelector(".form-erro");
  const botao = form.querySelector("button[type=submit]");
  // O script do reCAPTCHA só carrega quando a pessoa começa a preencher.
  form.addEventListener("focusin", carregaRecaptcha, { once: true });

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    erro.hidden = true;
    const textoBotao = botao.textContent;
    botao.disabled = true;
    botao.textContent = pt ? "Enviando..." : "Sending...";
    try {
      const dados = new URLSearchParams(new FormData(form));
      dados.set("recaptcha", await tokenRecaptcha(dados.get("tipo") || "pedido"));
      // no-cors: o Apps Script não manda cabeçalho de CORS, então a resposta não é legível; só a falha de rede é
      await fetch(PLANILHA_URL, { method: "POST", mode: "no-cors", body: dados });
      location.href = form.dataset.obrigado;
    } catch {
      botao.disabled = false;
      botao.textContent = textoBotao;
      erro.textContent = pt
        ? "Não deu pra enviar agora. Tente de novo em alguns minutos."
        : "Couldn't send right now. Please try again in a few minutes.";
      erro.hidden = false;
    }
  });
}

let recaptchaPronto;
function carregaRecaptcha() {
  recaptchaPronto ??= new Promise((ok, falha) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE}`;
    s.onload = () => grecaptcha.ready(ok);
    s.onerror = () => { recaptchaPronto = undefined; falha(); }; // deixa tentar de novo no próximo envio
    document.head.append(s);
  });
  return recaptchaPronto;
}

async function tokenRecaptcha(acao) {
  await carregaRecaptcha();
  return grecaptcha.execute(RECAPTCHA_SITE, { action: acao });
}
