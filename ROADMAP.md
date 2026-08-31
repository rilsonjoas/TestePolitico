# Roadmap — Teste Político

**Status (Atualizado em 2026-08-31):** No ar, 47 testes Vitest passando, SSR com Next.js 15 App Router, AdSense em fase de validação pós-conteúdo.

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
  - [x] Sitemap dinâmico (`/sitemap.ts`) e robots (`/robots.ts`) cobrindo 66 páginas estáticas.
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

---

## Backlog de Produto & Marketing (Eleitoral)

- [ ] **Executar Plano de Marketing (Época Eleitoral)** — realizar o Marketing Day na Sprint 2 de Setembro (WhatsApp, Reddit r/brasil e r/brasilivre, Facebook grupos políticos, Twitter/X thread, LinkedIn artigo técnico).
- [ ] **Acompanhar GA4 pós-divulgação** — monitorar taxas de abandono (`quiz_abandon`), compartilhamento (`result_share`) e conclusões (`quiz_complete`).

