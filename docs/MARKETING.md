# Plano de Crescimento — Eleições 2026

Registrado em 2026-08-14. Objetivo: aproveitar a janela das eleições gerais
brasileiras de 2026 (1º turno 4/out, 2º turno 25/out — se houver) pra fazer
o Teste Político circular. A partir de hoje até o 1º turno são ~7 semanas;
essa é a melhor janela do ano pra um teste de ideologia em português.

## 0. Pré-requisito: neutralidade percebida

Antes de qualquer push de tráfego, vale um passe nas perguntas. Em ano
de eleição, "teste político enviesado" é o tipo de acusação que vira
print e mata a viralização antes de começar — baixo custo de corrigir
agora, alto risco se pulado. Achado numa revisão de amostra (~15 das 70
perguntas) em 2026-08-14, não uma auditoria completa:

- [x] **Perguntas compostas.** Várias afirmações empacotam mais de uma
      alegação na mesma frase (ex: "reduz preços, aumenta qualidade E
      estimula inovação"). Numa escala Likert, quem concorda com uma
      parte e discorda de outra não tem como expressar isso — a
      resposta vira ruído, não sinal. Feito em 2026-08-18: revisadas as
      80 perguntas (não 70 — a contagem real já tinha divergido do
      README antes desse passe). 11 identificadas como compostas; 4
      reescritas pra uma alegação só, 7 separadas em duas perguntas
      cada (com `effect` recalibrado por alegação). Total foi de 80
      para 87 perguntas. `tsc --noEmit` e `vitest run` (47 testes)
      passando depois da mudança.
- [x] **Contra-argumento embutido como fato no `example`.** Em pelo
      menos uma pergunta do lado "mercado" (ex: renda básica "cria
      dependência financeira e desincentiva o trabalho a longo prazo"),
      o `example` apresenta uma posição contestada como se fosse dado
      objetivo, em vez de apresentá-la como a lógica *daquele lado*.
      Feito em 2026-08-18: passe pelas 89 perguntas (pós-split acima)
      aplicando o teste "esse `example` soa como explicação justa
      daquele lado, ou como o lado oposto explicando por que está
      errado?". A instância original (renda básica) foi corrigida no
      mesmo passe da divisão de perguntas compostas, com a frase
      reescrita como "na visão de quem defende esse ponto...". Não foi
      achada nenhuma outra instância clara do padrão — o estilo do
      arquivo já é consistente: quase todo `example` é escrito "na voz"
      do lado que a pergunta representa, de forma afirmativa mas fiel à
      lógica daquele lado (não uma paródia do lado oposto), o que passa
      no teste mesmo sem hedging. Isso foi uma leitura solo, não uma
      leitura cruzada por alguém de cada lado do espectro — a
      recomendação de pedir essa segunda opinião antes de publicar
      continua de pé.
- [x] Depois do passe acima, considerar repetir a checagem pras ~40+
      ideologias/roasts — mesmo risco de tom desigual entre lados.
      Feito em 2026-08-18: as 43 entradas de `roast` foram extraídas e
      comparadas por "família" (ideologias nunca implementadas na
      prática vs. as que tiveram implementação real com atrocidades).
      Padrão geral já era consistente — o peso da piada escala com dano
      histórico real (Stalinismo/Maoísmo/Nazismo levam piada pesada
      porque aconteceu de fato; utopias nunca testadas de qualquer lado
      levam piada de "ingênuo/impraticável"), então não reescrevi tudo.
      2 exceções corrigidas: **Anarco-Capitalismo** usava uma imagem de
      tráfico de órgãos infantis bem mais pesada que qualquer utopia
      teórica equivalente do lado esquerdo (Anarco-Comunismo,
      Distributismo etc.) — trocada pela ironia real e já documentada
      no próprio verbete (Milei precisa do Estado que sua filosofia
      considera ilegítimo). **Libertarianismo** usava estupro como
      piada pra "impostos" — não é bem uma questão de lado, é que
      nenhuma outra das 43 entradas recorre a violência sexual como
      punchline, nem as mais duras (Nazismo, Stalinismo) — trocado por
      "roubo à mão armada", que mantém a hipérbole sem o mesmo risco.
      `desc`/`content` (história, princípios, curiosidades) não foram
      revisados a fundo — são de tom enciclopédico em toda a amostra
      que conferi, risco bem menor que o campo `roast`.

## 1. Por que agora é a janela certa

- Pico de interesse por política em qualquer democracia acontece nas 6-8
  semanas antes da eleição — é quando as pessoas mais têm vontade de
  "descobrir onde se encaixam" e comparar com amigos/família.
- WhatsApp é o canal nº1 de discussão política informal no Brasil — o
  produto já tem botão de compartilhar direto pro WhatsApp, isso é uma
  vantagem real, não teórica.
- Testes desse tipo (8Values, Political Compass) sempre voltam a viralizar
  perto de eleição em qualquer país — não é um fenômeno hipotético.

## 2. Loop viral: usar o que já existe com mais força

A infra já suporta os três motores de crescimento mais eficazes pra esse
formato de produto. O gargalo não é construir mais coisa, é **dar mais
destaque** ao que já existe:

- **"Desafiar um amigo"** — hoje é um botão a mais na tela de resultado.
  Testar deixá-lo mais proeminente (ex: acima do fold, com preview visual
  de "você vs. seu amigo" antes mesmo de alguém clicar) — é o único
  mecanismo que traz gente **nova** pro teste, não só recompartilha pra
  quem já fez.
- **Imagem de resultado (Stories/Twitter/Feed)** — já é boa. Vale conferir
  se o CTA "faça o seu" está legível na própria imagem (não só no link),
  porque no Instagram a imagem circula sozinha, sem o link.
- **OG image dinâmica** — já funciona pro preview do link. Prioridade
  zero: nunca deixar essa quebrar durante o período de pico, é o que
  segura a taxa de clique de quem vê o link recompartilhado no grupo da
  família.

## 3. Canais — sem orçamento, esforço orgânico

Ordenados por relação esforço/retorno esperado pra esse tipo de produto:

1. **TikTok/Reels/Shorts** — formato "reagi ao meu resultado" ou "testei
   e bati com quem eu não esperava" performa muito bem pra quizzes assim.
   Vídeo curto, vertical, mostrando a tela de resultado real. É o canal
   de maior alcance orgânico disponível hoje sem gastar nada.
2. **Grupos de WhatsApp** — já tem o botão, falta o empurrão inicial:
   compartilhar em 3-5 grupos variados ideologicamente (não só bolha
   própria) pra não nascer com cara de "teste de um lado só".
3. **Reddit** (r/brasil, r/brasilivre, r/politica) — funciona bem se
   postado como "eu fiz esse teste, achei preciso, curioso pra saber o
   que vocês acham" — não como autopromoção pura. Ler as regras de cada
   sub antes (vários banem link direto de projeto próprio sem contexto).
4. **X/Twitter** — postar o próprio resultado, os quatro eixos, e abrir
   pra replies "e você, testa aí". Considerar mandar o link (não pedir,
   mandar) pra 2-3 contas de meme político **de espectros diferentes**
   — se só um lado divulgar, reforça a percepção de viés do item 0.
5. **Criadores de conteúdo político/podcasts** — pitch direto oferecendo
   embed ou imagem de resultado customizada pro criador. Aqui vale
   equilíbrio consciente: procurar 1 criador de direita e 1 de esquerda
   com audiência parecida, não só quem topar primeiro.

## 4. SEO

- Termos de cauda longa em português pra mirar: "teste de ideologia
  política", "que ideologia política eu tenho", "sou de esquerda ou
  direita teste", "teste político brasil 2026", "bússola política
  brasileira".
- Volume de busca desses termos sobe sozinho em outubro por sazonalidade
  eleitoral — não depende de ranking perfeito, só de já estar indexado
  antes do pico chegar (o `docs/DEPLOYMENT.md` já cobre o deploy; vale
  conferir se o `sitemap`/`robots.txt` estão OK, não verificado nesta
  sessão).

## 5. Guardrails — o que NÃO fazer

- **Não engajamento falso** (contas fake, bots de compartilhamento,
  comprar seguidores/curtidas) — além de ser exatamente o tipo de coisa
  que este assistente não ajuda a montar, é frágil: qualquer auditoria
  de bot detona a credibilidade do produto de vez.
- **Não mencionar candidatos/partidos específicos** no marketing nem no
  teste — manter o produto no nível de "ideologia/filosofia política",
  não "quanto você concorda com Fulano". Isso também reduz risco de cair
  em regras do TSE sobre propaganda eleitoral, que são bem mais rígidas
  perto da eleição.
- **Não divulgar só num lado do espectro** — mata a credibilidade de
  "teste neutro" que é o próprio diferencial anunciado no README.

## 6. Calendário (a partir de 2026-08-14)

| Semana | Foco |
|---|---|
| Ago (agora) | Passe de neutralidade nas perguntas (item 0) + primeiros posts em 2-3 canais pra calibrar o que engaja antes do pico |
| Set | Ritmo semanal de conteúdo (TikTok/Reels + grupos + Reddit); contato com 2-3 criadores de espectros diferentes |
| Última semana antes do 1º turno (fim set/início out) | Pico de push em todos os canais — é o momento de maior busca orgânica do ano |
| Out (entre turnos, se houver 2º turno) | Segundo pico menor — reaproveitar o mesmo conteúdo que performou melhor no 1º turno |

## 7. Métricas — já rastreadas via GA4 (`docs/ANALYTICS.md`)

Nada novo pra instrumentar, só olhar toda semana:

- `quiz_complete / quiz_start` — meta já definida: >60%
- `result_share / result_view` — meta já definida: >20%; **esse é o
  número que decide se um canal vale dobrar aposta ou abandonar**
- Comparar taxa de compartilhamento por canal de origem (UTM, se ainda
  não tiver, vale adicionar antes do primeiro post — sem isso não dá
  pra saber qual dos 5 canais do item 3 realmente traz gente)

## 8. Expectativa realista

Boa parte dessas táticas não vai pegar — é assim que crescimento
orgânico funciona, não tem como prever de antemão qual canal viraliza.
O ganho de concentrar esforço em 2-3 canais em vez de tentar tudo ao
mesmo tempo é ter sinal limpo o suficiente pra saber onde dobrar a
aposta depois da primeira ou segunda semana.
