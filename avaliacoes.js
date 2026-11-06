// Mostra as avaliações aprovadas na planilha (coluna Mostrar). Sem nenhuma, a seção fica escondida.
// Usa PLANILHA_URL do pedido.js, que carrega antes.
// data-tipo="kit" na seção mostra só as de kit (pacote "Kits de papel"); sem isso, só as de vídeo.
(async () => {
  const secao = document.getElementById("avaliacoes");
  if (!secao) return;
  let lista;
  try {
    lista = await (await fetch(PLANILHA_URL)).json();
  } catch {
    return;
  }
  if (!Array.isArray(lista)) return;
  const deKit = (a) => String(a.pacote || "").toLowerCase().startsWith("kit");
  lista = lista.filter((a) => (secao.dataset.tipo === "kit" ? deKit(a) : !deKit(a)));
  if (!lista.length) return;

  const pt = document.documentElement.lang.startsWith("pt"), es = document.documentElement.lang.startsWith("es");
  const grade = secao.querySelector(".reviews");
  for (const a of lista.slice(0, 6)) {
    const nota = Math.min(5, Math.max(1, Number(a.nota) || 5));
    const card = document.createElement("figure");
    card.className = "review paper";
    const estrelas = document.createElement("p");
    estrelas.className = "stars";
    estrelas.textContent = "★".repeat(nota) + "☆".repeat(5 - nota);
    estrelas.setAttribute("aria-label", pt || es ? `${nota} de 5` : `${nota} out of 5`);
    const texto = document.createElement("blockquote");
    texto.textContent = a.comentario;
    const quem = document.createElement("figcaption");
    quem.textContent = a.pacote ? `${a.nome} · ${a.pacote}` : a.nome;
    card.append(estrelas, texto, quem);
    grade.append(card);
  }
  secao.hidden = false;
})();
