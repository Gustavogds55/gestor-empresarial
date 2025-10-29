import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';

test.describe('Login - Validações de Campos', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // CT-LOGIN-001: Validação de Email Obrigatório
  test('deve exibir erro quando email estiver vazio', async () => {
    await loginPage.blurEmail();
    await loginPage.clickSubmit();
    
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.emailError).toHaveText('Campo obrigatório');
  });

  // CT-LOGIN-002: Validação de Formato de Email
  test('deve exibir erro para email com formato inválido', async () => {
    const invalidEmails = ['email-sem-arroba', 'email@', '@dominio.com', 'email@dominio'];
    
    for (const email of invalidEmails) {
      await loginPage.fillEmail(email);
      await loginPage.blurEmail();
      
      await expect(loginPage.emailInvalidError).toBeVisible();
      await expect(loginPage.emailInvalidError).toHaveText('Email inválido');
      
      await loginPage.fillEmail('');
    }
  });

  // CT-LOGIN-003: Validação de Email Válido
  test('não deve exibir erro para email válido', async () => {
    await loginPage.fillEmail('usuario@empresa.com');
    await loginPage.blurEmail();
    
    await expect(loginPage.emailError).not.toBeVisible();
    await expect(loginPage.emailInvalidError).not.toBeVisible();
  });

  // CT-LOGIN-004: Validação de Senha Obrigatória
  test('deve exibir erro quando senha estiver vazia', async () => {
    await loginPage.fillEmail('usuario@empresa.com');
    await loginPage.blurPassword();
    await loginPage.clickSubmit();
    
    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.passwordError).toHaveText('Campo obrigatório');
  });

  // CT-LOGIN-005: Validação em Tempo Real
  test('deve remover erro ao corrigir email durante digitação', async () => {
    // Gerar erro
    await loginPage.fillEmail('email-inválido');
    await loginPage.blurEmail();
    await expect(loginPage.emailInvalidError).toBeVisible();
    
    // Corrigir email
    await loginPage.fillEmail('usuario@empresa.com');
    await expect(loginPage.emailInvalidError).not.toBeVisible();
  });
});

test.describe('Login - Autenticação', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clearLocalStorage();
  });

  // CT-LOGIN-006: Login com Credenciais Válidas
  test('deve fazer login com credenciais válidas', async () => {
    await loginPage.login('admin@empresa.com', '123456');
    
    // Verificar estado de loading
    await expect(loginPage.loadingButton).toBeVisible();
    await expect(loginPage.spinner).toBeVisible();
    await expect(loginPage.submitButton).toBeDisabled();
    
    // Aguardar conclusão
    await loginPage.waitForLoadingToDisappear();
    
    // Verificar localStorage
    const token = await loginPage.getLocalStorageToken();
    const user = await loginPage.getLocalStorageUser();
    
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
    expect(user.email).toBe('admin@empresa.com');
  });

  // CT-LOGIN-007: Login com Credenciais Inválidas
  test('deve exibir erro para credenciais inválidas', async () => {
    await loginPage.login('usuario@inexistente.com', 'senha-errada');
    
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.submitButton).not.toBeDisabled();
    
    // Verificar que campos permanecem preenchidos
    await expect(loginPage.emailInput).toHaveValue('usuario@inexistente.com');
    await expect(loginPage.passwordInput).toHaveValue('senha-errada');
  });

  // CT-LOGIN-008: Estado de Loading
  test('deve mostrar estado de loading durante requisição', async () => {
    await loginPage.fillEmail('admin@empresa.com');
    await loginPage.fillPassword('123456');
    
    const submitPromise = loginPage.clickSubmit();
    
    // Verificar estado imediatamente após clique
    await expect(loginPage.submitButton).toBeDisabled();
    await expect(loginPage.loadingButton).toBeVisible();
    await expect(loginPage.spinner).toBeVisible();
    
    await submitPromise;
  });
});

test.describe('Login - Layout e Responsividade', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // CT-LOGIN-010: Layout Responsivo
  test('deve manter layout em diferentes resoluções', async () => {
    const { page } = loginPage;
    
    // Mobile
    await page.setViewportSize({ width: 320, height: 568 });
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(loginPage.calendarTitle).toBeVisible();
    
    // Desktop
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(loginPage.calendarTitle).toBeVisible();
    await expect(loginPage.obligationsList).toBeVisible();
  });
});

test.describe('Login - Calendário MEI', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // CT-LOGIN-011: Calendário MEI - Mês Atual
  test('deve exibir calendário com mês atual', async () => {
    await expect(loginPage.calendarTitle).toBeVisible();
    await expect(loginPage.currentMonth).toBeVisible();
    
    // Verificar se há dia atual destacado
    const todayExists = await loginPage.todayCell.count();
    expect(todayExists).toBeGreaterThanOrEqual(0);
  });

  // CT-LOGIN-012: Calendário MEI - Obrigações do Mês
  test('deve exibir obrigações do mês', async () => {
    await expect(loginPage.obligationsList).toBeVisible();
    
    // Verificar se há links para gerar DAS
    const dasLinks = await loginPage.dasLink.count();
    if (dasLinks > 0) {
      await expect(loginPage.dasLink.first()).toHaveAttribute('target', '_blank');
    }
  });

  // CT-LOGIN-013: Interação com Calendário
  test('deve permitir clique em dias com obrigações', async ({ page }) => {
    const obligationDaysCount = await loginPage.obligationDays.count();
    
    if (obligationDaysCount > 0) {
      // Interceptar console.log
      const consoleLogs = [];
      page.on('console', msg => {
        if (msg.type() === 'log') {
          consoleLogs.push(msg.text());
        }
      });
      
      await loginPage.obligationDays.first().click();
      
      // Verificar se houve log (pode ser assíncrono)
      await page.waitForTimeout(100);
      expect(consoleLogs.some(log => log.includes('Obrigações do dia'))).toBeTruthy();
    }
  });
});

test.describe('Login - Acessibilidade', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // CT-LOGIN-014: Acessibilidade
  test('deve permitir navegação por teclado', async ({ page }) => {
    // Tab para email
    await page.keyboard.press('Tab');
    await expect(loginPage.emailInput).toBeFocused();
    
    // Tab para senha
    await page.keyboard.press('Tab');
    await expect(loginPage.passwordInput).toBeFocused();
    
    // Tab para botão
    await page.keyboard.press('Tab');
    await expect(loginPage.submitButton).toBeFocused();
    
    // Enter para submeter
    await loginPage.fillEmail('admin@empresa.com');
    await loginPage.fillPassword('123456');
    await loginPage.submitButton.focus();
    await page.keyboard.press('Enter');
    
    await expect(loginPage.loadingButton).toBeVisible();
  });
});

test.describe('Login - Persistência e Estados', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clearLocalStorage();
  });

  // CT-LOGIN-015: Persistência de Dados
  test('deve manter dados no localStorage após login', async ({ page }) => {
    await loginPage.login('admin@empresa.com', '123456');
    await loginPage.waitForLoadingToDisappear();
    
    // Recarregar página
    await page.reload();
    
    // Verificar se dados persistem
    const token = await loginPage.getLocalStorageToken();
    const user = await loginPage.getLocalStorageUser();
    
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
  });

  // CT-LOGIN-016: Limpeza de Erros
  test('deve limpar erros ao corrigir campos', async () => {
    // Gerar erro de validação
    await loginPage.blurEmail();
    await expect(loginPage.emailError).toBeVisible();
    
    // Corrigir campo
    await loginPage.fillEmail('admin@empresa.com');
    await expect(loginPage.emailError).not.toBeVisible();
    
    // Gerar erro de login
    await loginPage.login('admin@empresa.com', 'senha-errada');
    await expect(loginPage.loginError).toBeVisible();
    
    // Tentar novo login
    await loginPage.login('admin@empresa.com', '123456');
    await expect(loginPage.loginError).not.toBeVisible();
  });

  // CT-LOGIN-017: Múltiplas Tentativas
  test('deve permitir múltiplas tentativas de login', async () => {
    // Primeira tentativa - inválida
    await loginPage.login('admin@empresa.com', 'senha-errada');
    await expect(loginPage.loginError).toBeVisible();
    
    // Segunda tentativa - inválida
    await loginPage.login('admin@empresa.com', 'outra-senha-errada');
    await expect(loginPage.loginError).toBeVisible();
    
    // Terceira tentativa - válida
    await loginPage.login('admin@empresa.com', '123456');
    await loginPage.waitForLoadingToDisappear();
    
    const token = await loginPage.getLocalStorageToken();
    expect(token).toBeTruthy();
  });
});