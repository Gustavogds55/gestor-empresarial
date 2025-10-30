# Testes na Pipeline CI/CD

## 🚀 Configuração Implementada

### GitHub Actions
- **Arquivo**: `.github/workflows/tests.yml`
- **Triggers**: Push para `main`/`develop`, Pull Requests
- **Ambiente**: Ubuntu + MySQL 8.0 + Node.js 18

### Scripts Disponíveis
```bash
# Configuração inicial
./setup-tests.sh

# Executar testes localmente
npm test

# Executar testes para CI
npm run test:ci

# Iniciar serviços
npm run start:services
```

## 🔧 Configuração Local

### 1. Setup Inicial
```bash
./setup-tests.sh
```

### 2. Configurar MySQL
```bash
# Criar banco de dados
mysql -u root -p
CREATE DATABASE gestor_empresarial;
```

### 3. Executar Testes
```bash
# Iniciar serviços (terminal 1)
npm run start:services

# Executar testes (terminal 2)
npm test
```

## 🎭 Pipeline Flow

1. **Setup Environment**
   - MySQL service
   - Node.js 18
   - Dependencies

2. **Backend Setup**
   - Install dependencies
   - Run migrations
   - Start server (port 3000)

3. **Frontend Setup**
   - Install dependencies
   - Start dev server (port 3001)

4. **Test Execution**
   - Install Playwright
   - Run 19 test cases
   - Generate reports

5. **Artifacts**
   - Upload test reports
   - Screenshots on failure
   - Traces on failure

## 📊 Test Coverage

- **19 casos de teste** automatizados
- **Validações**: Campos obrigatórios, formatos
- **Autenticação**: Login válido/inválido
- **UI**: Responsividade, acessibilidade
- **Funcional**: Calendário MEI, links externos

## 🐛 Troubleshooting

### Serviços não iniciam
```bash
# Verificar portas
lsof -i :3000
lsof -i :3001

# Matar processos
pkill -f "node.*3000"
pkill -f "node.*3001"
```

### Banco de dados
```bash
# Resetar migrações
cd backend
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Testes falham
```bash
# Debug mode
npm run test:debug

# Headed mode (com browser visível)
npm run test:headed
```

## 📈 Métricas

- **Tempo médio**: ~2-3 minutos
- **Retry policy**: 2 tentativas em CI
- **Timeout**: 30s navegação, 10s ações
- **Browsers**: Chromium apenas (otimizado)

## 🔄 Próximas Melhorias

- [ ] Testes paralelos
- [ ] Cache de dependências
- [ ] Notificações Slack/Discord
- [ ] Métricas de performance
- [ ] Testes de carga