# Guia de Configuração - Sas Barber

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 14+ instalado (ou Docker)
- Git instalado
- NPM ou Yarn

### 1. Clone o Repositório

```bash
git clone https://github.com/luccavalentin/SasBarber.git
cd SasBarber
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com base no `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DATABASE_URL=postgresql://sasbarber:sasbarber_dev@localhost:5432/sasbarber_db
PORT=3001
NODE_ENV=development
JWT_SECRET=seu-secret-jwt-aqui
REDIS_URL=redis://localhost:6379
```

### 3. Configuração do Banco de Dados

#### Opção 1: PostgreSQL Local

Crie o banco de dados:

```sql
CREATE DATABASE sasbarber_db;
CREATE USER sasbarber WITH PASSWORD 'sasbarber_dev';
GRANT ALL PRIVILEGES ON DATABASE sasbarber_db TO sasbarber;
```

#### Opção 2: Docker (Recomendado)

```bash
# Na raiz do projeto
docker-compose up -d postgres redis
```

### 4. Executar Migrações

```bash
cd backend
npm run migration:run
```

### 5. Iniciar o Backend

```bash
cd backend
npm run start:dev
```

O backend estará rodando em `http://localhost:3001`
A documentação Swagger estará em `http://localhost:3001/api/docs`

### 6. Configuração do Frontend

```bash
cd frontend
npm install
```

Crie um arquivo `.env.local` na pasta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 7. Iniciar o Frontend

```bash
cd frontend
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🐳 Docker (Alternativa Completa)

Para rodar tudo com Docker:

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso iniciará:
- PostgreSQL na porta 5432
- Redis na porta 6379
- Backend na porta 3001
- Frontend na porta 3000

## 📦 Estrutura do Projeto

```
sasbarber/
├── backend/              # API NestJS
│   ├── src/
│   │   ├── modules/     # Módulos da aplicação
│   │   │   ├── auth/    # Autenticação
│   │   │   ├── users/   # Usuários
│   │   │   ├── barber-shops/  # Barbearias
│   │   │   ├── appointments/  # Agendamentos
│   │   │   ├── clients/       # Clientes
│   │   │   ├── services/      # Serviços
│   │   │   ├── inventory/     # Estoque
│   │   │   ├── sales/         # Vendas
│   │   │   ├── financial/     # Financeiro
│   │   │   ├── support/       # Suporte
│   │   │   └── master/        # Painel Master
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── frontend/             # Next.js
│   ├── app/             # App Router
│   ├── components/      # Componentes React
│   ├── lib/            # Utilitários
│   └── package.json
└── docker-compose.yml
```

## 🔑 Primeiro Usuário Admin

Para criar o primeiro usuário master/admin, você precisará:

1. Executar um script de seed (a ser implementado)
2. Ou usar a API diretamente via Swagger em `/api/docs`

## 🧪 Testes

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 📝 Scripts Disponíveis

### Root
```bash
npm run install:all    # Instala dependências de frontend e backend
npm run dev           # Roda frontend e backend em paralelo
npm run docker:up     # Inicia containers Docker
npm run docker:down   # Para containers Docker
```

### Backend
```bash
npm run start:dev     # Desenvolvimento com hot reload
npm run build         # Build de produção
npm run start:prod    # Produção
npm run migration:generate  # Gerar migration
npm run migration:run       # Executar migrations
```

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Produção
```

## 🔒 Segurança

- **NUNCA** commite arquivos `.env` no Git
- Altere o `JWT_SECRET` em produção
- Use senhas fortes para o banco de dados
- Configure HTTPS em produção

## 📚 Documentação da API

Acesse `http://localhost:3001/api/docs` para ver a documentação interativa do Swagger.

## 🆘 Problemas Comuns

### Erro de conexão com o banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco de dados existe

### Porta já em uso
- Altere a porta no `.env` (backend) ou `next.config.js` (frontend)

### Erro de permissão no Docker
- Use `sudo` (Linux/Mac) ou execute como administrador (Windows)

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub:
https://github.com/luccavalentin/SasBarber/issues

