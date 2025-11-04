# Casos de Teste - Tela Home

## 🏠 LAYOUT E NAVEGAÇÃO

### CT-HOME-001: Verificar Estrutura da Tela
**Cenário**: Validar layout principal da tela Home
- **Pré-condições**: Usuário logado e na tela Home
- **Passos**:
  1. Verificar presença da sidebar
  2. Verificar largura da sidebar (256px)
  3. Verificar área de conteúdo principal
  4. Verificar responsividade do grid
- **Resultado Esperado**: 
  - Sidebar fixa visível
  - Conteúdo ocupa espaço restante
  - Layout responsivo funcional
- **Status**: ✅ Implementado (CT-HOME-001)

### CT-HOME-002: Navegação pela Sidebar
**Cenário**: Testar navegação entre seções
- **Pré-condições**: Usuário na tela Home
- **Passos**:
  1. Clicar em "Compras" na sidebar
  2. Verificar mudança de tela
  3. Clicar em "Vendas" na sidebar
  4. Verificar mudança de tela
  5. Clicar em "Relatórios" na sidebar
  6. Verificar mudança de tela
  7. Clicar em "Home" na sidebar
- **Resultado Esperado**: 
  - Navegação funcional entre todas as seções
  - Item ativo destacado em azul
  - Título do header atualizado
- **Status**: ✅ Implementado (CT-HOME-002)

### CT-HOME-003: Informações do Header
**Cenário**: Validar dados do usuário no header
- **Pré-condições**: Usuário logado
- **Passos**:
  1. Verificar título "Home" no header
  2. Verificar avatar com inicial do nome
  3. Verificar nome do usuário
  4. Verificar perfil do usuário
  5. Verificar botão "Sair"
- **Resultado Esperado**: 
  - Todas as informações visíveis e corretas
  - Avatar com primeira letra do nome
- **Status**: ✅ Implementado (CT-HOME-003)

### CT-HOME-003b: Logout com Sucesso
**Cenário**: Testar funcionalidade de logout
- **Pré-condições**: Usuário logado
- **Passos**:
  1. Clicar no botão "Sair"
  2. Verificar redirecionamento para login
  3. Verificar elementos da Home não visíveis
- **Resultado Esperado**: 
  - Logout realizado com sucesso
  - Redirecionamento para tela de login
- **Status**: ✅ Implementado (CT-HOME-003b)

## 📅 CALENDÁRIO DE DESPESAS

### CT-HOME-004: Estrutura do Calendário
**Cenário**: Verificar layout do calendário
- **Pré-condições**: Tela Home carregada
- **Passos**:
  1. Verificar título "Calendário de despesas"
  2. Verificar subtítulo com total do mês
  3. Verificar botões de navegação mensal
  4. Verificar grid 7x6 dos dias
  5. Verificar legenda (Hoje/Obrigações)
- **Resultado Esperado**: 
  - Todos os elementos visíveis
  - Total do mês formatado corretamente
- **Status**: ✅ Implementado (CT-HOME-004)

### CT-HOME-005: Navegação Entre Meses
**Cenário**: Testar controles de navegação mensal
- **Pré-condições**: Calendário carregado
- **Passos**:
  1. Clicar no botão "próximo mês"
  2. Verificar mudança do mês/ano
  3. Verificar atualização do total
  4. Clicar no botão "mês anterior"
  5. Verificar retorno ao mês original
- **Resultado Esperado**: 
  - Navegação fluida entre meses
  - Total atualizado automaticamente
  - Dados mantidos ao navegar
- **Status**: ✅ Implementado (CT-HOME-005)

### CT-HOME-006: Indicadores Visuais dos Dias
**Cenário**: Validar estados visuais dos dias
- **Pré-condições**: Calendário com dados de exemplo
- **Passos**:
  1. Verificar destaque do dia atual (azul)
  2. Verificar dias com despesas (ponto vermelho)
  3. Verificar dias vazios (fundo branco)
  4. Verificar dias de outros meses (cinza)
  5. Verificar badges para múltiplas despesas
- **Resultado Esperado**: 
  - Indicadores visuais corretos
  - Diferenciação clara entre estados
- **Status**: ✅ Implementado (CT-HOME-006)

### CT-HOME-007: Interação com Dias do Calendário
**Cenário**: Testar cliques nos dias
- **Pré-condições**: Calendário carregado
- **Passos**:
  1. Clicar em dia vazio do mês atual
  2. Verificar abertura do modal "Nova Despesa"
  3. Fechar modal
  4. Clicar em dia com despesas
  5. Verificar abertura do modal "Despesas do Dia"
  6. Tentar clicar em dia de outro mês
- **Resultado Esperado**: 
  - Modais corretos para cada tipo de dia
  - Dias de outros meses não clicáveis
- **Status**: ✅ Implementado (CT-HOME-007)

## 💰 CRUD DE DESPESAS

### CT-HOME-008: Cálculo do Total Mensal
**Cenário**: Verificar soma das despesas
- **Pré-condições**: Mês com despesas cadastradas
- **Passos**:
  1. Verificar total inicial do mês
  2. Adicionar nova despesa
  3. Verificar atualização do total
  4. Adicionar segunda despesa
  5. Verificar soma correta
- **Resultado Esperado**: 
  - Cálculo automático correto
  - Formatação em reais brasileiros
  - Atualização em tempo real
- **Status**: ✅ Implementado (CT-HOME-008)

### CT-HOME-009: Modal Nova Despesa
**Cenário**: Cadastrar nova despesa
- **Pré-condições**: Modal "Nova Despesa" aberto
- **Passos**:
  1. Verificar título "Nova Despesa"
  2. Verificar data selecionada no subtítulo
  3. Preencher valor obrigatório
  4. Preencher descrição opcional
  5. Clicar em "Salvar"
- **Resultado Esperado**: 
  - Despesa salva com sucesso
  - Modal de sucesso exibido
  - Calendário atualizado
- **Status**: ✅ Implementado (CT-HOME-009)

### CT-HOME-010: Modal Despesas do Dia
**Cenário**: Visualizar despesas existentes
- **Pré-condições**: Dia com despesas selecionado
- **Passos**:
  1. Verificar título "Despesas do Dia"
  2. Verificar lista de despesas
  3. Verificar botões Editar/Excluir
  4. Verificar botão "+ Nova Despesa"
  5. Verificar botão "Fechar"
- **Resultado Esperado**: 
  - Todas as despesas listadas
  - Botões de ação funcionais
- **Status**: ✅ Implementado (CT-HOME-010)

### CT-HOME-011: Edição de Despesas
**Cenário**: Editar despesa existente
- **Pré-condições**: Modal com despesas aberto
- **Passos**:
  1. Clicar no botão "Editar" de uma despesa
  2. Verificar título "Editar Despesa"
  3. Verificar campos preenchidos
  4. Alterar valor e descrição
  5. Clicar em "Atualizar"
- **Resultado Esperado**: 
  - Formulário preenchido com dados atuais
  - Alterações salvas com sucesso
  - Interface atualizada imediatamente
- **Status**: ✅ Implementado (CT-HOME-011)

### CT-HOME-012: Exclusão de Despesas
**Cenário**: Excluir despesa
- **Pré-condições**: Modal com despesas aberto
- **Passos**:
  1. Clicar no botão "Excluir" de uma despesa
  2. Verificar remoção imediata do modal
  3. Verificar atualização do calendário
  4. Verificar modal de sucesso
- **Resultado Esperado**: 
  - Exclusão sem confirmação adicional
  - Remoção instantânea da interface
  - Total do mês atualizado
- **Status**: ✅ Implementado (CT-HOME-012)

## 🏠 CARDS LATERAIS

### CT-HOME-013: Persistência de Dados
**Cenário**: Validar armazenamento no localStorage
- **Pré-condições**: Despesas cadastradas
- **Passos**:
  1. Cadastrar despesa
  2. Verificar salvamento no localStorage
  3. Verificar estrutura ano-mês como chave
  4. Recarregar página
  5. Verificar carregamento automático
- **Resultado Esperado**: 
  - Dados salvos automaticamente
  - Estrutura JSON correta
  - Carregamento ao iniciar
- **Status**: ✅ Implementado (CT-HOME-013)

### CT-HOME-014: Card Despesas de Hoje
**Cenário**: Verificar despesas do dia atual
- **Pré-condições**: Tela Home carregada
- **Passos**:
  1. Verificar título "Despesas de Hoje"
  2. Verificar altura fixa do card (224px)
  3. Adicionar despesas para hoje
  4. Verificar scroll automático
  5. Verificar máximo 2 despesas visíveis
- **Resultado Esperado**: 
  - Card com altura fixa
  - Scroll quando necessário
  - Apenas despesas de hoje
- **Status**: ✅ Implementado (CT-HOME-014)

### CT-HOME-015: Lista de Despesas
**Cenário**: Exibição das despesas do dia atual
- **Pré-condições**: Despesas cadastradas para hoje
- **Passos**:
  1. Verificar layout horizontal
  2. Verificar formatação de valores
  3. Editar despesa
  4. Verificar atualização em tempo real
- **Resultado Esperado**: 
  - Cards compactos
  - Valores em reais
  - Atualização instantânea
- **Status**: ✅ Implementado (CT-HOME-015)

### CT-HOME-016: Responsividade
**Cenário**: Adaptação para diferentes telas
- **Pré-condições**: Tela Home carregada
- **Passos**:
  1. Testar em desktop (1280px)
  2. Testar em tablet (768px)
  3. Testar em mobile (375px)
  4. Verificar usabilidade do calendário
- **Resultado Esperado**: 
  - Layout adaptável
  - Sidebar responsiva
  - Calendário mantém usabilidade
- **Status**: ✅ Implementado (CT-HOME-016)

### CT-HOME-017: Ações Rápidas Funcionais
**Cenário**: Testar navegação das ações rápidas
- **Pré-condições**: Card "Ações Rápidas" visível
- **Passos**:
  1. Clicar em "Nova Compra"
  2. Verificar navegação para tela Compras
  3. Voltar para Home
  4. Clicar em "Nova Venda"
  5. Verificar navegação para tela Vendas
  6. Voltar para Home
  7. Clicar em "Relatórios Mensais"
  8. Verificar navegação para tela Relatórios
- **Resultado Esperado**: 
  - Navegação funcional para todas as telas
  - Botões com hover effects
- **Status**: ✅ Implementado (CT-HOME-017)

## 🔔 MODAIS E FEEDBACK

### CT-HOME-018: Comportamento dos Modais
**Cenário**: Testar padrões gerais dos modais
- **Pré-condições**: Modal aberto
- **Passos**:
  1. Clicar fora do modal (backdrop)
  2. Verificar fechamento
  3. Abrir modal novamente
  4. Clicar no botão X
  5. Verificar fechamento
  6. Abrir modal e clicar no conteúdo
  7. Verificar que não fecha
- **Resultado Esperado**: 
  - Fecha ao clicar fora
  - Fecha com botão X
  - Não fecha ao clicar no conteúdo
- **Status**: ✅ Implementado (CT-HOME-018)

### CT-HOME-019: Modal de Sucesso
**Cenário**: Verificar feedback de ações
- **Pré-condições**: Ação realizada (criar/editar/excluir)
- **Passos**:
  1. Verificar ícone check verde
  2. Verificar mensagem específica da ação
  3. Aguardar auto-fechamento (2s)
  4. Realizar nova ação
  5. Clicar fora do modal de sucesso
- **Resultado Esperado**: 
  - Modal com visual correto
  - Mensagens específicas por ação
  - Auto-fechamento funcional
- **Status**: ✅ Implementado (CT-HOME-019)

### CT-HOME-020: Validações de Formulário
**Cenário**: Testar validações em tempo real
- **Pré-condições**: Modal de despesa aberto
- **Passos**:
  1. Tentar salvar sem valor
  2. Verificar validação
  3. Inserir valor negativo
  4. Verificar validação
  5. Inserir descrição muito longa (>255 chars)
  6. Verificar validação
  7. Preencher corretamente
  8. Verificar botão habilitado
- **Resultado Esperado**: 
  - Validações em tempo real
  - Botão desabilitado quando inválido
  - Mensagens de erro claras
- **Status**: ✅ Implementado (CT-HOME-020)

## 📊 MÉTRICAS E RESPONSIVIDADE

### CT-HOME-021: Cálculo e Formatação do Total Mensal
**Cenário**: Verificar soma e formatação das despesas
- **Pré-condições**: Mês com despesas cadastradas
- **Passos**:
  1. Verificar total inicial do mês
  2. Adicionar primeira despesa (R$ 100,50)
  3. Verificar atualização do total
  4. Adicionar segunda despesa (R$ 250,75)
  5. Verificar soma correta (R$ 351,25)
  6. Verificar formatação brasileira
- **Resultado Esperado**: 
  - Cálculo automático correto
  - Formatação em reais brasileiros
  - Atualização em tempo real
- **Status**: ✅ Implementado (CT-HOME-021)

---

## 📝 **Resumo dos Casos de Teste**
- **Layout e Navegação**: 4 casos (CT-HOME-001 a CT-HOME-003b) - ✅ 100% implementados
- **Calendário**: 4 casos (CT-HOME-004 a CT-HOME-007) - ✅ 100% implementados
- **CRUD Despesas**: 5 casos (CT-HOME-008 a CT-HOME-012) - ✅ 100% implementados
- **Persistência e Cards**: 3 casos (CT-HOME-013 a CT-HOME-015) - ✅ 100% implementados
- **Interface**: 2 casos (CT-HOME-016 a CT-HOME-017) - ✅ 100% implementados
- **Modais**: 3 casos (CT-HOME-018 a CT-HOME-020) - ✅ 100% implementados
- **Métricas**: 1 caso (CT-HOME-021) - ✅ 100% implementado

**Total: 21 casos de teste implementados para a tela Home**
**Cobertura: 87,5% das regras de negócio (21 de 24 regras)**

### Regras Não Testadas
- **RN-HOME-022**: Dados de Exemplo - Removido dos testes
- **RN-HOME-023**: Tema Visual - Difícil de testar automaticamente
- **RN-HOME-024**: Estados de Interação - Difícil de testar automaticamente