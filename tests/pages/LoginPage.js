export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Seletores
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.emailError = page.locator('.text-red-500.text-xs').first();
    this.emailInvalidError = page.locator('.text-red-500.text-xs:has-text("Email inválido")');
    this.passwordError = page.locator('.text-red-500.text-xs').last();
    this.loginError = page.locator('.bg-red-50\\/80 p');
    this.loadingButton = page.locator('text=Entrando...');
    this.spinner = page.locator('.animate-spin');
    
    // Calendário
    this.calendarTitle = page.locator('text=Calendário de Obrigações MEI');
    this.currentMonth = page.locator('.text-lg.font-semibold.text-blue-600');
    this.todayCell = page.locator('.bg-blue-500.text-white.font-bold');
    this.obligationDays = page.locator('.bg-red-100.border-red-300');
    this.obligationsList = page.locator('text=Obrigações do Mês');
    this.dasLink = page.locator('text=Gerar DAS');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async blurEmail() {
    await this.emailInput.blur();
  }

  async blurPassword() {
    await this.passwordInput.blur();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async waitForLoading() {
    await this.loadingButton.waitFor({ state: 'visible' });
  }

  async waitForLoadingToDisappear() {
    await this.loadingButton.waitFor({ state: 'hidden' });
  }

  async getLocalStorageToken() {
    return await this.page.evaluate(() => localStorage.getItem('token'));
  }

  async getLocalStorageUser() {
    const user = await this.page.evaluate(() => localStorage.getItem('usuario'));
    return user ? JSON.parse(user) : null;
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }
}