# Copy pronta pra postar — primeira calibragem (2026-08-18)

Complementa `MARKETING.md`. Isto aqui é o material pra colar direto nos 4
canais escolhidos: WhatsApp, TikTok/Reels, Reddit, X/Twitter. Textos com
`[RESULTADO]` ou `[SEU RESULTADO]` precisam ser preenchidos depois de você
mesmo rodar o teste — reação genuína performa muito melhor que reação
fabricada, e em fórum político (Reddit) mentir sobre isso é fácil de pegar.

## Esquema de UTM

Todo link compartilhado deve levar esses parâmetros, pra dar pra comparar
canal por canal na aba de Aquisição do GA4 (não precisa de código, o
`gtag.js` já lê isso da URL sozinho):

| Canal | Link completo |
|---|---|
| WhatsApp | `https://testepolitico.com.br/?utm_source=whatsapp&utm_medium=message&utm_campaign=eleicoes2026` |
| TikTok/Reels | `https://testepolitico.com.br/?utm_source=tiktok&utm_medium=social&utm_campaign=eleicoes2026` |
| Reddit r/brasil | `https://testepolitico.com.br/?utm_source=reddit&utm_medium=social&utm_campaign=eleicoes2026&utm_content=r_brasil` |
| Reddit r/brasilivre | `https://testepolitico.com.br/?utm_source=reddit&utm_medium=social&utm_campaign=eleicoes2026&utm_content=r_brasilivre` |
| Reddit r/politica | `https://testepolitico.com.br/?utm_source=reddit&utm_medium=social&utm_campaign=eleicoes2026&utm_content=r_politica` |
| X/Twitter | `https://testepolitico.com.br/?utm_source=twitter&utm_medium=social&utm_campaign=eleicoes2026` |

**TikTok não deixa link clicável na legenda** (a menos que a conta tenha
link na bio habilitado) — bota o link de TikTok na bio do perfil, não no
texto do vídeo.

---

## 1. WhatsApp

Enviar como mensagem pessoal em 3-5 grupos variados ideologicamente
(não em massa, um de cada vez, com preâmbulo natural pro contexto do
grupo). Anexar print do próprio resultado.

```
Gente, fiz um teste de posicionamento político que eu mesmo desenvolvi
(~87 perguntas, mede 4 eixos — econômico, autoridade do Estado,
diplomacia e costumes — não só esquerda x direita). Achei bem mais
completo que os testes que rodam por aí.

Deu [RESULTADO] pra mim 😅 bora ver o que dá pra vocês?

https://testepolitico.com.br/?utm_source=whatsapp&utm_medium=message&utm_campaign=eleicoes2026
```

## 2. TikTok / Reels / Shorts

Roteiro de ~35-40s, formato "reagi ao meu resultado":

| Tempo | O que mostrar |
|---|---|
| 0-3s | Hook falado direto pra câmera: "Eu fiz um teste que descobre sua ideologia política em 4 eixos diferentes, não só esquerda x direita — e o resultado me pegou de surpresa" |
| 3-15s | Gravação de tela em timelapse respondendo algumas perguntas (acelerado 2-3x, com música) |
| 15-25s | Reveal da tela de resultado — reação genuína, sem cortar |
| 25-35s | Explicação rápida dos 4 eixos (econômico, diplomacia, autoridade, costumes) sobre a própria imagem de resultado |
| 35-40s | CTA falado: "Link na bio, testa o seu e manda pra alguém que você quer comparar" |

Legenda sugerida:
```
Descobri minha ideologia política em 4 eixos (não é só esquerda x
direita) 👀 link na bio, testa o seu

#testepolitico #eleicoes2026 #politicabrasileira #quizpolitico
```

## 3. Reddit

**Antes de postar: confira as regras fixadas de cada sub agora** — regras
de autopromoção mudam com frequência e não foram verificadas nesta
sessão. A maioria dos subs de política exige que você se identifique
como criador (não esconder que é seu projeto) — os textos abaixo já
assumem essa transparência, o que também é mais seguro pra credibilidade.

### r/brasil

```
Título: Passei os últimos meses fazendo um teste de posicionamento
político em 4 eixos (não só esquerda x direita) — quis trazer aqui
pra ouvir o que vocês acham

Corpo:
Sou o criador, então digo isso de cara: é um projeto pessoal, sem
anúncio nem coleta de dado sensível. A ideia surgiu de eu achar os
testes desse tipo que rodam por aí meio rasos — então fiz um com ~87
afirmações e pontuação em 4 eixos (econômico, autoridade do Estado,
diplomacia e costumes) em vez de um único espectro esquerda-direita.

Fiz um esforço puxado pra deixar as perguntas neutras — bora ver se
bate: se alguma frase soar tendenciosa pra um lado ou outro, me avisa
aqui que eu reviso.

[link com utm_content=r_brasil]
```

### r/brasilivre

Mesmo corpo, trocando só o título pra soar menos genérico:

```
Título: Testei / construí um teste político de 4 eixos — queria ver se
vocês acham as perguntas justas antes de divulgar mais

[mesmo corpo, link com utm_content=r_brasilivre]
```

### r/politica

```
Título: Fiz um teste de posicionamento político em 4 eixos pensando na
eleição — feedback bem-vindo antes de eu divulgar mais

[mesmo corpo, link com utm_content=r_politica]
```

## 4. X/Twitter

Post principal (com print do próprio resultado anexado):

```
Passei um tempo bom construindo um teste de posicionamento político em
4 eixos — econômico, diplomático, autoridade do Estado e costumes — em
vez do clássico esquerda x direita. ~87 afirmações, cálculo por
distância euclidiana, sem caixa-preta.

Meu resultado: [SEU RESULTADO]

Testa o seu:
https://testepolitico.com.br/?utm_source=twitter&utm_medium=social&utm_campaign=eleicoes2026
```

Depois do post: mandar o link diretamente (não pedir) pra 2-3 contas de
meme político de espectros diferentes — se só um lado divulgar, reforça
a percepção de viés que o item 0 do `MARKETING.md` tentou resolver.

---

## Bônus: isso também resolve uma pendência de neutralidade

Os posts no Reddit pedindo "me avisa se alguma pergunta soar
tendenciosa" fazem, de graça, a leitura cruzada por pessoas de fora que
o item 0 do `MARKETING.md` deixou como ressalva em aberto (a checagem
que fiz foi solo). Vale registrar de volta no `MARKETING.md` qualquer
achado real que vier dessas respostas.
