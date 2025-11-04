// Page Object Model para a tela Home
class HomePage {
  constructor(page) {
    this.page = page;
    
    // Sidebar
    this.sidebar = '[data-testid="sidebar"]';
    this.logo = '[data-testid="logo"]';
    this.menuHome = '[data-testid="menu-home"]';
    this.menuCompras = '[data-testid="menu-compras"]';
    this.menuVendas = '[data-testid="menu-vendas"]';
    this.menuRelatorios = '[data-testid="menu-relatorios"]';
    
    // Header
    this.headerTitle = '[data-testid="header-title"]';
    this.userAvatar = '[data-testid="user-avatar"]';
    this.userName = '[data-testid="user-name"]';
    this.userProfile = '[data-testid="user-profile"]';
    this.logoutButton = '[data-testid="logout-button"]';
    
    // Calendário
    this.calendarTitle = '[data-testid="calendar-title"]';
    this.monthTotal = '[data-testid="month-total"]';
    this.prevMonthButton = '[data-testid="prev-month"]';
    this.nextMonthButton = '[data-testid="next-month"]';
    this.currentMonth = '[data-testid="current-month"]';
    this.currentYear = '[data-testid="current-year"]';
    this.calendarDays = '[data-testid="calendar-day"]';
    this.todayIndicator = '[data-testid="today-indicator"]';
    this.expenseIndicator = '[data-testid="expense-indicator"]';
    this.expenseBadge = '[data-testid="expense-badge"]';
    
    // Cards Laterais
    this.todayExpensesCard = '[data-testid="today-expenses-card"]';
    this.todayExpensesList = '[data-testid="today-expenses-list"]';
    this.todayExpenseItem = '[data-testid="today-expense-item"]';
    this.emptyTodayMessage = '[data-testid="empty-today-message"]';
    
    this.quickActionsCard = '[data-testid="quick-actions-card"]';
    this.newPurchaseButton = '[data-testid="new-purchase-button"]';
    this.newSaleButton = '[data-testid="new-sale-button"]';
    this.monthlyReportsButton = '[data-testid="monthly-reports-button"]';
    
    // Modais
    this.modal = '[data-testid="expense-modal"]';
    this.modalTitle = '[data-testid="modal-title"]';
    this.modalSubtitle = '[data-testid="modal-subtitle"]';
    this.modalCloseButton = '[data-testid="modal-close"]';
    this.modalBackdrop = '[data-testid="modal-backdrop"]';
    
    // Formulário de Despesa
    this.valueInput = '[data-testid="expense-value"]';
    this.descriptionInput = '[data-testid="expense-description"]';
    this.cancelButton = '[data-testid="cancel-button"]';
    this.saveButton = '[data-testid="save-button"]';
    this.updateButton = '[data-testid="update-button"]';
    
    // Lista de Despesas do Dia
    this.expensesList = '[data-testid="expenses-list"]';
    this.expenseItem = '[data-testid="expense-item"]';
    this.editExpenseButton = '[data-testid="edit-expense"]';
    this.deleteExpenseButton = '[data-testid="delete-expense"]';
    this.addNewExpenseButton = '[data-testid="add-new-expense"]';
    
    // Modal de Sucesso
    this.successModal = '[data-testid="success-modal"]';
    this.successIcon = '[data-testid="success-icon"]';
    this.successTitle = '[data-testid="success-title"]';
    this.successMessage = '[data-testid="success-message"]';
  }

  // Métodos de navegação
  async navigateToHome() {
    await this.page.click(this.menuHome);
  }

  async navigateToCompras() {
    await this.page.click(this.menuCompras);
  }

  async navigateToVendas() {
    await this.page.click(this.menuVendas);
  }

  async navigateToRelatorios() {
    await this.page.click(this.menuRelatorios);
  }

  // Métodos do calendário
  async clickPreviousMonth() {
    await this.page.click(this.prevMonthButton);
  }

  async clickNextMonth() {
    await this.page.click(this.nextMonthButton);
  }

  async clickCalendarDay(dayNumber) {
    await this.page.click(`${this.calendarDays}:has-text("${dayNumber}")`);
  }

  async getCurrentMonth() {
    return await this.page.textContent(this.currentMonth);
  }

  async getCurrentYear() {
    return await this.page.textContent(this.currentYear);
  }

  async getMonthTotal() {
    return await this.page.textContent(this.monthTotal);
  }

  // Métodos de ações rápidas
  async clickNewPurchase() {
    await this.page.click(this.newPurchaseButton);
  }

  async clickNewSale() {
    await this.page.click(this.newSaleButton);
  }

  async clickMonthlyReports() {
    await this.page.click(this.monthlyReportsButton);
  }

  // Métodos de modal
  async closeModal() {
    await this.page.click(this.modalCloseButton);
  }

  async closeModalByBackdrop() {
    await this.page.click(this.modalBackdrop);
  }

  async fillExpenseForm(value, description = '') {
    await this.page.fill(this.valueInput, value);
    if (description) {
      await this.page.fill(this.descriptionInput, description);
    }
  }

  async saveExpense() {
    await this.page.click(this.saveButton);
  }

  async updateExpense() {
    await this.page.click(this.updateButton);
  }

  async cancelExpense() {
    await this.page.click(this.cancelButton);
  }

  // Métodos de verificação
  async isModalVisible() {
    return await this.page.isVisible(this.modal);
  }

  async isSuccessModalVisible() {
    return await this.page.isVisible(this.successModal);
  }

  async getModalTitle() {
    return await this.page.textContent(this.modalTitle);
  }

  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }

  async getTodayExpensesCount() {
    return await this.page.locator(this.todayExpenseItem).count();
  }

  async isEmptyTodayMessageVisible() {
    return await this.page.isVisible(this.emptyTodayMessage);
  }

  // Métodos de espera
  async waitForCalendarLoad() {
    await this.page.waitForSelector(this.calendarDays);
  }

  async waitForSuccessModal() {
    await this.page.waitForSelector(this.successModal);
  }

  async waitForModalClose() {
    await this.page.waitForSelector(this.modal, { state: 'hidden' });
  }
}

module.exports = { HomePage };