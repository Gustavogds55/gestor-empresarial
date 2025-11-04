// Helper para gerenciar dados de teste
class TestDataHelper {
  constructor() {
    this.testExpenses = {
      // Dados de exemplo para Janeiro 2024
      '2024-0': [
        { id: 1, dia: 5, valor: 250.00, categoria: 'Aluguel', descricao: 'Aluguel do escritório' },
        { id: 2, dia: 10, valor: 80.50, categoria: 'Internet', descricao: 'Conta de internet' },
        { id: 3, dia: 15, valor: 120.00, categoria: 'Material', descricao: 'Material de escritório' },
        { id: 4, dia: 20, valor: 45.30, categoria: 'Transporte', descricao: 'Combustível' },
        { id: 5, dia: 25, valor: 200.00, categoria: 'Marketing', descricao: 'Anúncios online' }
      ]
    };
  }

  // Limpar localStorage antes dos testes
  async clearLocalStorage(page) {
    await page.evaluate(() => {
      localStorage.clear();
    });
  }

  // Configurar dados de exemplo no localStorage
  async setupTestData(page) {
    await page.evaluate((expenses) => {
      localStorage.setItem('despesasPorMes', JSON.stringify(expenses));
    }, this.testExpenses);
  }

  // Obter dados do localStorage
  async getLocalStorageData(page) {
    return await page.evaluate(() => {
      const data = localStorage.getItem('despesasPorMes');
      return data ? JSON.parse(data) : {};
    });
  }

  // Adicionar despesa de teste para hoje
  async addTodayExpense(page, value = 100.00, description = 'Despesa de teste') {
    const today = new Date();
    const dayToday = today.getDate();
    const monthToday = today.getMonth();
    const yearToday = today.getFullYear();
    const key = `${yearToday}-${monthToday}`;

    await page.evaluate(({ key, dayToday, value, description }) => {
      const expenses = JSON.parse(localStorage.getItem('despesasPorMes') || '{}');
      if (!expenses[key]) {
        expenses[key] = [];
      }
      
      expenses[key].push({
        id: Date.now(),
        dia: dayToday,
        valor: value,
        categoria: 'Despesa',
        descricao: description
      });
      
      localStorage.setItem('despesasPorMes', JSON.stringify(expenses));
    }, { key, dayToday, value, description });
  }

  // Formatar valor em reais
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
  }

  // Gerar dados de teste aleatórios
  generateRandomExpense(day = null) {
    const randomDay = day || Math.floor(Math.random() * 28) + 1;
    const randomValue = Math.floor(Math.random() * 500) + 10;
    const descriptions = [
      'Combustível',
      'Almoço', 
      'Material de escritório',
      'Internet',
      'Telefone'
    ];
    
    return {
      id: Date.now() + Math.random(),
      dia: randomDay,
      valor: randomValue,
      categoria: 'Despesa',
      descricao: descriptions[Math.floor(Math.random() * descriptions.length)]
    };
  }
}

module.exports = { TestDataHelper };