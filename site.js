// Bolinhas dos carrosséis do celular e o botão de pedido fixo. No computador as grades não rolam e nada disso aparece.
(() => {
  const pt = document.documentElement.lang.startsWith("pt");

  for (const trilho of document.querySelectorAll(".reels, .scenes, .plans, .reviews")) {
    const dots = document.createElement("div");
    dots.className = "dots";
    trilho.after(dots);

    let paginas = 0;
    const marca = () => {
      const max = trilho.scrollWidth - trilho.clientWidth;
      const atual = max > 0 ? Math.round((trilho.scrollLeft / max) * (paginas - 1)) : 0;
      dots.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", i === atual));
    };
    const monta = () => {
      const max = trilho.scrollWidth - trilho.clientWidth;
      const n = max > 1 ? Math.min(8, Math.ceil(trilho.scrollWidth / trilho.clientWidth)) : 0;
      dots.hidden = n < 2;
      if (n === paginas) return marca();
      paginas = n;
      dots.replaceChildren();
      for (let i = 0; i < n; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", pt ? `Ir para a parte ${i + 1}` : `Go to part ${i + 1}`);
        b.addEventListener("click", () => {
          const max = trilho.scrollWidth - trilho.clientWidth;
          trilho.scrollTo({ left: (max * i) / (n - 1), behavior: "smooth" });
        });
        dots.append(b);
      }
      marca();
    };
    trilho.addEventListener("scroll", marca, { passive: true });
    new ResizeObserver(monta).observe(trilho);
    // as avaliações chegam depois, pelo avaliacoes.js
    new MutationObserver(monta).observe(trilho, { childList: true });
  }

  const cta = document.querySelector(".cta-fixo");
  const hero = document.querySelector(".hero");
  const pedido = document.querySelector("#pedido, #order");
  if (cta && hero && pedido) {
    const visiveis = new Set();
    const obs = new IntersectionObserver((itens) => {
      for (const i of itens) i.isIntersecting ? visiveis.add(i.target) : visiveis.delete(i.target);
      cta.toggleAttribute("data-escondido", visiveis.size > 0);
    });
    obs.observe(hero);
    obs.observe(pedido);
  }
})();
