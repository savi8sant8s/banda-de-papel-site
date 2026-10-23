# Banda de Papel — site

Página de encomendas de vídeos da [Banda de Papel](https://www.youtube.com/@abandadepapel), em português (`/`) e inglês (`/en/`). HTML e CSS estáticos, sem build, publicados pelo GitHub Pages.

## Pedidos

O formulário (`pedido.js`, usado pelas duas línguas) grava cada pedido numa planilha do Google via Apps Script. Configuração em [planilha/README.md](planilha/README.md).

## Mudar preços, regras ou portfólio

Tudo está escrito direto no HTML, nas duas línguas: lembre de mudar `index.html` e `en/index.html` juntos.

- Portfólio: capas em `assets/<id-do-short>.jpg` (`https://i.ytimg.com/vi/<id>/oardefault.jpg`).
- Cenários: `assets/cenarios/<cenario>.jpg`, um quadro de um vídeo já renderizado.
