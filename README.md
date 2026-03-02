# Teste Político 8 Valores — Case Study 🧭

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Coverage_100%25-6E9F18?logo=vitest)](https://vitest.dev/)

**🌐 Live Demo:** [testepolitico.com.br](https://testepolitico.com.br/)

Bem-vindo ao repositório do **Teste Político 8 Valores**, uma aplicação full-stack front-heavy projetada para calcular, com precisão matemática, o posicionamento ideológico de um usuário através de um quiz de 70 perguntas. 

Este projeto foi construído não apenas como uma ferramenta de entretenimento viral, mas como um laboratório prático de **Algoritmos de Recomendação**, **Manipulação de Estados Complexos no React** e **Acessibilidade (a11y)**.

---

## 📐 A Matemática por Trás do Quiz

A "mágica" deste projeto não é feita por IA generativa durante a execução, mas sim por pura Álgebra Linear. Trabalhamos com um espaço dimensional onde cada eixo político é um vetor.

### 1. O Sistema de 8 Valores (4 Eixos)
O sistema avalia o usuário em quatro espectros simultâneos (de `-100` a `100`), normalizados depois para um percentual de `0%` a `100%`:
- **Econômico** (Igualdade vs Mercado)
- **Diplomático** (Nação vs Global)
- **Governamental** (Autoridade vs Liberdade)
- **Social** (Tradição vs Progresso)

### 2. Algoritmo de Distância Euclidiana
Para determinarmos com qual político histórico (ex: de Karl Marx a Milton Friedman) ou ideologia (ex: Social Democracia vs Anarco-Capitalismo) o usuário mais se parece, aplicamos o **Teorema de Pitágoras no hiper-espaço de 4 dimensões (Distância Euclidiana)**.

```typescript
// Fórmula aplicada no core do projeto (src/lib/data.ts)
const distance = Math.sqrt(
  Math.pow(user.econ - ideology.econ, 2) +
  Math.pow(user.dipl - ideology.dipl, 2) +
  Math.pow(user.govt - ideology.govt, 2) +
  Math.pow(user.scty - ideology.scty, 2)
);
```
Quanto **menor** a distância geométrica entre as coordenadas do Usuário e as coordenadas "Hardcoded" da ideologia na Base de Dados, **maior** a afinidade. 

### 3. Normalização: O Match em Porcentagem
No mundo real, dizer que a distância entre você e JFK é "42.8" não faz sentido para o usuário leigo. Portanto, implementamos um normalizador de afinidade que entende o limite matemático máximo (o maior offset possível num cubo de 4 lados de 100 pontos):

```typescript
export function getMatchPercentage(distance: number): number {
  const maxDistance = 200; // sqrt(100^2 * 4) teórica em offset máximo cruzado
  return Math.max(0, 100 * (1 - distance / maxDistance));
}
```
Isso nos gera um selo maravilhoso de **"78% de afinidade"**, facilitando o compartilhamento e a compreensão.

---

## 🏗️ Arquitetura e Tech Stack

A escolha das ferramentas para este projeto seguiu o princípio de **"Zero-Latency & High-Usability"** (Baixa latência e alta usabilidade).

### **Next.js 15 (App Router)**
Utilizado primordialmente pelo seu suporte nativo ao SSR (Server-Side Rendering) e facilidade na injeção de Metadata dinâmica. O componente de Quiz roda quase exclusivamente como `'use client'`, garantindo que a troca de 70 perguntas ocorra sem *nenhuma recarga de página* e com transições suaves.

### **Framer Motion + Tailwind CSS**
- **Tailwind** lida com o Design System inteiro. Foram utilizadas escalas responsivas (como textos diminuindo via `text-[10px]` dinâmico em telas curtas para evitar quebra de layout de nomes grandes nas barras de resultado).
- **Framer Motion** fornece o motor estático de Layout Animations. `AnimatePresence` é usado para ejetar uma pergunta para a esquerda e inserir a próxima deslizando pela direita a cada clique do usuário.

### **Bússola Cartesiana Nativa (Sem bibliotecas)**
Um dos destaques do painel de resultados é o `<PoliticalCompass />`. Para evitar o peso gigantesco de bibliotecas engessadas como `Chart.js` ou `Recharts`, a bússola foi construída usando puramente `CSS Absolute Elements` iterados em cima do DOM do React pelo vetor `[left: X%, top: Y%]`. Isso entrega um gráfico de dispersão com custo de renderização praticamente nulo.

### **Data Structure `(src/lib/data.ts)`**
Atuando como um "NoSQL Database" pseudo-local, o TypeScript organiza toda base enciclopédica do projeto (Mais de 40 ideologias catalogadas, 70 perguntas com pesos elásticos que variam entre `5`, `10` e `20`, atreladas a autores históricos). Ao expor tipos fixos e pré-compilados, o auto-complete da IDE blinda o código contra typos em tempo de desenvolvimento.

---

## 🧑‍🦽 UI, UX e Acessibilidade (a11y)

Nós não esquecemos da acessibilidade.
O código contém tratativas de *Screen Readers* em sua base:
- **`aria-live="polite"`** encapsula as perguntas do Quiz. Quando as perguntas mudam assincronamente (clicando no botão), usuários de leitor de tela do NVDA oucrão a nova tela lida sem ter de re-focalizar o leitor manualmente.
- **Navegação 100% via Teclado**, com os botões protegidos pela tag `focus-visible:ring-4` do Tailwind, que injeta bordas visuais grossas para usuários que usam apenas a tecla `Tab`.
- **Auto-Save**: Usamos `localStorage` para prevenir que os 5 minutos dispendidos num quiz longo sejam perdidos por recargas acidentais. Há recovery do Teste on-mount no Client.

---

## 🧪 Deploy & Execução

Para testar a infraestrutura e rodar a suíte (Vitest cobrindo algoritmos, utilitários e DOM):

```bash
# Clone o rep
git clone https://github.com/rilsonjoas/TestePolitico.git
cd TestePolitico

# Instale os pacotes (Recomenda-se pnpm)
pnpm install

# Testes Unitários de Matemática Ideológica
pnpm test

# Inicie o Servidor de Desenvolvimento
pnpm dev
```
Também acompanha suporte a **Docker** com NGINX configurado e rotina de GitHub Actions em workflow (CI).

---

Feito com dedicação extrema aos detalhes de Front-end e UX.
