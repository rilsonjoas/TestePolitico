# Roadmap — Teste Político

**Status (2026-08-22):** No ar, 41 testes Vitest, GA4 configurado.

> [!WARNING] Correção — AdSense NÃO está ativo
> A versão anterior deste arquivo dizia "AdSense ativo". Não é verdade:
> a submissão foi **rejeitada** por "conteúdo de baixo valor" (thin
> content) — confirmado em sessão de auditoria anterior, comparando o
> HTML real entregue (SSR completo, ~43KB, conteúdo presente — não é
> problema de renderização) contra o motivo da rejeição. O diagnóstico
> real é profundidade de conteúdo original: poucas páginas de texto
> substantivo além do quiz em si. As páginas obrigatórias (privacidade,
> termos, cookie consent) já existem no código — não foi isso que
> causou a rejeição. Não confirmado se uma nova submissão foi feita
> desde então.

---

## Roadmap de Engenharia

Segue o padrão comum documentado em `hetzner-infra/PADRAO-DE-ENGENHARIA.md`.

- N/A — **P0 Segurança**: sem auth, sem dado de usuário persistido
  (resultado do quiz é local). Zero segredo no histórico (`gitleaks`,
  checado 2026-08-22)
- [x] **P1 Infra & Deploy**: Vercel (Next.js 14, SSR real — confirmado
  via `curl`, não é SPA vazia)
- N/A — **P2 Saúde & Resiliência**: serverless, sem processo de longa
  duração
- [x] **P3 CI/CD**: `.github/workflows/ci.yml` configurado
- [x] **P4 Testes**: 41 testes Vitest
- N/A — **P5/P6**: sem banco, sem log de servidor próprio
- [ ] **P7 SEO/conteúdo — é o gap real**: ver correção do AdSense acima.
      Não é acessibilidade nem renderização, é profundidade de conteúdo
      original nas páginas de ideologia
- [x] **P9 Documentação**: este arquivo, criado agora; 2 issues do
      GitHub fechadas por já estarem resolvidas no código (README
      já existia, páginas do AdSense já implementadas)

## Qualidade de Conteúdo (2026-08-22)

Padrão cross-projeto: `Padrão de Qualidade de Conteúdo.md` no vault
(princípio #7 de `Filosofia e Padrões de Engenharia.md`). **Este é o
projeto mais fraco nesse critério hoje** — zero seção de metodologia
no site, e é exatamente o motivo documentado da rejeição do AdSense
("conteúdo de baixo valor" / thin content, ver aviso no topo deste
arquivo). Diferente dos outros achados do padrão (fato inventado), aqui
o problema é **profundidade insuficiente**, não conteúdo errado — mas
é a mesma categoria: o quiz sozinho, sem contexto, não é suficiente.

- [ ] **Issue #1 (GitHub) — Revisão técnica e gramatical de perguntas e
      ideologias** — já aberta, é literalmente este padrão aplicado.
      Fazer antes de qualquer nova tentativa de AdSense.
- [ ] **Página de metodologia** — explicar como as 70 perguntas mapeiam
      pros 8 eixos, de onde vêm os eixos (8values/Politiscales como
      inspiração declarada), como as 40+ ideologias são calculadas.
      Isso é exatamente o tipo de "conteúdo original substantivo" que
      falta — resolve o P7 e a causa raiz da rejeição ao mesmo tempo.
- [ ] **Uma página por eixo ideológico** (ou por ideologia mapeada) com
      texto original explicando o espectro — não só o resultado do
      quiz, conteúdo que existe independente de alguém ter feito o
      teste. Won't fix nada de rejeição AdSense sem isso: anúncio em
      cima de 70 perguntas e nada mais é exatamente "thin content".
- [ ] Antes de resubmeter ao AdSense: confirmar que o volume de texto
      original (não gerado, não boilerplate) cresceu de verdade —
      não é sobre parecer mais denso, é sobre ser.

## Backlog de Produto — Issues e Bugs (levantamento 2026-08-21)

- [ ] **Executar Plano de Marketing (Época Eleitoral)** — realizar o Marketing Day na Sprint 2 de Setembro (WhatsApp, Reddit r/brasil e r/brasilivre, Facebook grupos políticos, Twitter/X thread, LinkedIn artigo técnico).
- [ ] **Acompanhar GA4 pós-divulgação** — monitorar taxas de abandono (`quiz_abandon`), compartilhamento (`result_share`) e conclusões (`quiz_complete`).

## Issues reais restantes no GitHub

- #1 Revisão técnica e gramatical de perguntas e ideologias
- #3 Integrar links de afiliados Amazon em cada ideologia
- #5 Melhorar a geração e cópia do card de resultado
- #6 Configurar Meta Tags dinâmicas para compartilhamento
