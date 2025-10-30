# Casos de Teste - Tela de Login

## CT-LOGIN-001: Validação de Email Obrigatório
**Cenário**: Tentar submeter formulário com email vazio
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Deixar campo email vazio
  2. Clicar fora do campo (blur)
  3. Tentar submeter formulário
- **Resultado Esperado**: 
  - Mensagem "Campo obrigatório" abaixo do email
  - Formulário não enviado

## CT-LOGIN-002: Validação de Formato de Email
**Cenário**: Inserir email com formato inválido
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Digitar "email-inválido" no campo email
  2. Clicar fora do campo (blur)
- **Resultado Esperado**: 
  - Mensagem "Email inválido" abaixo do campo
- **Dados de Teste**:
  - "email-sem-arroba"
  - "email@"
  - "@dominio.com"
  - "email@dominio"

## CT-LOGIN-003: Validação de Email Válido
**Cenário**: Inserir email com formato válido
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Digitar "usuario@empresa.com" no campo email
  2. Clicar fora do campo (blur)
- **Resultado Esperado**: 
  - Nenhuma mensagem de erro
  - Campo com borda normal

## CT-LOGIN-004: Validação de Senha Obrigatória
**Cenário**: Tentar submeter formulário com senha vazia
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Preencher email válido
  2. Deixar campo senha vazio
  3. Clicar fora do campo senha (blur)
  4. Tentar submeter formulário
- **Resultado Esperado**: 
  - Mensagem "Campo obrigatório" abaixo da senha
  - Formulário não enviado

## CT-LOGIN-005: Validação em Tempo Real
**Cenário**: Corrigir erro durante digitação
- **Pré-condições**: Campo com erro exibido
- **Passos**:
  1. Digitar email inválido e gerar erro
  2. Corrigir email para formato válido
- **Resultado Esperado**: 
  - Erro removido automaticamente durante digitação

## CT-LOGIN-006: Login com Credenciais Válidas
**Cenário**: Fazer login com usuário existente
- **Pré-condições**: 
  - Usuário "admin@empresa.com" cadastrado
  - Backend rodando
- **Passos**:
  1. Digitar "admin@empresa.com" no email
  2. Digitar "123456" na senha
  3. Clicar em "Entrar"
- **Resultado Esperado**: 
  - Botão mostra "Entrando..." com spinner
  - Token salvo no localStorage
  - Dados do usuário salvos no localStorage
  - Evento de login emitido
  - Redirecionamento para dashboard

## CT-LOGIN-007: Login com Credenciais Inválidas
**Cenário**: Tentar login com credenciais incorretas
- **Pré-condições**: Backend rodando
- **Passos**:
  1. Digitar "usuario@inexistente.com" no email
  2. Digitar "senha-errada" na senha
  3. Clicar em "Entrar"
- **Resultado Esperado**: 
  - Mensagem de erro exibida
  - Botão volta ao estado normal
  - Campos permanecem preenchidos

## CT-LOGIN-008: Estado de Loading
**Cenário**: Verificar estado durante requisição
- **Pré-condições**: Backend rodando (pode simular delay)
- **Passos**:
  1. Preencher credenciais válidas
  2. Clicar em "Entrar"
  3. Observar estado do botão
- **Resultado Esperado**: 
  - Botão desabilitado
  - Texto muda para "Entrando..."
  - Spinner visível
  - Campos não editáveis durante loading

## CT-LOGIN-009: Erro de Conexão
**Cenário**: Tentar login com backend offline
- **Pré-condições**: Backend parado
- **Passos**:
  1. Preencher credenciais válidas
  2. Clicar em "Entrar"
- **Resultado Esperado**: 
  - Mensagem "Erro ao fazer login"
  - Botão volta ao estado normal

## CT-LOGIN-010: Layout Responsivo
**Cenário**: Verificar layout em diferentes resoluções
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Redimensionar janela para mobile (320px)
  2. Redimensionar para tablet (768px)
  3. Redimensionar para desktop (1024px+)
- **Resultado Esperado**: 
  - Sidebar mantém largura fixa
  - Calendário se adapta (grid responsivo)
  - Formulário permanece legível

## CT-LOGIN-011: Calendário MEI - Mês Atual
**Cenário**: Verificar exibição do calendário
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Observar cabeçalho do calendário
  2. Verificar destaque do dia atual
  3. Verificar dias com obrigações marcados
- **Resultado Esperado**: 
  - Mês/ano atual exibidos
  - Dia atual destacado em azul
  - Dias com DAS marcados com ponto vermelho

## CT-LOGIN-012: Calendário MEI - Obrigações do Mês
**Cenário**: Verificar lista de obrigações
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Observar seção "Obrigações do Mês"
  2. Verificar cards de obrigações
  3. Clicar em "Gerar DAS" (se disponível)
- **Resultado Esperado**: 
  - Obrigações do mês atual listadas
  - Cards com cores diferentes (DAS=vermelho, ANUAL=azul)
  - Link "Gerar DAS" abre em nova aba

## CT-LOGIN-013: Interação com Calendário
**Cenário**: Clicar em dias com obrigações
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Identificar dia com obrigação (ponto vermelho)
  2. Clicar no dia
- **Resultado Esperado**: 
  - Console.log com informações do dia
  - (Futuro: modal com detalhes)

## CT-LOGIN-014: Acessibilidade
**Cenário**: Navegação por teclado
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Usar Tab para navegar entre campos
  2. Usar Enter para submeter formulário
  3. Verificar foco visível
- **Resultado Esperado**: 
  - Navegação fluida por teclado
  - Foco visível em todos elementos
  - Enter submete formulário

## CT-LOGIN-015: Persistência de Dados
**Cenário**: Verificar armazenamento local
- **Pré-condições**: Login realizado com sucesso
- **Passos**:
  1. Fazer login válido
  2. Verificar localStorage no DevTools
  3. Recarregar página
- **Resultado Esperado**: 
  - Token presente no localStorage
  - Dados do usuário no localStorage
  - Sessão mantida após reload

## CT-LOGIN-016: Limpeza de Erros
**Cenário**: Limpar mensagens de erro
- **Pré-condições**: Formulário com erros exibidos
- **Passos**:
  1. Gerar erro de validação
  2. Corrigir o campo
  3. Gerar erro de login
  4. Tentar novo login
- **Resultado Esperado**: 
  - Erros de validação removidos ao corrigir
  - Erro de login removido ao tentar novamente

## CT-LOGIN-017: Múltiplas Tentativas
**Cenário**: Várias tentativas de login
- **Pré-condições**: Backend rodando
- **Passos**:
  1. Tentar login com credenciais inválidas
  2. Corrigir e tentar novamente
  3. Repetir processo 3 vezes
- **Resultado Esperado**: 
  - Cada tentativa funciona independentemente
  - Sem travamento da interface
  - Estados corretos a cada tentativa

## CT-LOGIN-018: Email Excede Limite
**Cenário**: Validar limite de 50 caracteres no email
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Digitar email com mais de 50 caracteres
  2. Fazer blur no campo
- **Resultado Esperado**: 
  - Mensagem "Email deve ter no máximo 50 caracteres"
  - Campo não aceita mais de 50 caracteres
  - Validação em tempo real

## CT-LOGIN-019: Senha Excede Limite
**Cenário**: Validar limite de 8 caracteres na senha
- **Pré-condições**: Tela de login carregada
- **Passos**:
  1. Preencher email válido
  2. Digitar senha com mais de 8 caracteres
  3. Fazer blur no campo senha
- **Resultado Esperado**: 
  - Mensagem "Senha deve ter no máximo 8 caracteres"
  - Campo não aceita mais de 8 caracteres
  - Validação em tempo real

## CT-LOGIN-020: Links Externos Funcionando
**Cenário**: Verificar funcionalidade dos links externos
- **Pré-condições**: Tela de login carregada com obrigações DAS
- **Passos**:
  1. Localizar links "Gerar DAS"
  2. Verificar atributos do link
  3. Validar URL de destino
- **Resultado Esperado**: 
  - Link tem target="_blank"
  - URL aponta para site da Receita Federal
  - Link é válido (formato https)