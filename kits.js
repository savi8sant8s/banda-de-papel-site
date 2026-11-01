// Escolha dos kits: calcula o valor e mostra o Pix certo (QR e copia e cola).
(() => {
  const PRECO = 5.99, TODOS = 19.99;
  const caixas = [...document.querySelectorAll("#kits input[name=kit]")];
  const todos = document.querySelector("#todos");
  const pagar = document.querySelector("#pagar");
  const brl = (v) => v.toFixed(2).replace(".", ",");

  function atualiza() {
    const marcados = caixas.filter((c) => c.checked);
    caixas.forEach((c) => c.closest(".kit").classList.toggle("escolhido", c.checked));
    if (!marcados.length) { pagar.hidden = true; return; }
    // 4 ou mais avulsos passariam de R$ 19,99: aí vale a coleção inteira
    const colecao = marcados.length >= 4;
    if (colecao && !todos.checked) { todos.checked = true; caixas.forEach((c) => (c.checked = true)); return atualiza(); }
    const valor = colecao ? TODOS : PRECO * marcados.length;
    const chave = valor.toFixed(2);
    const nomes = colecao ? "Coleção completa (5 kits)" : marcados.map((c) => c.value).join(", ");
    document.querySelector("#resumo").textContent = `${nomes}: R$ ${brl(valor)}`;
    document.querySelector("#pix-qr").src = `assets/pix/pix-${chave.replace(".", "-")}.png`;
    document.querySelector("#pix-code").value = window.PIX[chave];
    document.querySelector("#f-kits").value = nomes;
    document.querySelector("#f-valor").value = `R$ ${brl(valor)}`;
    pagar.hidden = false;
  }

  caixas.forEach((c) => c.addEventListener("change", () => { if (!c.checked) todos.checked = false; atualiza(); }));
  todos.addEventListener("change", () => {
    caixas.forEach((c) => (c.checked = todos.checked));
    atualiza();
    if (todos.checked) pagar.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("#copiar").addEventListener("click", async (ev) => {
    const campo = document.querySelector("#pix-code");
    try { await navigator.clipboard.writeText(campo.value); } catch { campo.select(); document.execCommand("copy"); }
    ev.target.textContent = "Copiado!";
    setTimeout(() => (ev.target.textContent = "Copiar código Pix"), 2000);
  });
})();
