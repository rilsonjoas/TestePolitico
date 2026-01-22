# Teste Político 8 Valores

Um quiz político interativo que avalia seu posicionamento em 8 valores políticos através de 70 questões, identificando sua ideologia política com base em suas respostas.

**[Acesse o quiz aqui](https://teste-politico.vercel.app/)**

## Sobre o Projeto

O Teste Político 8 Valores é uma aplicação web que analisa o posicionamento político do usuário em 4 eixos (8 valores):

| Eixo | Valores |
|------|---------|
| **Econômico** | Igualdade vs Mercado |
| **Diplomático** | Nação vs Mundo |
| **Governo** | Liberdade vs Autoridade |
| **Social** | Tradição vs Progresso |

Ao final do quiz, você recebe:
- Seu posicionamento percentual em cada eixo
- A ideologia política mais próxima do seu perfil
- Políticos e livros de referência relacionados à sua ideologia

## Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI
- **[html2canvas](https://html2canvas.hertzen.com/)** - Geração de imagem dos resultados

## Funcionalidades

- Quiz com 70 questões sobre temas políticos, econômicos e sociais
- Escala de 5 pontos (Discordo Totalmente → Concordo Totalmente)
- Tema claro/escuro
- Geração de imagem do resultado para compartilhamento
- Design responsivo (mobile e desktop)
- Interface em Português

## Executando Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/teste-politico.git
cd teste-politico

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter |

## Estrutura do Projeto

```
src/
├── app/                 # Páginas (App Router)
│   ├── page.tsx         # Home - apresentação dos 8 valores
│   ├── instructions/    # Instruções do quiz
│   ├── quiz/            # Página do quiz
│   └── results/         # Página de resultados
├── components/          # Componentes React
│   └── ui/              # Componentes shadcn/ui
├── lib/
│   ├── data.ts          # Questões e ideologias
│   └── utils.ts         # Funções utilitárias
└── hooks/               # Custom hooks
```

## Deploy

O projeto está hospedado na [Vercel](https://vercel.com). Para fazer seu próprio deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rilsonjoas/TestePolitico)

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto é open source e está disponível sob a licença MIT.
