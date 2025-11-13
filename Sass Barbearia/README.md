# Sas Barber - Sistema SaaS de Gestão para Barbearias

Sistema completo de gestão para barbearias com foco em agendamentos, vendas, controle financeiro, estoque, suporte e escalabilidade.

## 📋 Visão Geral

Sistema SaaS multi-tenant com três níveis de acesso:
- **Administrador Master** (dono do SaaS) - painel global/CRM
- **Barbearia** (assinante) - painel individual
- **Cliente final** - interface de agendamento e pagamento

## 🏗️ Arquitetura

- **Frontend**: Next.js 14+ (React, TypeScript, Tailwind CSS)
- **Backend**: NestJS (Node.js, TypeScript)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT/OAuth2
- **Tempo Real**: WebSocket (Socket.io)
- **Deploy**: Docker, AWS (ou similar)

## 📁 Estrutura do Projeto

```
sasbarber/
├── frontend/           # Aplicação Next.js
├── backend/            # API NestJS
├── shared/             # Código compartilhado
├── docker-compose.yml  # Orquestração de containers
└── README.md
```

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- Docker (opcional)

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📦 Módulos Principais

### 1. Landing Page (Pública)
- Headline e proposta de valor
- Demonstração visual
- Depoimentos
- Gateway de pagamento (Stripe/KiwiFy)
- Área de login

### 2. Painel do Barbeiro
- Dashboard com indicadores
- Agendamentos (calendário)
- Gestão de clientes
- Serviços e preços
- Controle de estoque
- Vendas e comissões
- Fluxo financeiro
- Suporte integrado

### 3. Painel do Cliente
- Agendamento online
- Histórico de serviços
- Pagamento online
- Avaliações

### 4. Painel Master (Admin)
- Gestão de barbearias
- CRM e comunicação
- Controle de licenças
- Relatórios globais

## 🎯 Roadmap

### MVP (Prioridade Alta)
- [x] Estrutura do projeto
- [ ] Landing Page
- [ ] Painel do barbeiro básico
- [ ] Sistema de autenticação
- [ ] Agendamentos
- [ ] Pagamentos e assinaturas
- [ ] Painel Master básico

### Fase 2 (Prioridade Média)
- [ ] Fluxo financeiro completo
- [ ] Relatórios avançados
- [ ] Integração WhatsApp Business
- [ ] Notificações automatizadas

### Fase 3 (Prioridade Baixa)
- [ ] Apps mobile (React Native)
- [ ] Integração Open Finance
- [ ] White label completo
- [ ] API pública

## 📝 Licença

Proprietário - Todos os direitos reservados

## 👤 Autor

**Lucca Valentin Santana**
- Email: luccasantana88@gmail.com
- GitHub: [@luccavalentin](https://github.com/luccavalentin)
