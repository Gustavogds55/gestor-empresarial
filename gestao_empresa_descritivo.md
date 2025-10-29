# Sistema de Gestão Empresarial

## Descrição Geral
Este projeto tem como objetivo desenvolver um sistema de gestão para empresas, permitindo o controle de entradas e saídas de notas fiscais, gerenciamento de produtos, estoque e funcionalidades financeiras, com possibilidade de expansão futura.

O sistema será dividido em **backend**, **frontend** e **banco de dados**, permitindo uma arquitetura modular e escalável.

---

## Pilha Tecnológica

**Backend:**
- Node.js + Express.js
- MySQL como banco de dados
- Prisma ou TypeORM como ORM
- TypeScript (opcional)

**Frontend:**
- React.js + Vite
- Tailwind CSS para estilização
- Axios para comunicação com a API

**Banco de Dados:**
- MySQL
- Estrutura inicial para notas fiscais e produtos

---

## Funcionalidades Iniciais

### Notas Fiscais
- Cadastro de notas fiscais de entrada e saída
- Visualização do histórico de notas
- Filtros por data, fornecedor/cliente
- Edição e exclusão de notas

### Produtos e Estoque
- Cadastro de produtos
- Controle de quantidade disponível
- Alertas de baixo estoque

### Financeiro (Futuro)
- Controle de receitas e despesas
- Relatórios financeiros
- Dashboard com gráficos de desempenho

### Usuários e Permissões (Futuro)
- Login e logout
- Perfis de usuário (admin, financeiro, vendas)

---

## Estrutura do Projeto

```
/backend
  /src
    /controllers
    /models
    /routes
    /services
  app.ts
  prisma/schema.prisma

/frontend
  /src
    /components
    /pages
    /services (API calls)
  main.tsx
```

---

## Próximos Passos
1. Criar o backend com Node.js + Express e conexão com MySQL
2. Criar tabela inicial de notas fiscais
3. Desenvolver rotas CRUD para notas fiscais
4. Implementar frontend básico para cadastro e listagem de notas fiscais
5. Expandir para produtos, estoque e financeiro

