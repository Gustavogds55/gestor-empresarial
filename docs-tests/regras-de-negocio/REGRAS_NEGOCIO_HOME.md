# Regras de Negócio - Tela Home

## 🏠 LAYOUT E NAVEGAÇÃO

### RN-HOME-001: Estrutura da Tela
- **Descrição**: Layout principal da tela Home
- **Regras**:
  - Sidebar fixa com 256px de largura
  - Conteúdo principal ocupa espaço restante
  - Header com título "Home" e informações do usuário
  - Grid responsivo: 1 coluna (mobile) / 3 colunas (desktop)

### RN-HOME-002: Sidebar de Navegação
- **Descrição**: Menu lateral de navegação
- **Regras**:
  - Logo "Gestor Empresarial" no topo
  - Menu com 4 itens: Home, Compras, Vendas, Relatórios
  - Item ativo destacado em azul
  - Hover effects nos itens inativos
  - Navegação funcional entre seções

### RN-HOME-003: Header Principal
- **Descrição**: Cabeçalho da tela
- **Regras**:
  - Título "Home" à esquerda
  - Informações do usuário à direita
  - Avatar com inicial do nome
  - Nome e perfil do usuário
  - Botão "Sair" para logout

## 📅 CALENDÁRIO DE DESPESAS

### RN-HOME-004: Estrutura do Calendário
- **Descrição**: Layout e organização do calendário
- **Regras**:
  - Título "Calendário de despesas"
  - Subtítulo com total do mês atual
  - Navegação mensal (botões anterior/próximo)
  - Grid 7x6 para dias da semana
  - Legenda explicativa (Hoje/Obrigações)

### RN-HOME-005: Navegação Mensal
- **Descrição**: Controles de navegação entre meses
- **Regras**:
  - Botões seta esquerda/direita
  - Exibição do mês e ano atual
  - Navegação ilimitada (passado/futuro)
  - Manutenção dos dados ao navegar
  - Atualização do total de despesas

### RN-HOME-006: Indicadores Visuais dos Dias
- **Descrição**: Estados visuais dos dias no calendário
- **Regras**:
  - Dia atual: fundo azul + texto branco
  - Dias com despesas: fundo vermelho claro + ponto vermelho
  - Dias vazios: fundo branco + hover cinza
  - Dias de outros meses: texto cinza claro
  - Badge numérico para múltiplas despesas

### RN-HOME-007: Interação com Dias
- **Descrição**: Comportamento ao clicar nos dias
- **Regras**:
  - Apenas dias do mês atual são clicáveis
  - Dia vazio: abre modal "Nova Despesa"
  - Dia com despesas: abre modal "Despesas do Dia"
  - Cursor pointer apenas em dias clicáveis
  - Feedback visual no hover

### RN-HOME-008: Total de Despesas do Mês
- **Descrição**: Exibição do valor total mensal
- **Regras**:
  - Formato: "Total do mês: R$ 1.234,56"
  - Soma todas as despesas do mês visualizado
  - Atualização automática ao adicionar/editar/excluir
  - Formatação brasileira (ponto para milhares, vírgula para decimais)

## 💰 CRUD DE DESPESAS

### RN-HOME-009: Modal Nova Despesa
- **Descrição**: Cadastro de novas despesas
- **Regras**:
  - Título: "Nova Despesa"
  - Data selecionada exibida no subtítulo
  - Campo valor obrigatório (número positivo)
  - Campo descrição opcional
  - Botões: Cancelar / Salvar
  - Validação em tempo real

### RN-HOME-010: Modal Despesas do Dia
- **Descrição**: Visualização de despesas existentes
- **Regras**:
  - Título: "Despesas do Dia"
  - Lista todas as despesas do dia
  - Cada despesa em card individual
  - Botões: Editar / Excluir por despesa
  - Botão "+ Nova Despesa" no final
  - Botão "Fechar" para sair

### RN-HOME-011: Edição de Despesas
- **Descrição**: Alteração de despesas existentes
- **Regras**:
  - Título: "Editar Despesa"
  - Formulário preenchido com dados atuais
  - Mesmas validações do cadastro
  - Botões: Cancelar / Atualizar
  - Atualização imediata na interface

### RN-HOME-012: Exclusão de Despesas
- **Descrição**: Remoção de despesas
- **Regras**:
  - Exclusão imediata (sem confirmação)
  - Remoção instantânea do modal
  - Atualização automática do calendário
  - Atualização do total do mês
  - Modal de sucesso após exclusão

### RN-HOME-013: Persistência de Dados
- **Descrição**: Armazenamento das despesas
- **Regras**:
  - localStorage como repositório
  - Estrutura: ano-mês como chave
  - Salvamento automático após cada operação
  - Carregamento automático ao iniciar
  - Dados de exemplo para demonstração

## 🏠 CARD DESPESAS DE HOJE

### RN-HOME-014: Estrutura do Card
- **Descrição**: Layout do card lateral
- **Regras**:
  - Título: "Despesas de Hoje"
  - Altura fixa: 224px
  - Scroll automático quando necessário
  - Máximo 2 despesas visíveis
  - Mensagem quando vazio: "Nenhuma despesa hoje"

### RN-HOME-015: Lista de Despesas
- **Descrição**: Exibição das despesas do dia atual
- **Regras**:
  - Layout horizontal: descrição + valor
  - Cards compactos (padding reduzido)
  - Apenas despesas do dia atual
  - Atualização em tempo real
  - Formatação de valores em reais

### RN-HOME-016: Responsividade
- **Descrição**: Adaptação para diferentes telas
- **Regras**:
  - Desktop: grid 1/3 + 2/3
  - Tablet: reorganização automática
  - Mobile: coluna única
  - Sidebar responsiva
  - Calendário mantém usabilidade

## 🎯 AÇÕES RÁPIDAS

### RN-HOME-017: Card Ações Rápidas
- **Descrição**: Botões de acesso rápido com navegação
- **Regras**:
  - Título: "Ações Rápidas"
  - 3 botões: Nova Compra, Nova Venda, Relatórios Mensais
  - Ícones coloridos apropriados
  - Hover effects
  - Nova Compra: navega para tela Compras
  - Nova Venda: navega para tela Vendas
  - Relatórios Mensais: navega para tela Relatórios

## 🔔 MODAIS E FEEDBACK

### RN-HOME-018: Comportamento dos Modais
- **Descrição**: Padrões gerais dos modais
- **Regras**:
  - Fechamento ao clicar fora (backdrop)
  - Botão X no header
  - Overlay escuro (50% opacidade)
  - Não fechar ao clicar no conteúdo
  - ESC para fechar (futuro)

### RN-HOME-019: Modal de Sucesso
- **Descrição**: Feedback de ações realizadas
- **Regras**:
  - Ícone check verde
  - Mensagens específicas por ação
  - Auto-fechamento em 2 segundos
  - Pode ser fechado clicando fora
  - Animação de entrada suave

### RN-HOME-020: Validações de Formulário
- **Descrição**: Regras de validação
- **Regras**:
  - Valor obrigatório e positivo
  - Descrição opcional (máximo 255 caracteres)
  - Feedback visual em tempo real
  - Botão salvar desabilitado se inválido
  - Mensagens de erro claras

## 📊 MÉTRICAS E CÁLCULOS

### RN-HOME-021: Cálculo do Total Mensal
- **Descrição**: Soma das despesas do mês
- **Regras**:
  - Soma todas as despesas do mês visualizado
  - Recálculo automático após mudanças
  - Consideração apenas do mês/ano atual do calendário
  - Formatação em reais brasileiros
  - Valor zero quando sem despesas

### RN-HOME-022: Dados de Exemplo
- **Descrição**: Despesas pré-cadastradas para demonstração
- **Regras**:
  - Janeiro 2024 com 5 despesas
  - Valores realistas (R$ 45,30 a R$ 250,00)
  - Categorias variadas
  - Descrições explicativas
  - Total de R$ 695,80

## 🎨 INTERFACE E UX

### RN-HOME-023: Tema Visual
- **Descrição**: Padrões visuais da interface
- **Regras**:
  - Tema azul predominante
  - Gradientes suaves de fundo
  - Cards com backdrop blur
  - Sombras e bordas elegantes
  - Transições suaves (300ms)

### RN-HOME-024: Estados de Interação
- **Descrição**: Feedback visual de interações
- **Regras**:
  - Hover effects em elementos clicáveis
  - Estados de foco visíveis
  - Loading states em operações
  - Cursor pointer em clicáveis
  - Feedback imediato em ações

---

## 📝 **Resumo das Regras**
- **Layout**: 8 regras (RN-HOME-001 a RN-HOME-008)
- **CRUD Despesas**: 5 regras (RN-HOME-009 a RN-HOME-013)
- **Cards Laterais**: 4 regras (RN-HOME-014 a RN-HOME-017)
- **Modais**: 3 regras (RN-HOME-018 a RN-HOME-020)
- **Métricas**: 2 regras (RN-HOME-021 a RN-HOME-022)
- **Interface**: 2 regras (RN-HOME-023 a RN-HOME-024)

**Total: 24 regras de negócio para a tela Home**