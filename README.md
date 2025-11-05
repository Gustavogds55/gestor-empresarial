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

#### **Sistema de Autenticação**
- Login centralizado com validação em tempo real
- Registro de usuários com JWT
- Persistência de sessão
- Logout funcional
- 4 casos de teste automatizados

#### **Dashboard Principal**
- Sidebar de navegação (Home, Compras, Vendas, Relatórios)
- Cards de métricas (Despesas de Hoje, Ações Rápidas)
- Interface responsiva e moderna
- Header com informações do usuário
- 4 casos de teste automatizados

#### **Calendário de Despesas**
- Calendário interativo mensal com navegação ilimitada
- Indicadores visuais e badges com quantidade por dia
- Clique em dias vazios para adicionar despesas
- Clique em dias com despesas para visualizar
- Total do mês com formatação brasileira
- 4 casos de teste automatizados

#### **CRUD de Despesas**
- **Criar**: Modal com formulário (valor + descrição)
- **Visualizar**: Lista de despesas do dia selecionado
- **Editar**: Botão de edição inline com modal
- **Excluir**: Remoção imediata sem confirmação
- Persistência automática no localStorage
- 5 casos de teste automatizados

#### **Card "Despesas de Hoje"**
- Lista compacta das despesas do dia atual
- Altura fixa (224px) com scroll automático
- Atualização em tempo real
- 2 casos de teste automatizados

#### **Modais e Feedback**
- Modal de cadastro/edição de despesas
- Modal de visualização de despesas do dia
- Modal de sucesso com auto-fechamento (2s)
- 3 casos de teste automatizados

#### **Métricas Automáticas**
- Total do mês atualiza automaticamente
- Recálculo após criar/editar/excluir
- Formatação brasileira (R$ 1.234,56)
- 2 casos de teste automatizados

### 🔄 Em Desenvolvimento
- Integração com API real (substituir localStorage)
- Categorias personalizadas de despesas
- Telas de Compras e Vendas

### 📋 Planejado
- Relatórios financeiros com gráficos
- Despesas recorrentes
- Exportação de dados (PDF/Excel)
- Backup na nuvem
- Gestão de produtos e estoque
- Sistema de permissões por perfil

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

### **Cobertura Atual**
- ✅ **21 casos de teste E2E** implementados com Playwright
- ✅ **87,5% de cobertura** das regras de negócio (21 de 24)
- ✅ Layout e navegação: 4 testes
- ✅ Calendário: 4 testes
- ✅ CRUD de despesas: 5 testes
- ✅ Persistência e cards: 3 testes
- ✅ Interface e responsividade: 2 testes
- ✅ Modais e feedback: 3 testes

### Executar Testes
```bash
# Iniciar serviços manualmente
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev -- --port 3001  # Terminal 2

# Executar testes
npm test
```

## 📈 Métricas do Projeto

- **Linhas de código**: ~1.200 (frontend)
- **Componentes**: 2 principais (Login, Dashboard)
- **Funcionalidades**: 10 implementadas
- **Testes E2E**: 21 casos automatizados
- **Cobertura**: 87,5% das regras de negócio
- **Status**: 85% completo para MVP

## 📝 Próximos Passos

### **Curto Prazo**
1. Integrar despesas com API real (substituir localStorage)
2. Adicionar categorias personalizadas
3. Implementar telas de Compras e Vendas

### **Médio Prazo**
1. Relatórios e gráficos de despesas
2. Despesas recorrentes
3. Exportação de dados (PDF/Excel)
4. Sistema de permissões

### **Longo Prazo**
1. Sincronização na nuvem
2. Backup automático
3. App mobile
4. Gestão de produtos e estoque

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.