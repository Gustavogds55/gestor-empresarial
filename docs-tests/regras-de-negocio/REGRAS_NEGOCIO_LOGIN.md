# Regras de Negócio - Tela de Login

## RN-LOGIN-001: Validação de Email
- **Descrição**: O campo email deve ser obrigatório, ter formato válido e respeitar limite de caracteres
- **Regras**:
  - Campo não pode estar vazio
  - Máximo 50 caracteres
  - Deve conter formato válido (xxx@xxx.xxx)
  - Validação em tempo real (onBlur)
  - Validação durante digitação se já houver erro
- **Mensagens**:
  - Campo vazio: "Campo obrigatório"
  - Muito longo: "Email deve ter no máximo 50 caracteres"
  - Formato inválido: "Email inválido"

## RN-LOGIN-002: Validação de Senha
- **Descrição**: O campo senha deve ser obrigatório e respeitar limite de caracteres
- **Regras**:
  - Campo não pode estar vazio
  - Máximo 8 caracteres
  - Validação em tempo real (onBlur)
  - Validação durante digitação se já houver erro
- **Mensagens**:
  - Campo vazio: "Campo obrigatório"
  - Muito longa: "Senha deve ter no máximo 8 caracteres"

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
  - Card centralizado na tela
  - Layout responsivo para mobile/tablet/desktop
  - Formulário sempre visível e acessível



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

## RN-LOGIN-009: Validação de Entrada Extrema
- **Descrição**: Lidar com entradas de tamanho extremo
- **Regras**:
  - Emails longos (>254 caracteres) devem ser tratados graciosamente
  - Senhas longas (>1000 caracteres) não devem travar o sistema
  - Interface deve permanecer responsíva
  - Validações não devem causar travamentos

## RN-LOGIN-010: Validação em Tempo Real Completa
- **Descrição**: Erros devem ser removidos automaticamente durante correção
- **Regras**:
  - Email: remover erro ao corrigir formato inválido
  - Senha: remover erro ao corrigir tamanho inválido
  - Validação durante digitação (não apenas blur)
  - Feedback visual imediato
  - Melhorar experiência do usuário

