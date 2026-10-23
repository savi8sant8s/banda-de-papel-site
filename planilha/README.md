# Pedidos na planilha

O formulário do site (`pedido.js`) manda cada pedido para um Apps Script, que grava uma linha na aba **Pedidos** e avisa por e-mail.

## Configurar (uma vez, ~5 min)

1. Crie uma planilha no Google Sheets (ex.: "Banda de Papel — Pedidos").
2. **Extensões → Apps Script**. Apague o que estiver lá e cole o conteúdo de `Code.gs`. Salve.
3. Escolha a função `configurar` no topo e clique em **Executar**. Autorize o acesso (planilha e e-mail). Isso cria a aba Pedidos com as colunas e a lista de Status.
4. **Implantar → Nova implantação** → tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Copie a URL que termina em `/exec` e cole em `PLANILHA_URL`, no começo de `pedido.js`.

## Mudou o `Code.gs`?

Implantar → **Gerenciar implantações** → editar (lápis) → Versão: **Nova versão**. Assim a URL continua a mesma.

## Status

Coluna B: Novo → Aceito → Pago → Entregue (ou Recusado). Todo pedido chega como Novo.
