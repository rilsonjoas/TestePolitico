# Documentação de Analytics

## Integração com Google Analytics 4

Este documento descreve a implementação de analytics para o Teste Político 8 Valores.

## Visão Geral

A aplicação usa **Google Analytics 4 (GA4)** para rastrear engajamento de usuários, taxas de conclusão do quiz e distribuição de ideologias. Todo o rastreamento é type-safe, consciente de privacidade e ativo apenas em produção.

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` com seu ID de Medição do GA4:

```bash
NEXT_PUBLIC_GA_ID=G-HWZHQ1Z1HP
```

### 2. Configuração da Propriedade GA4

A propriedade GA4 está configurada com:
- **Nome da Propriedade**: Teste Político 8 Valores
- **ID de Medição**: `G-HWZHQ1Z1HP`
- **Fluxo de Dados**: Web (testepolitico.com.br)

### 3. Configuração no Vercel

Para ativar o Analytics no Vercel:

1. Acesse o **Dashboard do Vercel**
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-HWZHQ1Z1HP`
   - **Environments**: Marque Production, Preview e Development
5. Clique em **Save**
6. **Redeploy** o projeto (aba Deployments → ... → Redeploy)

## Eventos Rastreados

### Eventos do Quiz

#### `quiz_start`
Disparado quando um usuário inicia o quiz.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: "Quiz Started"

**Localização**: `src/app/quiz/page.tsx` (ao montar o componente)

---

#### `quiz_complete`
Disparado quando um usuário completa todas as questões.

**Parâmetros**:
- `event_category`: "conversion"
- `event_label`: Nome da ideologia (ex: "Social Democracia")
- `ideology`: Nome da ideologia
- `value`: 1

**Localização**: `src/app/results/ResultsClient.tsx` (ao carregar resultados)

---

#### `quiz_abandon`
Disparado quando um usuário sai do quiz antes de completar.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: "Abandonado na questão X"
- `question_number`: Número da questão onde abandonou
- `total_questions`: Total de questões (70)
- `completion_percentage`: Porcentagem do quiz completada

**Localização**: `src/app/quiz/page.tsx` (ao desmontar o componente)

---

#### `question_answer`
Disparado para cada questão respondida.

**Parâmetros**:
- `event_category`: "engagement"
- `question_number`: Número da questão (1-70)
- `answer_value`: Multiplicador da resposta (-1.0 a 1.0)
- `non_interaction`: true (não afeta taxa de rejeição)

**Localização**: `src/app/quiz/page.tsx` (ao selecionar resposta)

---

### Eventos de Resultados

#### `result_view`
Disparado quando a página de resultados é visualizada.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: Nome da ideologia
- `ideology`: Nome da ideologia
- `economic_score`: Score do eixo econômico (0-100)
- `diplomatic_score`: Score do eixo diplomático (0-100)
- `government_score`: Score do eixo governamental (0-100)
- `society_score`: Score do eixo social (0-100)

**Localização**: `src/app/results/ResultsClient.tsx`

---

#### `result_share`
Disparado quando o usuário compartilha os resultados.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: Método de compartilhamento (ex: "twitter", "facebook", "copy_link")
- `method`: Método de compartilhamento

**Localização**: `src/components/ShareResults.tsx`

---

#### `result_download`
Disparado quando o usuário baixa a imagem do resultado.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: Formato da imagem (ex: "png")
- `format`: Formato da imagem

**Localização**: `src/components/ShareResults.tsx`

---

### Eventos de Interface

#### `theme_toggle`
Disparado quando o usuário muda o tema.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: Valor do tema ("light", "dark", "system")
- `theme`: Valor do tema

**Localização**: `src/components/ThemeToggleButton.tsx`

---

#### `external_link_click`
Disparado quando o usuário clica em links externos.

**Parâmetros**:
- `event_category`: "engagement"
- `event_label`: Label do link ou URL
- `url`: URL externa
- `outbound`: true

**Localização**: Qualquer lugar usando `uiEvents.externalLinkClick()`

---

### Eventos de Navegação

#### `page_view`
Disparado em cada mudança de rota (navegação SPA).

**Parâmetros**:
- `page_path`: Caminho atual
- `page_title`: Título da página (opcional)

**Localização**: `src/components/RouteTracker.tsx` (automático)

---

## Detalhes de Implementação

### Biblioteca de Analytics

A biblioteca de analytics está localizada em `src/lib/analytics.ts` e fornece:

1. **Rastreamento type-safe**: Todos os eventos são fortemente tipados
2. **Logs em desenvolvimento**: Eventos são logados no console em desenvolvimento
3. **Rastreamento apenas em produção**: GA4 só carrega em produção
4. **Tratamento de erros**: Fallback gracioso se o GA4 falhar ao carregar

### Exemplo de Uso

```typescript
import { quizEvents, resultEvents, uiEvents } from '@/lib/analytics';

// Rastrear início do quiz
quizEvents.start();

// Rastrear conclusão do quiz
quizEvents.complete('Social Democracia');

// Rastrear visualização de resultado
resultEvents.view('Social Democracia', {
  e: '75.5',
  d: '60.2',
  g: '80.0',
  s: '55.3'
});

// Rastrear mudança de tema
uiEvents.themeToggle('dark');
```

### Componente RouteTracker

O componente `RouteTracker` rastreia automaticamente toda navegação SPA:

```typescript
// Em src/app/layout.tsx
import { RouteTracker } from '@/components/RouteTracker';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RouteTracker />
        {children}
      </body>
    </html>
  );
}
```

## Métricas Principais para Monitorar

### Métricas de Engajamento

1. **Taxa de Conclusão do Quiz**
   - Fórmula: `quiz_complete / quiz_start`
   - Meta: > 60%

2. **Progresso Médio do Quiz**
   - Rastrear via eventos `quiz_abandon`
   - Monitorar parâmetro `completion_percentage`

3. **Engajamento por Questão**
   - Rastrear distribuição de respostas via `question_answer`
   - Identificar questões com muitas respostas neutras

### Métricas de Conversão

1. **Distribuição de Ideologias**
   - Rastrear via `quiz_complete` e `result_view`
   - Monitorar parâmetro `ideology`

2. **Taxa de Compartilhamento**
   - Fórmula: `result_share / result_view`
   - Meta: > 20%

3. **Taxa de Download**
   - Fórmula: `result_download / result_view`
   - Meta: > 10%

### Métricas de Experiência do Usuário

1. **Preferência de Tema**
   - Rastrear via `theme_toggle`
   - Monitorar adoção de modo escuro vs claro

2. **Cliques em Links Externos**
   - Rastrear via `external_link_click`
   - Monitorar engajamento com links de livros/políticos

## Considerações de Privacidade

1. **Sem Coleta de PII**: Não coletamos informações pessoalmente identificáveis
2. **Rastreamento Anônimo**: Todos os eventos são anônimos
3. **Consentimento de Cookies**: Banner de consentimento implementado
4. **Conformidade com LGPD**: Segue leis brasileiras de proteção de dados

## Configuração do Dashboard GA4

### Relatórios Personalizados Recomendados

1. **Funil do Quiz**
   - Início → Progresso → Conclusão
   - Identificar pontos de abandono

2. **Distribuição de Ideologias**
   - Gráfico de barras dos resultados de ideologia
   - Filtrar por intervalo de datas

3. **Visão Geral de Engajamento**
   - Taxa de conclusão do quiz
   - Tempo médio no quiz
   - Taxas de compartilhamento/download

### Dimensões Personalizadas

Considere adicionar estas dimensões personalizadas no GA4:

- `ideology`: Ideologia correspondente do usuário
- `completion_percentage`: Progresso do quiz
- `theme`: Preferência de tema do usuário

## Solução de Problemas

### Eventos Não Aparecem no GA4

1. **Verifique a variável de ambiente**: Certifique-se que `NEXT_PUBLIC_GA_ID` está definida
2. **Verifique modo de produção**: GA4 só rastreia em produção
3. **Verifique console do navegador**: Procure por logs `[GA4 Event]` em desenvolvimento
4. **Verifique propriedade GA4**: Certifique-se que o ID de Medição está correto

### Teste em Desenvolvimento

Para testar eventos em desenvolvimento, verifique o console do navegador para logs:

```
[GA4 Event] quiz_start { event_category: 'engagement', event_label: 'Quiz Started' }
```

## Recursos

- [Documentação GA4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Referência de Eventos](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Melhores Práticas](https://support.google.com/analytics/answer/9267735)
