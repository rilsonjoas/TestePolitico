# Guia de Deploy

## Visão Geral

Este guia cobre as opções de deploy para o Teste Político 8 Valores, incluindo Vercel (atual), Docker e auto-hospedagem.

## Índice

- [Deploy no Vercel](#deploy-no-vercel)
- [Deploy com Docker](#deploy-com-docker)
- [Auto-Hospedagem](#auto-hospedagem)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Otimização de Performance](#otimização-de-performance)

---

## Deploy no Vercel

### Configuração Atual

A aplicação está atualmente em produção na **Vercel** em [testepolitico.com.br](https://testepolitico.com.br).

### Passos para Deploy

1. **Conectar Repositório**
   ```bash
   # Fazer push para o GitHub
   git push origin main
   ```

2. **Configurar Projeto**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `out`
   - Install Command: `pnpm install`

3. **Variáveis de Ambiente**
   Adicionar no Dashboard da Vercel → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_GA_ID=G-HWZHQ1Z1HP
   ```

4. **Domínio Personalizado**
   - Adicionar domínio: `testepolitico.com.br`
   - Configurar registros DNS (fornecidos pela Vercel)

### Deploys Automáticos

- **Produção**: Pushes para branch `main`
- **Preview**: Pull requests geram deploys de preview automaticamente

---

## Deploy com Docker

### Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- 512MB RAM mínimo
- 1GB espaço em disco

### Início Rápido

1. **Construir a Imagem**
   ```bash
   docker compose build
   ```

2. **Executar o Container**
   ```bash
   docker compose up -d
   ```

3. **Acessar a Aplicação**
   ```
   http://localhost:3000
   ```

4. **Ver Logs**
   ```bash
   docker compose logs -f web
   ```

5. **Parar o Container**
   ```bash
   docker compose down
   ```

### Arquitetura Docker

O Dockerfile usa **multi-stage build** para otimização:

```
┌─────────────────────────────────────────┐
│ Stage 1: deps (node:20-alpine)          │
│ - Instalar pnpm                         │
│ - Instalar dependências                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Stage 2: builder (node:20-alpine)       │
│ - Copiar dependências                   │
│ - Build da aplicação Next.js            │
│ - Gerar export estático                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Stage 3: runner (nginx:alpine)          │
│ - Copiar arquivos buildados             │
│ - Configurar nginx                      │
│ - Servir arquivos estáticos             │
└─────────────────────────────────────────┘
```

### Tamanho da Imagem

- **Meta**: < 50MB
- **Real**: ~30-40MB (nginx:alpine + arquivos estáticos)

### Argumentos de Build

Passar variáveis de ambiente durante o build:

```bash
docker build \
  --build-arg NEXT_PUBLIC_GA_ID=G-HWZHQ1Z1HP \
  -t teste-politico:latest .
```

### Deploy em Produção

#### Usando Docker Compose

```yaml
# docker-compose.prod.yml
services:
  web:
    image: teste-politico:latest
    restart: always
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

```bash
docker compose -f docker-compose.prod.yml up -d
```

#### Usando Docker Swarm

```bash
# Inicializar swarm
docker swarm init

# Deploy do stack
docker stack deploy -c docker-compose.prod.yml teste-politico

# Escalar serviço
docker service scale teste-politico_web=3

# Ver serviços
docker service ls
```

#### Usando Kubernetes

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: teste-politico
spec:
  replicas: 3
  selector:
    matchLabels:
      app: teste-politico
  template:
    metadata:
      labels:
        app: teste-politico
    spec:
      containers:
      - name: web
        image: teste-politico:latest
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 10
```

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

## Auto-Hospedagem

### Opção 1: VPS com Docker

**Provedores Recomendados**: DigitalOcean, Linode, Vultr, Contabo

1. **Configurar VPS**
   ```bash
   # SSH no servidor
   ssh root@seu-servidor-ip

   # Instalar Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Instalar Docker Compose
   apt-get install docker-compose-plugin
   ```

2. **Deploy da Aplicação**
   ```bash
   # Clonar repositório
   git clone https://github.com/rilsonjoas/TestePolitico.git
   cd TestePolitico

   # Criar .env.local
   echo "NEXT_PUBLIC_GA_ID=G-HWZHQ1Z1HP" > .env.local

   # Build e executar
   docker compose up -d
   ```

3. **Configurar Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name testepolitico.com.br;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Configurar SSL com Let's Encrypt**
   ```bash
   apt-get install certbot python3-certbot-nginx
   certbot --nginx -d testepolitico.com.br
   ```

### Opção 2: Hospedagem Estática

Como a aplicação usa export estático, você pode hospedar em:

- **Netlify**: Arrastar e soltar pasta `out/`
- **Cloudflare Pages**: Conectar repositório GitHub
- **AWS S3 + CloudFront**: Upload de `out/` para S3
- **GitHub Pages**: Push de `out/` para branch `gh-pages`

---

## Variáveis de Ambiente

### Variáveis Obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_GA_ID` | ID de Medição do Google Analytics 4 | `G-HWZHQ1Z1HP` |

### Variáveis Opcionais

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Modo de ambiente | `production` |
| `NEXT_TELEMETRY_DISABLED` | Desabilitar telemetria do Next.js | `1` |

### Definindo Variáveis de Ambiente

**Vercel**:
```
Dashboard → Settings → Environment Variables
```

**Docker**:
```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-HWZHQ1Z1HP
```

**Docker Compose**:
```yaml
environment:
  - NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
```

---

## Otimização de Performance

### Configuração do Nginx

O `nginx.conf` incluído fornece:

1. **Compressão Gzip**
   - Reduz tamanho dos arquivos em ~70%
   - Habilitado para todos arquivos baseados em texto

2. **Cache de Assets Estáticos**
   - Cache de 1 ano para imagens, fontes, CSS, JS
   - Headers de cache imutável

3. **Headers de Segurança**
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin

4. **Roteamento SPA**
   - Fallback para `index.html` para todas as rotas
   - Tratamento adequado de roteamento client-side

### Integração com CDN

Para melhor performance global, use uma CDN:

**Cloudflare**:
1. Adicionar site ao Cloudflare
2. Atualizar nameservers DNS
3. Habilitar Auto Minify (JS, CSS, HTML)
4. Habilitar compressão Brotli
5. Configurar regras de cache

**AWS CloudFront**:
1. Criar distribuição
2. Apontar para origem (S3 ou servidor)
3. Configurar comportamentos de cache
4. Habilitar compressão

### Metas de Performance

| Métrica | Meta | Atual |
|---------|------|-------|
| Lighthouse Performance | ≥ 90 | ~95 |
| Lighthouse Accessibility | ≥ 95 | ~98 |
| Lighthouse Best Practices | ≥ 95 | ~100 |
| Lighthouse SEO | ≥ 95 | ~100 |
| First Contentful Paint | < 1.5s | ~0.8s |
| Time to Interactive | < 3.0s | ~1.2s |
| Tamanho Total do Bundle | < 200KB | ~187KB |

---

## Monitoramento e Health Checks

### Endpoint de Health Check

A aplicação fornece um endpoint de health check:

```bash
curl http://localhost:3000/health
# Resposta: healthy
```

### Health Checks do Docker

Configurado no `docker-compose.yml`:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
  interval: 30s
  timeout: 3s
  retries: 3
  start_period: 5s
```

### Ferramentas de Monitoramento

**Recomendadas**:
- **Monitoramento de Uptime**: UptimeRobot, Pingdom
- **Rastreamento de Erros**: Sentry
- **Analytics**: Google Analytics 4 (já integrado)
- **Performance**: Lighthouse CI (configurado)

---

## Solução de Problemas

### Problemas com Docker

**Container não inicia**:
```bash
# Verificar logs
docker compose logs web

# Verificar status do container
docker ps -a

# Reiniciar container
docker compose restart web
```

**Porta já em uso**:
```bash
# Mudar porta no docker-compose.yml
ports:
  - "8080:80"  # Usar porta 8080 ao invés
```

**Build falha**:
```bash
# Limpar cache do Docker
docker system prune -a

# Rebuild sem cache
docker compose build --no-cache
```

### Problemas com Nginx

**404 nas rotas**:
- Certifique-se que a diretiva `try_files` inclui fallback para `index.html`
- Verifique logs de erro do nginx: `docker compose logs web`

**Arquivos estáticos não carregam**:
- Verifique se os arquivos estão em `/usr/share/nginx/html`
- Verifique logs de acesso do nginx

### Problemas de Performance

**Tempos de carregamento lentos**:
1. Habilitar compressão gzip/brotli
2. Usar CDN para assets estáticos
3. Otimizar imagens (formato WebP)
4. Habilitar cache do navegador

**Alto uso de memória**:
1. Limitar memória do container: `mem_limit: 512m`
2. Monitorar com: `docker stats`

---

## Backup e Recuperação

### Estratégia de Backup

Como a aplicação é stateless (sem banco de dados), fazer backup apenas de:

1. **Código Fonte**: Repositório Git (já com backup no GitHub)
2. **Variáveis de Ambiente**: Armazenar `.env.local` com segurança
3. **Dados de Analytics**: Exportar do dashboard do GA4

### Recuperação de Desastres

**Rebuild completo**:
```bash
# Clonar repositório
git clone https://github.com/rilsonjoas/TestePolitico.git

# Restaurar variáveis de ambiente
cp .env.local.backup .env.local

# Deploy
docker compose up -d
```

**Recovery Time Objective (RTO)**: < 15 minutos

---

## Melhores Práticas de Segurança

1. **Manter Docker Atualizado**
   ```bash
   apt-get update && apt-get upgrade docker-ce
   ```

2. **Usar Usuário Não-Root** (já configurado no Dockerfile)

3. **Escanear Vulnerabilidades**
   ```bash
   docker scan teste-politico:latest
   ```

4. **Habilitar Firewall**
   ```bash
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw enable
   ```

5. **Atualizações Regulares**
   ```bash
   # Atualizar dependências
   pnpm update

   # Rebuild da imagem
   docker compose build
   ```

---

## Suporte

Para problemas de deploy:
- **GitHub Issues**: [rilsonjoas/TestePolitico](https://github.com/rilsonjoas/TestePolitico/issues)
- **Email**: rilsonjoas@gmail.com
