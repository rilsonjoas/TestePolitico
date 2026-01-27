# Teste Político 8 Valores

[![Build Status](https://github.com/rilsonjoas/TestePolitico/workflows/CI/badge.svg)](https://github.com/rilsonjoas/TestePolitico/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://testepolitico.com.br)

Um quiz político interativo que avalia seu posicionamento em 8 valores políticos através de 70 questões, identificando sua ideologia política com base em suas respostas.

**[🎯 Acesse o quiz aqui](https://testepolitico.com.br/)**

---

## 📋 Sobre o Projeto

O Teste Político 8 Valores é uma aplicação web que analisa o posicionamento político do usuário em 4 eixos (8 valores):

| Eixo | Valores |
|------|---------|
| **Econômico** | Igualdade ⟷ Mercado |
| **Diplomático** | Nação ⟷ Mundo |
| **Governo** | Liberdade ⟷ Autoridade |
| **Social** | Tradição ⟷ Progresso |

### 🎁 Ao final do quiz, você recebe:

- ✅ Seu posicionamento percentual em cada eixo
- ✅ A ideologia política mais próxima do seu perfil
- ✅ Políticos e livros de referência relacionados
- ✅ Imagem compartilhável dos seus resultados
- ✅ Comparação com resultados de amigos

---

## 🚀 Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[html2canvas](https://html2canvas.hertzen.com/)** - Geração de imagens
- **[Vitest](https://vitest.dev/)** - Testes unitários
- **[Google Analytics 4](https://analytics.google.com/)** - Analytics
- **[Docker](https://www.docker.com/)** - Containerização

---

## ✨ Funcionalidades

### Quiz Interativo
- 📝 70 questões sobre temas políticos, econômicos e sociais
- 📊 Escala de 5 pontos (Discordo Totalmente → Concordo Totalmente)
- 💾 Progresso salvo automaticamente
- 🔄 Navegação entre questões

### Resultados Detalhados
- 📈 Gráficos visuais dos seus scores
- 🎯 Ideologia mais próxima do seu perfil
- 👥 Políticos e pensadores relacionados
- 📚 Livros recomendados para aprofundamento
- 😂 Modo "Zueira" opcional

### Compartilhamento
- 📸 Geração de imagem dos resultados
- 🔗 Link compartilhável
- 👫 Comparação com resultados de amigos
- 📱 Otimizado para redes sociais

### Interface
- 🌓 Tema claro/escuro/sistema
- 📱 Design responsivo (mobile e desktop)
- ♿ Acessível (WCAG 2.1)
- 🇧🇷 Interface em Português
- ⚡ Performance otimizada (Lighthouse 95+)

---

## 🛠️ Executando Localmente

### Pré-requisitos

- Node.js 20+
- pnpm 10+

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/rilsonjoas/TestePolitico.git
cd TestePolitico

# Instalar dependências
pnpm install

# Criar arquivo de variáveis de ambiente
cp .env.local.example .env.local

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Iniciar servidor de desenvolvimento
pnpm build        # Build de produção
pnpm start        # Iniciar servidor de produção
pnpm lint         # Executar linter
pnpm test         # Executar testes
pnpm test:watch   # Executar testes em modo watch
pnpm test:ui      # Executar testes com UI
```

---

## 🐳 Docker

### Build e Execução

```bash
# Build da imagem
docker compose build

# Executar container
docker compose up -d

# Acessar aplicação
http://localhost:3000

# Ver logs
docker compose logs -f web

# Parar container
docker compose down
```

### Características do Docker

- ✅ Multi-stage build otimizado
- ✅ Imagem final ~30-40MB (nginx:alpine)
- ✅ Gzip compression habilitado
- ✅ Security headers configurados
- ✅ Health check endpoint
- ✅ Cache de assets estáticos

📖 **[Ver documentação completa de deploy](docs/DEPLOYMENT.md)**

---

## 📊 Analytics

A aplicação usa Google Analytics 4 para rastrear:

- 📈 Taxa de conclusão do quiz
- 🎯 Distribuição de ideologias
- 📤 Taxa de compartilhamento
- 🎨 Preferência de tema
- 📱 Dispositivos e navegadores

### Configurar Analytics

1. Obter ID de Medição do GA4
2. Adicionar ao `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Deploy!

📖 **[Ver documentação completa de analytics](docs/ANALYTICS.md)**

---

## 🧪 Testes

O projeto possui cobertura de testes para lógica crítica:

```bash
# Executar todos os testes
pnpm test

# Testes em modo watch
pnpm test:watch

# Testes com UI
pnpm test:ui

# Coverage
pnpm test:coverage
```

### Cobertura Atual

- ✅ 41 testes passando
- ✅ Lógica de cálculo (100%)
- ✅ Funções utilitárias (100%)
- ✅ Componentes principais (parcial)

---

## 📁 Estrutura do Projeto

```
TestePolitico/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página inicial
│   │   ├── quiz/               # Página do quiz
│   │   ├── results/            # Página de resultados
│   │   └── ideologia/          # Páginas de ideologias
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes shadcn/ui
│   │   ├── Logo.tsx
│   │   ├── ShareResults.tsx
│   │   ├── ThemeToggleButton.tsx
│   │   └── RouteTracker.tsx    # Analytics tracker
│   ├── lib/
│   │   ├── data.ts             # Questões e ideologias
│   │   ├── utils.ts            # Funções utilitárias
│   │   ├── analytics.ts        # Google Analytics 4
│   │   └── __tests__/          # Testes unitários
│   └── styles/
│       └── globals.css         # Estilos globais
├── public/                     # Assets estáticos
├── docs/                       # Documentação
│   ├── ANALYTICS.md
│   └── DEPLOYMENT.md
├── Dockerfile                  # Multi-stage build
├── docker-compose.yml          # Orquestração Docker
├── nginx.conf                  # Configuração Nginx
├── vitest.config.ts            # Configuração de testes
└── next.config.ts              # Configuração Next.js
```

---

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rilsonjoas/TestePolitico)

1. Conectar repositório GitHub
2. Adicionar variável de ambiente: `NEXT_PUBLIC_GA_ID`
3. Deploy automático!

### Docker

```bash
docker compose up -d
```

### Outras Opções

- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages
- VPS com Docker

📖 **[Ver guia completo de deploy](docs/DEPLOYMENT.md)**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes

- Escreva testes para novas funcionalidades
- Mantenha o código formatado (`pnpm lint`)
- Atualize a documentação se necessário
- Siga os padrões de commit convencionais

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Rilson Joas**

- GitHub: [@rilsonjoas](https://github.com/rilsonjoas)
- Email: rilsonjoas@gmail.com
- Website: [testepolitico.com.br](https://testepolitico.com.br)

---

## 🙏 Agradecimentos

- Inspirado no [8values](https://8values.github.io/)
- Comunidade Next.js
- Todos os contribuidores

---

## 📈 Status do Projeto

- ✅ **v1.0** - Quiz funcional com 70 questões
- ✅ **v1.1** - Compartilhamento de resultados
- ✅ **v1.2** - Comparação com amigos
- ✅ **v1.3** - Testes unitários e CI/CD
- ✅ **v1.4** - Google Analytics 4
- ✅ **v1.5** - Docker support
- 🚧 **v2.0** - Otimizações de SEO e Performance (em breve)

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão?

- 🐛 [Abrir Issue](https://github.com/rilsonjoas/TestePolitico/issues)
- 💬 [Discussões](https://github.com/rilsonjoas/TestePolitico/discussions)
- 📧 Email: rilsonjoas@gmail.com

---

<div align="center">

**Feito com ❤️ no Brasil**

[⬆ Voltar ao topo](#teste-político-8-valores)

</div>
