# Pedidos na planilha

O formulário do site (`pedido.js`) manda cada pedido para um Apps Script, que grava uma linha na aba **Pedidos** e avisa por e-mail. O mesmo script recebe as avaliações (aba **Avaliações**) e entrega as aprovadas pro site (`avaliacoes.js`).

## Configurar (uma vez, ~5 min)

1. Crie uma planilha no Google Sheets (ex.: "Banda de Papel — Pedidos").
2. **Extensões → Apps Script**. Apague o que estiver lá e cole o conteúdo de `Code.gs`. Salve.
3. Escolha a função `configurar` no topo e clique em **Executar**. Autorize o acesso (planilha e e-mail). Isso cria as abas Pedidos e Avaliações e pede as permissões (planilha, e-mail e acesso externo, que é o do reCAPTCHA).
4. **Implantar → Nova implantação** → tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Copie a URL que termina em `/exec` e cole em `PLANILHA_URL`, no começo de `pedido.js`.

## Mudou o `Code.gs`?

Implantar → **Gerenciar implantações** → editar (lápis) → Versão: **Nova versão**. Assim a URL continua a mesma.

## Status

Coluna B: Novo → Aceito → Pago → Entregue (ou Recusado). Todo pedido chega como Novo.

## reCAPTCHA

O site manda um token do reCAPTCHA v3 em todo envio. A chave de site (pública) está em `pedido.js`; a **secreta** fica só no Apps Script, fora do código:

**Configurações do projeto** (engrenagem) → **Propriedades do script** → adicionar `RECAPTCHA_SECRET` com a chave secreta (em google.com/recaptcha/admin → site bandadepapel.cloud → Configurações).

Sem essa propriedade, o script não confere o reCAPTCHA (útil pra testar). Envio com nota abaixo de 0,5 é ignorado.

## Limites contra spam

Em `LIMITES`, no começo do `Code.gs`: até 15 pedidos por hora no total e 3 por e-mail por dia; até 10 avaliações por hora e 1 por e-mail por dia. O que passar disso é ignorado sem aviso.

## Avaliações

Aba **Avaliações**. Só entra avaliação de e-mail que tenha um pedido com Status **Entregue** na aba Pedidos.

1. Ao entregar o vídeo, mande o link: `https://bandadepapel.cloud/avaliar.html?email=EMAIL_DO_CLIENTE` (em inglês: `/en/review.html?email=...`).
2. A avaliação chega com **Mostrar** desmarcado, e um e-mail avisa.
3. Marque **Mostrar** pra ela aparecer no site (seção "Quem já pediu", depois do portfólio). Só aparece se o cliente também deixou ("Pode mostrar" = Sim). Desmarcou, some.
4. O site leva até 5 minutos pra atualizar. Sem nenhuma avaliação aprovada, a seção fica escondida.
