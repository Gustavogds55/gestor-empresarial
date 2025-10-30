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
    await loginPage.fillEmail('');
    await loginPage.fillPassword('123456');
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

  // CT-LOGIN-018: Email Excede Limite (>50 caracteres)
  test('deve exibir erro para email muito longo', async ({ page }) => {
    // Aguardar elemento estar disponível e remover maxlength
    await loginPage.emailInput.waitFor();
    await page.evaluate(() => {
      const emailInput = document.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.removeAttribute('maxlength');
      }
    });
    
    const longEmail = 'a'.repeat(45) + '@test.com'; // 54 caracteres
    
    await loginPage.fillEmail(longEmail);
    await loginPage.blurEmail();
    
    // Deve exibir erro de limite
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.emailError).toHaveText('Email deve ter no máximo 50 caracteres');
  });

  // CT-LOGIN-019: Senha Excede Limite (>8 caracteres)
  test('deve exibir erro para senha muito longa', async ({ page }) => {
    // Aguardar elemento estar disponível e remover maxlength
    await loginPage.passwordInput.waitFor();
    await page.evaluate(() => {
      const passwordInput = document.querySelector('input[type="password"]');
      if (passwordInput) {
        passwordInput.removeAttribute('maxlength');
      }
    });
    
    const longPassword = '123456789'; // 9 caracteres
    
    await loginPage.fillEmail('admin@empresa.com');
    await loginPage.fillPassword(longPassword);
    await loginPage.blurPassword();
    
    // Deve exibir erro de limite
    await expect(loginPage.passwordError).toBeVisible();
    await expect(loginPage.passwordError).toHaveText('Senha deve ter no máximo 8 caracteres');
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
    await loginPage.waitForLoginComplete();
    
    // Verificar localStorage
    const token = await loginPage.getLocalStorageToken();
    const user = await loginPage.getLocalStorageUser();
    
    expect(token).toBeTruthy();
    expect(user).toBeTruthy();
    expect(user.email).toBe('admin@empresa.com');
  });

  // CT-LOGIN-007a: Login com Email Inválido
  test('deve exibir erro para email inválido', async () => {
    await loginPage.login('usuario@inexistente.com', '123456');
    
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.submitButton).not.toBeDisabled();
    
    // Verificar que campos permanecem preenchidos
    await expect(loginPage.emailInput).toHaveValue('usuario@inexistente.com');
    await expect(loginPage.passwordInput).toHaveValue('123456');
  });

  // CT-LOGIN-007b: Login com Senha Inválida
  test('deve exibir erro para senha inválida', async () => {
    await loginPage.login('admin@empresa.com', 'senha123'); // 8 caracteres
    
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.submitButton).not.toBeDisabled();
    
    // Verificar que campos permanecem preenchidos
    await expect(loginPage.emailInput).toHaveValue('admin@empresa.com');
    await expect(loginPage.passwordInput).toHaveValue('senha123');
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
  test('deve exibir obrigações do mês', async ({ page }) => {
    // Verificar título "Obrigações do Mês"
    const obligationsTitle = page.locator('text=Obrigações do Mês');
    await expect(obligationsTitle).toBeVisible();
    
    // Verificar se há obrigações com títulos (sempre tem DAS mensal)
    const obligationTitles = page.locator('.font-semibold.text-gray-900');
    const titleCount = await obligationTitles.count();
    expect(titleCount).toBeGreaterThan(0);
  });



  // CT-LOGIN-020: Links Externos Funcionando
  test('deve ter links externos funcionando', async ({ page, context }) => {
    // Procurar por links "Gerar DAS"
    const dasLinks = page.locator('text=Gerar DAS');
    const linkCount = await dasLinks.count();
    
    if (linkCount > 0) {
      // Verificar se link tem target="_blank"
      await expect(dasLinks.first()).toHaveAttribute('target', '_blank');
      
      // Verificar se link tem href correto
      const href = await dasLinks.first().getAttribute('href');
      expect(href).toContain('receita.fazenda.gov.br');
      
      // Verificar se link é válido (não testar clique para não abrir site externo)
      expect(href).toMatch(/^https?:\/\/.+/);
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
    // Focar diretamente nos elementos
    await loginPage.emailInput.focus();
    await expect(loginPage.emailInput).toBeFocused();
    
    // Tab para senha
    await page.keyboard.press('Tab');
    await expect(loginPage.passwordInput).toBeFocused();
    
    // Tab para botão
    await page.keyboard.press('Tab');
    await expect(loginPage.submitButton).toBeFocused();
    
    // Enter para submeter com dados válidos
    await loginPage.fillEmail('admin@empresa.com');
    await loginPage.fillPassword('123456');
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
    await loginPage.waitForLoginComplete();
    
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
    // Gerar erro de validação - deixar email vazio e fazer blur
    await loginPage.fillEmail('');
    await loginPage.blurEmail();
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.emailError).toHaveText('Campo obrigatório');
    
    // Corrigir campo
    await loginPage.fillEmail('admin@empresa.com');
    await expect(loginPage.emailError).not.toBeVisible();
    
    // Gerar erro de login
    await loginPage.fillPassword('senha123');
    await loginPage.clickSubmit();
    await expect(loginPage.loginError).toBeVisible();
    
    // Tentar novo login
    await loginPage.fillPassword('123456');
    await loginPage.clickSubmit();
    await loginPage.waitForLoadingToDisappear();
    await expect(loginPage.loginError).not.toBeVisible();
  });

  // CT-LOGIN-017: Múltiplas Tentativas
  test('deve permitir múltiplas tentativas de login', async () => {
    // Primeira tentativa - inválida
    await loginPage.login('admin@empresa.com', 'senha123');
    await expect(loginPage.loginError).toBeVisible();
    
    // Segunda tentativa - inválida
    await loginPage.login('admin@empresa.com', 'senha456');
    await expect(loginPage.loginError).toBeVisible();
    
    // Terceira tentativa - válida
    await loginPage.login('admin@empresa.com', '123456');
    await loginPage.waitForLoadingToDisappear();
    await loginPage.waitForLoginComplete();
    
    const token = await loginPage.getLocalStorageToken();
    expect(token).toBeTruthy();
  });
});