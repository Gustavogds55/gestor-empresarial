# Gestor Empresarial

Sistema de gestão empresarial com foco em MEI (Microempreendedor Individual), desenvolvido com Node.js, Nuxt.js e MySQL.

## 🚀 Tecnologias

### Backend
- **Node.js** + Express.js
- **MySQL** + Prisma ORM
- **JWT** para autenticação
- **Swagger** para documentação da API
- **Bcrypt** para criptografia de senhas

### Frontend
- **Nuxt.js** (Vue.js framework)
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **Composition API** do Vue 3

## 📋 Funcionalidades

### ✅ Implementadas
- **Sistema de autenticação** completo (login/registro)
- **API RESTful** com documentação Swagger
- **Layout de login centralizado** e responsivo
- **Validação de formulários** customizada
- **Dashboard** administrativo básico
- **17 casos de teste** automatizados com Playwright

### 🔄 Em Desenvolvimento
- CRUD de notas fiscais
- Gestão de produtos e estoque
- Relatórios financeiros
- Sistema de permissões

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd gestor-empresarial
```

### 2. Configure o Backend
```bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais MySQL

# Execute as migrações
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
```

### 3. Configure o Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api-docs

## 🔐 Testando o Sistema

### 1. Registrar Usuário
Use o Swagger UI ou Postman para registrar:
```json
POST /api/auth/registrar
{
  "nome": "Admin",
  "email": "admin@empresa.com",
  "senha": "123456",
  "perfil": "admin"
}
```

### 2. Fazer Login
Use as credenciais no frontend ou API:
```json
POST /api/auth/login
{
  "email": "admin@empresa.com",
  "senha": "123456"
}
```

## 🔐 Sistema de Login

Tela de login moderna e centralizada com:

- **Card centralizado** com design elegante
- **Validação em tempo real** de campos
- **Estados de loading** durante autenticação
- **Layout responsivo** para todos os dispositivos
- **Feedback visual** para erros e sucessos

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/registrar` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/verificar` - Verificar token

### Notas Fiscais (Protegidas)
- `GET /api/notas-fiscais` - Listar todas
- `POST /api/notas-fiscais` - Criar nova
- `GET /api/notas-fiscais/:id` - Buscar por ID
- `PUT /api/notas-fiscais/:id` - Atualizar
- `DELETE /api/notas-fiscais/:id` - Deletar

## 🗄️ Estrutura do Banco

### Tabela: usuarios
- id, nome, email, senha, perfil, ativo, createdAt, updatedAt

### Tabela: notas_fiscais
- id, numero, tipo, valor, data, fornecedor, cliente, observacoes, createdAt, updatedAt

## 🎨 Interface

- **Design moderno** com tons de azul
- **Login centralizado** com card elegante
- **Dashboard administrativo** com navegação
- **Validação em tempo real** nos formulários
- **Totalmente responsivo** para mobile e desktop

## 🧪 Testes Automatizados

- **17 casos de teste** implementados com Playwright
- **Cobertura completa** do sistema de login
- **Testes de validação, autenticação e responsividade**
- **Execução local** com feedback detalhado

### Executar Testes
```bash
# Iniciar serviços manualmente
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev -- --port 3001  # Terminal 2

# Executar testes
npm test
```

## 📝 Próximos Passos

1. **Dashboard** - Implementar métricas e gráficos
2. **Calendário MEI** - Mover para o dashboard pós-login
3. **CRUD de notas fiscais** - Interface completa no frontend
4. **Gestão de produtos** e controle de estoque
5. **Relatórios financeiros** com visualizações
6. **Sistema de permissões** por perfil de usuário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.