# Gestor Empresarial

Sistema de gestão de despesas com foco em MEI (Microempreendedor Individual), desenvolvido com Node.js, Nuxt.js e MySQL.

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
- **Dashboard** com sidebar de navegação (Home, Compras, Vendas, Relatórios)
- **Calendário de despesas** interativo com total mensal
- **CRUD completo de despesas** (criar, visualizar, editar, excluir)
- **Persistência local** com localStorage
- **Despesas de hoje** com scroll e altura fixa
- **Ações rápidas** com navegação funcional
- **Modais de sucesso** para feedback do usuário
- **21 casos de teste E2E** automatizados com Playwright

### 🔄 Em Desenvolvimento
- Gestão de produtos e estoque
- Relatórios financeiros
- Sistema de permissões
- Backup/restore de dados

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

## 📅 Calendário de Despesas

Sistema completo de gestão de despesas com:

- **Calendário interativo** para visualização mensal
- **Indicadores visuais** para dias com despesas
- **Modal de cadastro** - clique em dias vazios
- **Modal de visualização** - clique em dias com despesas
- **Edição inline** - botão de editar em cada despesa
- **Exclusão imediata** - remoção instantânea do modal
- **Persistência automática** - dados salvos no localStorage
- **Navegação mensal** - botões para navegar entre meses
- **Contadores de despesas** - badges com quantidade por dia

## 🏠 Dashboard

Interface organizada com navegação:

- **Sidebar de navegação** - Home, Compras, Vendas, Relatórios
- **Despesas de hoje** - lista com scroll e altura fixa
- **Ações rápidas** - navegação funcional entre seções
- **Calendário principal** - com total de despesas do mês
- **Design responsivo** - adaptável a diferentes telas
- **Telas placeholder** - Compras, Vendas e Relatórios preparadas

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
- **Dashboard com sidebar** - navegação organizada
- **Calendário interativo** com total mensal
- **Modais intuitivos** para gestão de despesas
- **Ações rápidas funcionais** - navegação integrada
- **Validação em tempo real** nos formulários
- **Totalmente responsivo** para mobile e desktop
- **Feedback visual** com modais de sucesso

## 🧪 Testes Automatizados

- **21 casos de teste E2E** implementados com Playwright
- **Cobertura de 87,5%** das regras de negócio (21 de 24 regras)
- **Testes de login, dashboard, calendário, CRUD e responsividade**
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

1. **Relatórios financeiros** - Gráficos e análises de despesas
2. **Categorias personalizadas** - Permitir criar categorias próprias
3. **Despesas recorrentes** - Automatizar despesas mensais
4. **Exportação de dados** - PDF/Excel dos relatórios
5. **Backup na nuvem** - Sincronização de dados
6. **Gestão de produtos** e controle de estoque
7. **Sistema de permissões** por perfil de usuário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.