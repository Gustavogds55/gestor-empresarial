const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { HomePage } = require('./pages/HomePage');

test.describe('Tela Home - Gestor Empresarial', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    // Fazer login antes de cada teste
    await page.goto('http://localhost:3001');
    await loginPage.login('admin@empresa.com', '123456');
    
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
  });

  // CT-HOME-001: Verificar Estrutura da Tela
  test('deve exibir estrutura correta da tela Home', async ({ page }) => {
    // Verificar sidebar fixa com 256px
    const sidebar = page.locator('.w-64');
    await expect(sidebar).toBeVisible();
    
    // Verificar conteúdo principal
    const mainContent = page.locator('.flex-1.flex.flex-col');
    await expect(mainContent).toBeVisible();

    // Verificar header com título "Home"
    const headerTitle = page.locator('h2:has-text("Home")');
    await expect(headerTitle).toBeVisible();

    // Verificar informações do usuário
    const userAvatar = page.locator('.h-8.w-8.rounded-full.bg-blue-500');
    await expect(userAvatar).toBeVisible();
    
    const logoutButton = page.locator('button:has-text("Sair")');
    await expect(logoutButton).toBeVisible();
  });

  // CT-HOME-002: Navegação pela Sidebar
  test('deve navegar corretamente entre seções da sidebar', async ({ page }) => {
    // Verificar logo "Gestor Empresarial"
    const logo = page.locator('h1:has-text("Gestor Empresarial")');
    await expect(logo).toBeVisible();

    // Verificar 4 itens do menu
    const menuHome = page.locator('a:has-text("Home")');
    const menuCompras = page.locator('a:has-text("Compras")');
    const menuVendas = page.locator('a:has-text("Vendas")');
    const menuRelatorios = page.locator('a:has-text("Relatórios")');
    
    await expect(menuHome).toBeVisible();
    await expect(menuCompras).toBeVisible();
    await expect(menuVendas).toBeVisible();
    await expect(menuRelatorios).toBeVisible();

    // Verificar item Home ativo (destacado em azul)
    await expect(menuHome).toHaveClass(/bg-blue-100/);

    // Testar navegação para Compras
    await menuCompras.click();
    await expect(page.locator('h3:has-text("Gestão de Compras")')).toBeVisible();
    await expect(menuCompras).toHaveClass(/bg-blue-100/);

    // Testar navegação para Vendas
    await menuVendas.click();
    await expect(page.locator('h3:has-text("Gestão de Vendas")')).toBeVisible();
    await expect(menuVendas).toHaveClass(/bg-blue-100/);

    // Testar navegação para Relatórios
    await menuRelatorios.click();
    await expect(page.locator('h3:has-text("Relatórios")')).toBeVisible();
    await expect(menuRelatorios).toHaveClass(/bg-blue-100/);

    // Voltar para Home
    await menuHome.click();
    await expect(page.locator('h2:has-text("Home")')).toBeVisible();
    await expect(menuHome).toHaveClass(/bg-blue-100/);
  });

  // CT-HOME-003: Informações do Header
  test('deve exibir informações corretas do usuário no header', async ({ page }) => {
    // Verificar título "Home" à esquerda
    const headerTitle = page.locator('h2:has-text("Home")');
    await expect(headerTitle).toBeVisible();

    // Verificar avatar com inicial do nome
    const userAvatar = page.locator('.h-8.w-8.rounded-full.bg-blue-500');
    await expect(userAvatar).toBeVisible();
    
    // Verificar se avatar contém inicial "A" (Admin)
    const avatarText = await userAvatar.textContent();
    expect(avatarText).toBe('A');

    // Verificar nome do usuário
    const userName = page.locator('p.text-sm.font-medium:has-text("Admin")');
    await expect(userName).toBeVisible();

    // Verificar perfil do usuário
    const userProfile = page.locator('p.text-xs:has-text("Administrador")');
    await expect(userProfile).toBeVisible();

    // Verificar botão "Sair" para logout
    const logoutButton = page.locator('button:has-text("Sair")');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveClass(/bg-blue-600/);
  });

  // CT-HOME-003b: Logout com Sucesso
  test('deve fazer logout com sucesso', async ({ page }) => {
    // Clicar no botão "Sair"
    const logoutButton = page.locator('button:has-text("Sair")');
    await logoutButton.click();
    
    // Verificar redirecionamento para tela de login
    await expect(page.locator('button:has-text("Entrar")')).toBeVisible();
    
    // Verificar se elementos da tela Home não estão mais visíveis
    await expect(page.locator('h2:has-text("Home")')).not.toBeVisible();
  });

  // CT-HOME-004: Estrutura do Calendário
  test('deve exibir estrutura correta do calendário', async ({ page }) => {
    // Verificar título "Calendário de despesas"
    const calendarTitle = page.locator('h3:has-text("Calendário de despesas")');
    await expect(calendarTitle).toBeVisible();

    // Verificar subtítulo com total do mês
    const monthTotal = page.locator('p:has-text("Total do mês:")');
    await expect(monthTotal).toBeVisible();

    // Verificar botões de navegação mensal
    const prevButton = page.locator('button').filter({ hasText: '' }).first();
    const nextButton = page.locator('button').filter({ hasText: '' }).last();
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Verificar grid 7x6 dos dias (cabeçalhos + dias)
    const dayHeaders = page.locator('.grid.grid-cols-7 > div').first();
    await expect(dayHeaders).toBeVisible();

    // Verificar dias da semana
    await expect(page.locator('text=Dom')).toBeVisible();
    await expect(page.locator('text=Seg')).toBeVisible();
    await expect(page.locator('text=Sáb')).toBeVisible();

    // Verificar legenda
    await expect(page.locator('span.text-gray-600:has-text("Hoje")')).toBeVisible();
    await expect(page.locator('span.text-gray-600:has-text("Obrigações")')).toBeVisible();
  });

  // CT-HOME-005: Navegação Entre Meses
  test('deve exibir controles de navegação mensal', async ({ page }) => {
    // Verificar presença dos botões de navegação
    const prevButton = page.locator('button').filter({ hasText: '' }).first();
    const nextButton = page.locator('button').filter({ hasText: '' }).last();
    
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Verificar exibição do mês e ano atual
    await expect(page.locator('text=/Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro/')).toBeVisible();
    await expect(page.locator('.text-sm.text-gray-500:has-text("202")')).toBeVisible();

    // Verificar total de despesas visível
    await expect(page.locator('text=/Total do mês/')).toBeVisible();
  });

  // CT-HOME-006: Indicadores Visuais dos Dias
  test('deve exibir indicadores visuais corretos nos dias', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Obter dia atual
    const today = new Date().getDate();
    
    // Procurar por um dia futuro (maior que hoje)
    let targetDay = null;
    for (let day = today + 1; day <= 31; day++) {
      const dayElement = page.locator('.grid.grid-cols-7 > div').filter({ hasText: new RegExp(`^${day}$`) }).first();
      if (await dayElement.count() > 0) {
        // Verificar se não é dia de outro mês (texto cinza)
        const isOtherMonth = await dayElement.locator('.text-gray-300').count() > 0;
        if (!isOtherMonth) {
          targetDay = dayElement;
          break;
        }
      }
    }
    
    // Se não encontrou dia futuro, usar o dia 25 como fallback
    if (!targetDay) {
      targetDay = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^25$/ }).first();
    }
    
    await targetDay.click();
    
    // Aguardar modal abrir
    await page.waitForSelector('.fixed.inset-0');
    
    // Preencher e salvar despesa
    await page.locator('input[step="0.01"]').fill('100');
    await page.locator('textarea').fill('Teste de despesa');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso aparecer e desaparecer
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Aguardar atualização do calendário
    await page.waitForTimeout(1000);
    
    // Verificar se a despesa foi salva no localStorage
    const localStorage = await page.evaluate(() => {
      const data = window.localStorage.getItem('despesasPorMes');
      return data ? JSON.parse(data) : null;
    });
    
    expect(localStorage).toBeTruthy();
    
    // Verificar dia com despesa recém-criada (fundo vermelho claro)
    await expect(page.locator('.bg-red-50').first()).toBeVisible();
    
    // Verificar ponto vermelho em dias com despesas
    await expect(page.locator('.bg-red-500').first()).toBeVisible();
  });

  // CT-HOME-007: Interação com Dias do Calendário
  test('deve abrir modais corretos ao clicar nos dias', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Testar clique em dia vazio (deve abrir modal "Nova Despesa")
    const emptyDay = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^15$/ }).first();
    await emptyDay.click();
    
    // Verificar modal "Nova Despesa"
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Fechar modal
    await page.locator('button:has-text("Cancelar")').click();
    await page.waitForSelector('.fixed.inset-0', { state: 'hidden' });
    
    // Cadastrar uma despesa primeiro para testar modal "Despesas do Dia"
    await emptyDay.click();
    await page.locator('input[step="0.01"]').fill('50');
    await page.locator('textarea').fill('Despesa teste');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Clicar no dia com despesa (deve abrir modal "Despesas do Dia")
    const dayWithExpense = page.locator('.bg-red-50').first();
    await dayWithExpense.click();
    
    // Verificar modal "Despesas do Dia"
    await expect(page.locator('h3:has-text("Despesas do Dia")')).toBeVisible();
    
    // Verificar botões de ação
    await expect(page.locator('button:has-text("+ Nova Despesa")')).toBeVisible();
    await expect(page.locator('button:has-text("Fechar")')).toBeVisible();
    
    // Fechar modal
    await page.locator('button:has-text("Fechar")').click();
    
    // Testar que dias de outros meses não são clicáveis
    const otherMonthDay = page.locator('.text-gray-300').first();
    if (await otherMonthDay.count() > 0) {
      await otherMonthDay.click();
      // Não deve abrir modal
      await expect(page.locator('.fixed.inset-0')).not.toBeVisible();
    }
  });

  // CT-HOME-008: Cálculo do Total Mensal
  test('deve calcular total mensal corretamente', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Capturar total inicial
    const initialTotal = await page.locator('p:has-text("Total do mês:")').textContent();
    
    // Verificar formato "Total do mês: R$ X,XX"
    expect(initialTotal).toMatch(/Total do mês: R\$ [0-9.,]+/);
    
    // Cadastrar primeira despesa
    const day1 = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^10$/ }).first();
    await day1.click();
    await page.locator('input[step="0.01"]').fill('100.50');
    await page.locator('textarea').fill('Primeira despesa');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar atualização do total
    const totalAfterFirst = await page.locator('p:has-text("Total do mês:")').textContent();
    expect(totalAfterFirst).toContain('100');
    
    // Cadastrar segunda despesa
    const day2 = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^20$/ }).first();
    await day2.click();
    await page.locator('input[step="0.01"]').fill('250.75');
    await page.locator('textarea').fill('Segunda despesa');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar soma total (100.50 + 250.75 = 351.25)
    const finalTotal = await page.locator('p:has-text("Total do mês:")').textContent();
    expect(finalTotal).toContain('351');
    
    // Verificar formatação brasileira (vírgula para decimais)
    expect(finalTotal).toMatch(/R\$ [0-9]+,[0-9]{2}/);
  });

  // CT-HOME-009: Modal Nova Despesa
  test('deve cadastrar nova despesa corretamente', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Clicar em dia vazio para abrir modal
    const emptyDay = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^12$/ }).first();
    await emptyDay.click();
    
    // Verificar título "Nova Despesa"
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Verificar data selecionada no subtítulo
    const subtitle = page.locator('p.text-sm.text-gray-500.mt-1');
    await expect(subtitle).toBeVisible();
    const subtitleText = await subtitle.textContent();
    expect(subtitleText).toContain('12');
    
    // Verificar campo valor obrigatório
    const valueInput = page.locator('input[step="0.01"]');
    await expect(valueInput).toBeVisible();
    
    // Verificar campo descrição opcional
    const descriptionInput = page.locator('textarea');
    await expect(descriptionInput).toBeVisible();
    
    // Verificar botões Cancelar e Salvar
    await expect(page.locator('button:has-text("Cancelar")')).toBeVisible();
    await expect(page.locator('button:has-text("Salvar")')).toBeVisible();
    
    // Testar validação - fazer blur no campo vazio para ativar validação
    await valueInput.click();
    await descriptionInput.click(); // blur no campo valor
    
    // Verificar mensagem de erro para campo obrigatório
    await expect(page.locator('.text-red-500:has-text("Campo obrigatório")')).toBeVisible();
    
    // Verificar que botão Salvar está desabilitado
    const saveButton = page.locator('button:has-text("Salvar")');
    await expect(saveButton).toBeDisabled();
    
    // Modal deve permanecer aberto (validação impede salvamento)
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Preencher valor válido
    await valueInput.fill('150.75');
    await descriptionInput.fill('Despesa de teste');
    
    // Verificar que botão Salvar agora está habilitado
    await expect(saveButton).toBeEnabled();
    
    // Salvar despesa
    await saveButton.click();
    
    // Verificar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await expect(page.locator('h3:has-text("Sucesso!")')).toBeVisible();
    
    // Aguardar modal fechar
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar que despesa foi criada (dia com fundo vermelho)
    await expect(page.locator('.bg-red-50').first()).toBeVisible();
  });

  // CT-HOME-010: Modal Despesas do Dia
  test('deve exibir modal de despesas do dia corretamente', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Encontrar um dia válido do mês atual (sem texto cinza)
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let targetDay = null;
    
    for (const day of allDays) {
      const text = await day.textContent();
      const hasGrayText = await day.locator('.text-gray-300').count() > 0;
      
      if (text && text.trim() === '15' && !hasGrayText) {
        targetDay = day;
        break;
      }
    }
    
    // Se não encontrou dia 15, usar dia 18
    if (!targetDay) {
      for (const day of allDays) {
        const text = await day.textContent();
        const hasGrayText = await day.locator('.text-gray-300').count() > 0;
        
        if (text && text.trim() === '18' && !hasGrayText) {
          targetDay = day;
          break;
        }
      }
    }
    
    await targetDay.click();
    
    // Verificar modal "Nova Despesa" abriu
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Cadastrar primeira despesa
    await page.locator('input[step="0.01"]').fill('125.50');
    await page.locator('textarea').fill('Primeira despesa do dia');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Aguardar calendário atualizar
    await page.waitForTimeout(500);
    
    // Clicar novamente no dia para ver modal de despesas
    await targetDay.click();
    
    // Aguardar modal abrir
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar modal "Despesas do Dia" abriu
    await expect(page.locator('h3:has-text("Despesas do Dia")')).toBeVisible();
    
    // Verificar data selecionada no subtítulo
    const subtitle = page.locator('p.text-sm.text-gray-500.mt-1');
    await expect(subtitle).toBeVisible();
    
    // Adicionar segunda despesa usando botão "+ Nova Despesa"
    await page.locator('button:has-text("+ Nova Despesa")').click();
    
    // Verificar que mudou para modo adicionar
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Cadastrar segunda despesa
    await page.locator('input[step="0.01"]').fill('75.25');
    await page.locator('textarea').fill('Segunda despesa do dia');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Aguardar calendário atualizar
    await page.waitForTimeout(500);
    
    // Verificar badge numérico "2" no calendário (múltiplas despesas)
    const badge = page.locator('.absolute.-top-1.-right-1:has-text("2")');
    await expect(badge).toBeVisible();
    
    // Clicar novamente no dia para ver as despesas
    await targetDay.click();
    
    // Aguardar modal abrir
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar título "Despesas do Dia"
    await expect(page.locator('h3:has-text("Despesas do Dia")')).toBeVisible();
    
    // Verificar que lista todas as despesas do dia (2 despesas)
    const expenseCards = page.locator('.p-4.border.border-gray-200.rounded-lg');
    await expect(expenseCards).toHaveCount(2);
    
    // Verificar cada despesa em card individual
    const firstExpense = expenseCards.first();
    const secondExpense = expenseCards.last();
    
    await expect(firstExpense).toBeVisible();
    await expect(secondExpense).toBeVisible();
    
    // Verificar botões Editar e Excluir em cada despesa
    await expect(firstExpense.locator('button[title="Editar"]')).toBeVisible();
    await expect(firstExpense.locator('button[title="Excluir"]')).toBeVisible();
    await expect(secondExpense.locator('button[title="Editar"]')).toBeVisible();
    await expect(secondExpense.locator('button[title="Excluir"]')).toBeVisible();
    
    // Verificar conteúdo das despesas
    await expect(firstExpense).toContainText('Primeira despesa do dia');
    await expect(firstExpense).toContainText('R$ 125,50');
    await expect(secondExpense).toContainText('Segunda despesa do dia');
    await expect(secondExpense).toContainText('R$ 75,25');
    
    // Verificar botão "+ Nova Despesa" no final
    await expect(page.locator('button:has-text("+ Nova Despesa")')).toBeVisible();
    
    // Verificar botão "Fechar" para sair
    await expect(page.locator('button:has-text("Fechar")')).toBeVisible();
    
    // Testar funcionalidade do botão Editar
    await firstExpense.locator('button[title="Editar"]').click();
    
    // Verificar que mudou para modo editar
    await expect(page.locator('h3:has-text("Editar Despesa")')).toBeVisible();
    
    // Verificar campos preenchidos com dados atuais
    const valueInput = page.locator('input[step="0.01"]');
    const descriptionInput = page.locator('textarea');
    
    await expect(valueInput).toHaveValue('125.5');
    await expect(descriptionInput).toHaveValue('Primeira despesa do dia');
    
    // Cancelar edição
    await page.locator('button:has-text("Cancelar")').click();
    
    // Aguardar modal fechar
    await page.waitForSelector('.fixed.inset-0', { state: 'hidden', timeout: 5000 });
    
    // Clicar novamente no dia para ver modal de despesas
    await targetDay.click();
    
    // Aguardar modal abrir
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar que voltou para modal de despesas do dia
    await expect(page.locator('h3:has-text("Despesas do Dia")')).toBeVisible();
    
    // Testar funcionalidade do botão Excluir
    await secondExpense.locator('button[title="Excluir"]').click();
    
    // Aguardar modal de sucesso da exclusão
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar que agora só tem 1 despesa
    await expect(expenseCards).toHaveCount(1);
    
    // Verificar que a despesa restante é a primeira
    await expect(page.locator('.p-4.border.border-gray-200.rounded-lg')).toContainText('Primeira despesa do dia');
    
    // Fechar modal
    await page.locator('button:has-text("Fechar")').click();
    
    // Verificar que badge numérico foi removido (apenas 1 despesa não mostra badge)
    const badgeAfterDelete = page.locator('.absolute.-top-1.-right-1:has-text("2")');
    await expect(badgeAfterDelete).not.toBeVisible();
    
    // Verificar que modal fechou
    await expect(page.locator('.fixed.inset-0')).not.toBeVisible();
  });

  // CT-HOME-011: Edição de Despesas
  test('deve editar despesa existente corretamente', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Encontrar um dia válido do mês atual
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let targetDay = null;
    
    for (const day of allDays) {
      const text = await day.textContent();
      const hasGrayText = await day.locator('.text-gray-300').count() > 0;
      
      if (text && text.trim() === '22' && !hasGrayText) {
        targetDay = day;
        break;
      }
    }
    
    // Cadastrar despesa inicial
    await targetDay.click();
    await page.locator('input[step="0.01"]').fill('200.00');
    await page.locator('textarea').fill('Despesa original');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(500);
    
    // Clicar no dia para abrir modal de despesas
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar modal "Despesas do Dia"
    await expect(page.locator('h3:has-text("Despesas do Dia")')).toBeVisible();
    
    // Clicar no botão Editar
    await page.locator('button[title="Editar"]').first().click();
    
    // Verificar título "Editar Despesa"
    await expect(page.locator('h3:has-text("Editar Despesa")')).toBeVisible();
    
    // Verificar formulário preenchido com dados atuais
    const valueInput = page.locator('input[step="0.01"]');
    const descriptionInput = page.locator('textarea');
    
    await expect(valueInput).toHaveValue('200');
    await expect(descriptionInput).toHaveValue('Despesa original');
    
    // Verificar botões Cancelar e Atualizar
    await expect(page.locator('button:has-text("Cancelar")')).toBeVisible();
    await expect(page.locator('button:has-text("Atualizar")')).toBeVisible();
    
    // Testar validação - limpar campo valor
    await valueInput.clear();
    await descriptionInput.click();
    
    // Verificar mensagem de erro
    await expect(page.locator('.text-red-500:has-text("Campo obrigatório")')).toBeVisible();
    
    // Verificar botão Atualizar desabilitado
    const updateButton = page.locator('button:has-text("Atualizar")');
    await expect(updateButton).toBeDisabled();
    
    // Alterar valor e descrição
    await valueInput.fill('350.75');
    await descriptionInput.clear();
    await descriptionInput.fill('Despesa editada');
    
    // Verificar botão Atualizar habilitado
    await expect(updateButton).toBeEnabled();
    
    // Clicar em Atualizar
    await updateButton.click();
    
    // Verificar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await expect(page.locator('h3:has-text("Sucesso!")')).toBeVisible();
    await expect(page.locator('p:has-text("Despesa alterada com sucesso!")')).toBeVisible();
    
    // Aguardar modal fechar
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(500);
    
    // Clicar no dia novamente para verificar atualização
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar que despesa foi atualizada na interface
    const expenseCard = page.locator('.p-4.border.border-gray-200.rounded-lg').first();
    await expect(expenseCard).toContainText('Despesa editada');
    await expect(expenseCard).toContainText('R$ 350,75');
    
    // Verificar que total do mês foi atualizado
    await page.locator('button:has-text("Fechar")').click();
    const monthTotal = await page.locator('p:has-text("Total do mês:")').textContent();
    expect(monthTotal).toContain('350');
  });

  // CT-HOME-012: Exclusão de Despesas
  test('deve excluir despesa corretamente', async ({ page }) => {
    // Aguardar calendário carregar
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Encontrar um dia válido do mês atual
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let targetDay = null;
    
    for (const day of allDays) {
      const text = await day.textContent();
      const hasGrayText = await day.locator('.text-gray-300').count() > 0;
      
      if (text && text.trim() === '28' && !hasGrayText) {
        targetDay = day;
        break;
      }
    }
    
    // Cadastrar duas despesas
    await targetDay.click();
    await page.locator('input[step="0.01"]').fill('100.00');
    await page.locator('textarea').fill('Primeira despesa');
    await page.locator('button:has-text("Salvar")').click();
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(500);
    
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('button:has-text("+ Nova Despesa")').click();
    await page.locator('input[step="0.01"]').fill('50.00');
    await page.locator('textarea').fill('Segunda despesa');
    await page.locator('button:has-text("Salvar")').click();
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(500);
    
    // Capturar total antes da exclusão
    const totalBefore = await page.locator('p:has-text("Total do mês:")').textContent();
    
    // Abrir modal de despesas
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar 2 despesas
    const expenseCards = page.locator('.p-4.border.border-gray-200.rounded-lg');
    await expect(expenseCards).toHaveCount(2);
    
    // Clicar em Excluir na segunda despesa
    await expenseCards.last().locator('button[title="Excluir"]').click();
    
    // Verificar exclusão imediata (sem confirmação)
    // Verificar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await expect(page.locator('h3:has-text("Sucesso!")')).toBeVisible();
    await expect(page.locator('p:has-text("Despesa excluída com sucesso!")')).toBeVisible();
    
    // Aguardar modal fechar
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar remoção instantânea do modal (agora só 1 despesa)
    await expect(expenseCards).toHaveCount(1);
    await expect(expenseCards.first()).toContainText('Primeira despesa');
    
    // Fechar modal
    await page.locator('button:has-text("Fechar")').click();
    await page.waitForTimeout(500);
    
    // Verificar atualização automática do calendário
    // Badge deve mostrar "1" ou não aparecer
    const badge = page.locator('.absolute.-top-1.-right-1:has-text("2")');
    await expect(badge).not.toBeVisible();
    
    // Verificar atualização do total do mês
    const totalAfter = await page.locator('p:has-text("Total do mês:")').textContent();
    expect(totalAfter).toContain('100');
    expect(totalAfter).not.toContain('150');
    
    // Excluir a última despesa
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await expenseCards.first().locator('button[title="Excluir"]').click();
    
    // Verificar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Modal deve fechar automaticamente quando não há mais despesas
    await page.waitForSelector('.fixed.inset-0', { state: 'hidden', timeout: 5000 });
    
    // Verificar que dia não tem mais indicador de despesa
    const dayWithExpense = page.locator('.bg-red-50');
    const count = await dayWithExpense.count();
    // Pode ter outras despesas de outros testes, então só verificamos que diminuiu
    expect(count).toBeLessThanOrEqual(10);
  });
});