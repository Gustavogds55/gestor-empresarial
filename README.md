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
- **Calendário de obrigações MEI** interativo
- **Validação de formulários** customizada
- **Layout responsivo** com sidebar
- **Links diretos** para geração de DAS
- **Dashboard** administrativo

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

## 📅 Calendário MEI

O sistema inclui um calendário interativo com:

- **Obrigações mensais**: DAS com vencimento dia 20
- **Obrigações anuais**: DASN-SIMEI (março-maio)
- **Links diretos**: Para geração de DAS no portal da Receita
- **Atualização automática**: Baseada na data atual
- **Indicadores visuais**: Dias com obrigações destacados

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
- **Layout sidebar** para login
- **Calendário interativo** na área principal
- **Validação em tempo real** nos formulários
- **Responsivo** para mobile e desktop

## 📝 Próximos Passos

1. Implementar CRUD completo de notas fiscais no frontend
2. Adicionar gestão de produtos e estoque
3. Criar relatórios financeiros
4. Implementar sistema de permissões por perfil
5. Adicionar notificações de vencimentos
6. Integração com APIs da Receita Federal

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.