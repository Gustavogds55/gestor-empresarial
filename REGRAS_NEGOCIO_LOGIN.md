# Regras de Negócio - Tela de Login

## RN-LOGIN-001: Validação de Email
- **Descrição**: O campo email deve ser obrigatório e ter formato válido
- **Regras**:
  - Campo não pode estar vazio
  - Deve conter formato válido (xxx@xxx.xxx)
  - Validação em tempo real (onBlur)
  - Validação durante digitação se já houver erro
- **Mensagens**:
  - Campo vazio: "Campo obrigatório"
  - Formato inválido: "Email inválido"

## RN-LOGIN-002: Validação de Senha
- **Descrição**: O campo senha deve ser obrigatório
- **Regras**:
  - Campo não pode estar vazio
  - Validação em tempo real (onBlur)
  - Validação durante digitação se já houver erro
- **Mensagens**:
  - Campo vazio: "Campo obrigatório"

## RN-LOGIN-003: Submissão do Formulário
- **Descrição**: Validações antes do envio
- **Regras**:
  - Todos os campos devem estar válidos
  - Botão desabilitado durante carregamento
  - Exibir loading durante requisição
- **Estados**:
  - Normal: "Entrar"
  - Loading: "Entrando..." + spinner

## RN-LOGIN-004: Autenticação
- **Descrição**: Processo de login na API
- **Regras**:
  - Enviar POST para /api/auth/login
  - Armazenar token no localStorage
  - Armazenar dados do usuário no localStorage
  - Emitir evento de login para componente pai
- **Tratamento de Erros**:
  - Credenciais inválidas: Exibir mensagem da API
  - Erro de rede: "Erro ao fazer login"
  - Usuário inativo: Mensagem específica

## RN-LOGIN-005: Interface Responsiva
- **Descrição**: Layout deve funcionar em diferentes dispositivos
- **Regras**:
  - Sidebar fixa de 384px (w-96)
  - Área principal flexível
  - Calendário responsivo (grid adaptativo)
  - Formulário centralizado na sidebar

## RN-LOGIN-006: Calendário MEI
- **Descrição**: Exibir obrigações MEI do mês atual
- **Regras**:
  - Mostrar mês/ano atual
  - Destacar dia atual
  - Marcar dias com obrigações
  - Exibir lista de obrigações do mês
  - Links para geração de DAS

## RN-LOGIN-007: Estados Visuais
- **Descrição**: Feedback visual para o usuário
- **Regras**:
  - Campos com erro: borda vermelha + mensagem
  - Campos válidos: borda azul no focus
  - Botão loading: desabilitado + spinner
  - Mensagem de erro geral: fundo vermelho claro

## RN-LOGIN-008: Persistência de Dados
- **Descrição**: Manter sessão do usuário
- **Regras**:
  - Token JWT no localStorage
  - Dados do usuário no localStorage
  - Verificar token válido ao carregar página
  - Limpar dados ao fazer logout