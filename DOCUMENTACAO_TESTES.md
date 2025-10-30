# Documentação de Testes - Gestor Empresarial

## 📋 Resumo dos Testes

### **Cobertura Total: 19 Casos de Teste**

## 🧪 Categorias de Teste

### **1. Validações de Campos (CT-001 a CT-005 + CT-018, CT-019)**
- **CT-001**: Email obrigatório
- **CT-002**: Formato de email inválido  
- **CT-003**: Email válido
- **CT-004**: Senha obrigatória
- **CT-005**: Validação em tempo real
- **CT-018**: Email excede limite (>50 caracteres)
- **CT-019**: Senha excede limite (>8 caracteres)

### **2. Autenticação (CT-006 a CT-008)**
- **CT-006**: Login com credenciais válidas
- **CT-007a**: Email inválido
- **CT-007b**: Senha inválida  
- **CT-008**: Estado de loading

### **3. Layout e Responsividade (CT-010)**
- **CT-010**: Layout em diferentes resoluções

### **4. Calendário MEI (CT-011, CT-012, CT-020)**
- **CT-011**: Exibição do mês atual
- **CT-012**: Lista de obrigações
- **CT-020**: Links externos funcionando

### **5. Acessibilidade (CT-014)**
- **CT-014**: Navegação por teclado

### **6. Persistência e Estados (CT-015 a CT-017)**
- **CT-015**: Dados no localStorage
- **CT-016**: Limpeza de erros
- **CT-017**: Múltiplas tentativas

## 🛠️ Tecnologias de Teste

### **Playwright**
- **Configuração**: Chromium apenas (simplificado)
- **Execução**: Sequencial (workers: 1)
- **Relatórios**: Lista (sem traces)

### **Page Object Model**
- **LoginPage.js**: Seletores e métodos centralizados
- **Métodos**: login(), fillEmail(), fillPassword(), etc.
- **Seletores**: Otimizados para elementos específicos

## 📊 Regras de Negócio Cobertas

### **RN-LOGIN-001 a RN-LOGIN-011**
1. Validação de email
2. Validação de senha  
3. Submissão do formulário
4. Autenticação
5. Interface responsiva
6. Calendário MEI
7. Estados visuais
8. Persistência de dados
9. Validação de limites de caracteres
10. Estrutura do calendário
11. Links externos

## 🚀 Como Executar

### **Comandos Disponíveis**
```bash
# Executar todos os testes
npm test

# Interface visual
npm run test:ui

# Modo debug
npm run test:debug

# Apenas Chromium
npx playwright test --project=chromium
```

### **Pré-requisitos**
- Backend rodando na porta 3000
- Frontend rodando na porta 3001
- Usuário admin@empresa.com cadastrado

## 📈 Métricas de Qualidade

### **Cobertura Funcional**
- ✅ Validações de entrada
- ✅ Fluxo de autenticação
- ✅ Interface responsiva
- ✅ Funcionalidades do calendário
- ✅ Acessibilidade básica
- ✅ Persistência de dados

### **Tipos de Teste**
- **Funcionais**: 13 casos
- **Interface**: 3 casos  
- **Segurança**: 2 casos
- **Performance**: 1 caso

## 🔍 Pontos de Atenção

### **Limitações Atuais**
- Não testa navegação entre meses (não implementada)
- Não testa backend offline extensivamente
- Não testa múltiplos browsers simultaneamente

### **Melhorias Futuras**
- Testes de integração com API
- Testes de performance mais robustos
- Testes de segurança avançados
- Cobertura de código automatizada

## 📝 Manutenção dos Testes

### **Quando Atualizar**
- Mudanças na interface (seletores)
- Novas funcionalidades
- Alterações nas regras de negócio
- Mudanças na API

### **Boas Práticas**
- Manter Page Objects atualizados
- Usar seletores estáveis
- Documentar casos de teste complexos
- Executar testes regularmente