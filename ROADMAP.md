# Roadmap — Teste Político

**Status (Atualizado em 2026-09-08):** No ar, 47 testes Vitest passando, SSR com Next.js 15 App Router, AdSense rejeitado novamente em 28/08/2026 ("Conteúdo de baixo valor" + `ads.txt` "Não encontrado" — ver seção AdSense abaixo).

---

## Roadmap de Engenharia

Seguindo o padrão de engenharia do projeto:

- N/A — **P0 Segurança**: sem auth, sem dado de usuário persistido (resultado do quiz é local). Zero segredo no histórico (`gitleaks`).
- [x] **P1 Infra & Deploy**: Vercel (Next.js App Router, SSR real).
- N/A — **P2 Saúde & Resiliência**: serverless.
- [x] **P3 CI/CD**: `.github/workflows/ci.yml` configurado.
- [x] **P4 Testes**: 47 testes Vitest passando.
- N/A — **P5/P6**: sem banco próprio.
- [x] **P7 SEO & Conteúdo Substantivo**: 
  - [x] Página de Metodologia (`/metodologia`) detalhando a álgebra linear 4D e a matemática por trás do cálculo.
  - [x] Páginas individuais dos 4 Eixos (`/eixos` e `/eixos/[slug]`) detalhando os espectros políticos.
  - [x] Páginas individuais por Ideologia (`/ideologia` e `/ideologia/[slug]`) cobrindo 40+ ideologias com contexto histórico, políticos e livros.
  - [x] Dicionário de Ciência Política (`/dicionario`) com 24+ conceitos teóricos e práticos com busca em tempo real.
  - [x] Marcação Schema.org (JSON-LD) em todas as rotas (`DefinedTermSet`, `TechArticle`, `Article`, `FAQPage`, `BreadcrumbList`).
  - [x] Seções de FAQ Interativas e Breadcrumbs Semânticos.
  - [x] Sitemap dinâmico (`/sitemap.ts`) e robots (`/robots.ts`) cobrindo 57 páginas (10 estáticas + 4 eixos + 43 ideologias; verificado ao vivo 2026-09-14).
- [x] **P9 Documentação**: README.md e ROADMAP.md atualizados.

---

## Qualidade de Conteúdo & AdSense

Com a criação das páginas de **Metodologia**, **Eixos**, **Ideologias** e **Dicionário de Ciência Política**, o problema de "thin content" que causou a objeção inicial do AdSense foi plenamente superado:

- [x] **Página de metodologia (`/metodologia`)** — explica o vetor 4D, cálculo de distância euclidiana, mapeamento das perguntas e FAQ técnico.
- [x] **Páginas individuais por eixo ideológico (`/eixos/[slug]`)** — conteúdo original explicando cada polo e contexto com Breadcrumbs.
- [x] **Páginas individuais por ideologia (`/ideologia/[slug]`)** — 40+ páginas com texto substantivo, histórico, figuras públicas, livros e JSON-LD.
- [x] **Dicionário Político (`/dicionario`)** — enciclopédia interativa de termos políticos e econômicos.
- [x] **Issue #1 (GitHub) — Revisão técnica e gramatical de perguntas e exemplos** — 87 perguntas e exemplos auditados e formatados com inicial maiúscula e pontuação.
- [x] **Issue #3 (GitHub) — Integrar links de afiliados Amazon em cada ideologia** — implementado via `BookCard` com tag automática `tag=rilson-20`.
- [x] **Issue #5 (GitHub) — Melhorar a geração e cópia do card de resultado** — implementado via `ShareResults` (Canvas/PNG, Web Share API, suporte a Instagram/Twitter/Link).
- [x] **Issue #6 (GitHub) — Configurar Meta Tags dinâmicas para compartilhamento** — implementado com `ImageResponse` via `@vercel/og` na rota `/api/og` e `generateMetadata` dinâmico em todas as rotas.

### AdSense — rejeitado de novo (2026-08-28), "Conteúdo de baixo valor"

Mesmo depois de todo o trabalho de conteúdo acima (metodologia, eixos,
ideologias, dicionário, schema.org), o painel do AdSense voltou a marcar
o site como **"Requer atenção" / "Conteúdo de baixo valor"** em
28/08/2026 — mesma categoria de rejeição do AlternativasBR (ver
`alternativas-br/ROADMAP.md`, P7), então provavelmente não é um problema
isolado deste projeto, e sim um padrão do AdSense com sites novos/pequenos
do portfólio.

- [ ] **`ads.txt` marcado como "Não encontrado" no painel** — checado ao
      vivo (`curl -sL https://testepolitico.com.br/ads.txt`): retorna
      `200 OK`, `Content-Type: text/plain`, conteúdo correto
      (`google.com, pub-5482566824255473, DIRECT, f08c47fec0942fa0`,
      idêntico ao do AlternativasBR, que aparece como "Autorizado" no
      mesmo painel). Arquivo está em `public/ads.txt`, versionado
      (commit `689cc08`), servido nativamente pelo Next.js via Vercel
      (o `location = /ads.txt` do `nginx-prod.conf`/`Dockerfile.nginx` é
      de um setup Docker alternativo que não é o usado em produção —
      produção é Vercel). **Leitura**: o arquivo está correto e no ar;
      o mais provável é que seja um crawl desatualizado do Google (scan
      de 28/08 pode não ter revisitado desde então) — vale só pedir
      revisão de novo e ver se o status atualiza sozinho antes de mexer
      em infra
- [ ] **Motivo de fundo ainda em aberto**: "conteúdo de baixo valor"
      persistindo apesar do volume de conteúdo sugere que o AdSense está
      avaliando outra coisa além de quantidade de texto (idade do
      domínio, tráfego orgânico real, ou política de conteúdo político/
      eleitoral sendo tratada com mais rigor). Sem confirmação — só
      hipótese até a próxima resposta do Google

---

## Backlog de Produto & Marketing (Eleitoral)

### Plano de Execução 2026-09-14 → 1º turno (04/10)

> Consolidado em 2026-09-14 a partir de `docs/MARKETING.md` +
> `docs/MARKETING_COPY.md` + avaliação de maturidade pré-divulgação.
> Regra-mãe (vault): *neutralidade percebida antes de escala; medir antes
> de dobrar; UTM em tudo desde o primeiro post*.

#### 🚧 Bloqueadores (resolver ANTES de qualquer push de tráfego)
- [ ] **Leitura cruzada da neutralidade** — a revisão do commit `647acd4`
      (11 perguntas compostas, 2 roasts) foi solo e parcial; o próprio
      `MARKETING.md` deixa como ressalva. Executar a leitura cruzada de
      graça via posts no Reddit ("me avisa se alguma frase soar
      tendenciosa") e registrar achados reais de volta no `MARKETING.md`.
- [ ] **Commit do ROADMAP atualizado (2026-09-08)** — versão com status
      novo e seção AdSense está não commitada. Commitar antes de divulgar.
- [ ] **Housekeeping SEO**: sitemap dinâmico declara 66 páginas mas o
      sitemap ao vivo tem 57 URLs; `docs/ANALYTICS.md` ainda cita 70
      perguntas (real: 87). Corrigir para claims futuros não quebrarem
      auditoria.
- [ ] **Canonical www × não-www** — site faz 307-redirect de
      `testepolitico.com.br` → `www`, mas sitemap usa URLs sem www.
      Conferir canonical/indexação no GSC.

#### 🚀 Canais (ordem de esforço/retorno, do `MARKETING.md`)
1. [ ] **TikTok/Reels/Shorts** — roteiro de 35-40s ("reagi ao meu
      resultado") já em `MARKETING_COPY.md`; conferir CTA legível na
      própria imagem de resultado (no Instagram a imagem circula sem
      link); TikTok: link na bio, não na legenda.
2. [ ] **Grupos de WhatsApp** — 3-5 grupos de espectros **diferentes**,
      um de cada vez com preâmbulo natural; UTM `utm_source=whatsapp`.
3. [ ] **Reddit** (r/brasil, r/brasilivre, r/politica) — transparência de
      criador; conferir regras de autopromoção de cada sub ANTES; copy
      pronta + pedido de feedback de viés (resolve o bloqueador de
      neutralidade de graça).
4. [ ] **X/Twitter** — post principal com print do próprio resultado +
      link direto (não pedir) pra 2-3 contas de meme político de
      espectros opostos.
5. [ ] **Criadores/podcasts** — pitch de embed/imagem de resultado
      customizada; procurar 1 criador de direita E 1 de esquerda com
      audiência parecida.

#### 📅 Calendário
- [ ] **Semana 22-28/09**: produzir agendados (5 vídeos + posts) que
      respondem aos 5 canais; contatos de criadores.
- [ ] **28/09-02/10 (pico)**: push máximo em todos os canais — máxima
      busca orgânica do ano.
- [ ] **05-25/10 (entre turnos)**: reaproveitar o que performou.

#### 📊 Métricas de decisão (GA4, conferir toda segunda)
- [ ] `quiz_complete / quiz_start` > 60% (meta).
- [ ] **`result_share / result_view` > 20% — número que decide dobrar ou
      abandonar cada canal**; comparar por UTM.
- [ ] Acompanhar abandono (`quiz_abandon`) por canal.

### Pendências registradas antes
- [ ] **Executar Plano de Marketing (Época Eleitoral)** — realizar o Marketing Day na Sprint 2 de Setembro (WhatsApp, Reddit r/brasil e r/brasilivre, Facebook grupos políticos, Twitter/X thread, LinkedIn artigo técnico).
- [ ] **Acompanhar GA4 pós-divulgação** — monitorar taxas de abandono (`quiz_abandon`), compartilhamento (`result_share`) e conclusões (`quiz_complete`).

