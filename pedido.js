// URL do app da Web do Apps Script (Implantar → Nova implantação → App da Web). Ver planilha/README.md.
const PLANILHA_URL = "https://script.google.com/macros/s/AKfycbxsFphUFdnPd_gpKRMaN88hhRHTDJuUoC4TJroPdfjuWGnVP6FQzCkKpMz6ZDAAZ178tg/exec";

const form = document.getElementById("pedido-form");
const pt = document.documentElement.lang.startsWith("pt");
const erro = form.querySelector(".form-erro");
const botao = form.querySelector("button[type=submit]");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  erro.hidden = true;
  if (!PLANILHA_URL) return falhou();
  const textoBotao = botao.textContent;
  botao.disabled = true;
  botao.textContent = pt ? "Enviando..." : "Sending...";
  try {
    // no-cors: o Apps Script não manda cabeçalho de CORS, então a resposta não é legível; só a falha de rede é
    await fetch(PLANILHA_URL, { method: "POST", mode: "no-cors", body: new URLSearchParams(new FormData(form)) });
    location.href = form.dataset.obrigado;
  } catch {
    botao.disabled = false;
    botao.textContent = textoBotao;
    falhou();
  }
});

function falhou() {
  erro.textContent = pt
    ? "Não deu pra enviar agora. Tente de novo em alguns minutos."
    : "Couldn't send right now. Please try again in a few minutes.";
  erro.hidden = false;
}
