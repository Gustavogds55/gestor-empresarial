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
    
    // Obter dia atual para evitar conflitos
    const today = new Date().getDate();
    
    // Encontrar um dia válido do mês atual (diferente de hoje)
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let targetDay = null;
    const targetDayNumber = today > 15 ? 8 : 23; // Usar dia 8 ou 23 dependendo do dia atual
    
    for (const day of allDays) {
      const text = await day.textContent();
      const hasGrayText = await day.locator('.text-gray-300').count() > 0;
      const hasBlueBackground = await day.evaluate(el => el.classList.contains('bg-blue-500'));
      
      if (text && text.trim() === targetDayNumber.toString() && !hasGrayText && !hasBlueBackground) {
        targetDay = day;
        break;
      }
    }
    
    // Se não encontrou, tentar dia 5
    if (!targetDay) {
      for (const day of allDays) {
        const text = await day.textContent();
        const hasGrayText = await day.locator('.text-gray-300').count() > 0;
        const hasBlueBackground = await day.evaluate(el => el.classList.contains('bg-blue-500'));
        
        if (text && text.trim() === '5' && !hasGrayText && !hasBlueBackground) {
          targetDay = day;
          break;
        }
      }
    }
    
    // Cadastrar duas despesas
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
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
    
    // Verificar atualização do total do mês (deve ter diminuido)
    const totalAfter = await page.locator('p:has-text("Total do mês:")').textContent();
    // Verificar que o total mudou (não é mais 150)
    expect(totalBefore).not.toBe(totalAfter);
    
    // Excluir a última despesa
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await expenseCards.first().locator('button[title="Excluir"]').click();
    
    // Verificar modal de sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Fechar modal manualmente
    const closeButton = page.locator('button:has-text("Fechar")');
    if (await closeButton.count() > 0) {
      await closeButton.click();
    }
    
    // Aguardar modal fechar
    await page.waitForTimeout(500);
  });

  // CT-HOME-013: Persistência de Dados
  test('deve persistir despesas no localStorage corretamente', async ({ page }) => {
    // Verificar estrutura ano-mês como chave
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const key = `${year}-${month}`;
    
    // Encontrar dia válido
    await page.waitForSelector('.grid.grid-cols-7');
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let targetDay = null;
    
    for (const day of allDays) {
      const text = await day.textContent();
      const hasGrayText = await day.locator('.text-gray-300').count() > 0;
      const hasBlueBackground = await day.evaluate(el => el.classList.contains('bg-blue-500'));
      
      if (text && text.trim() === '7' && !hasGrayText && !hasBlueBackground) {
        targetDay = day;
        break;
      }
    }
    
    // Cadastrar despesa
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('input[step="0.01"]').fill('99.99');
    await page.locator('textarea').fill('Teste persistência');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar salvamento
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar salvamento automático no localStorage
    const storageData = await page.evaluate(() => {
      return localStorage.getItem('despesasPorMes');
    });
    
    expect(storageData).toBeTruthy();
    
    const parsedData = JSON.parse(storageData);
    expect(parsedData).toHaveProperty(key);
    expect(Array.isArray(parsedData[key])).toBe(true);
    
    // Verificar estrutura da despesa salva
    const expenses = parsedData[key];
    const savedExpense = expenses.find(e => e.descricao === 'Teste persistência');
    
    expect(savedExpense).toBeTruthy();
    expect(savedExpense.valor).toBe(99.99);
    expect(savedExpense.dia).toBe(7);
    expect(savedExpense).toHaveProperty('id');
    expect(savedExpense).toHaveProperty('categoria');
    
    // Verificar persistência após operações (dados já estão salvos)
    // Teste de carregamento automático será validado ao abrir o modal
    await page.waitForTimeout(500);
    await targetDay.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar que despesa foi carregada (está visível no modal)
    const expenseCard = page.locator('.p-4.border.border-gray-200.rounded-lg');
    await expect(expenseCard).toContainText('Teste persistência');
    await expect(expenseCard).toContainText('R$ 99,99');
  });

  // CT-HOME-014: Card Despesas de Hoje
  test('deve exibir card de despesas de hoje corretamente', async ({ page }) => {
    // Verificar título "Despesas de Hoje"
    const cardTitle = page.locator('h3:has-text("Despesas de Hoje")');
    await expect(cardTitle).toBeVisible();
    
    // Verificar altura fixa do card (224px = h-56 em Tailwind)
    const card = page.locator('.h-56').filter({ has: cardTitle });
    await expect(card).toBeVisible();
    
    // Verificar mensagem quando vazio
    const emptyMessage = page.locator('text=Nenhuma despesa hoje');
    const hasEmptyMessage = await emptyMessage.count() > 0;
    
    if (hasEmptyMessage) {
      await expect(emptyMessage).toBeVisible();
    }
    
    // Cadastrar despesa para hoje
    const today = new Date().getDate();
    await page.waitForSelector('.grid.grid-cols-7');
    
    // Encontrar dia de hoje no calendário
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let todayElement = null;
    
    for (const day of allDays) {
      const hasBlueBackground = await day.evaluate(el => el.classList.contains('bg-blue-500'));
      if (hasBlueBackground) {
        todayElement = day;
        break;
      }
    }
    
    // Se encontrou o dia de hoje, cadastrar despesa
    if (todayElement) {
      await todayElement.click();
      await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
      await page.locator('input[step="0.01"]').fill('75.50');
      await page.locator('textarea').fill('Despesa de hoje');
      await page.locator('button:has-text("Salvar")').click();
      
      await page.waitForSelector('.bg-green-100', { timeout: 5000 });
      await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
      
      // Aguardar atualização do card
      await page.waitForTimeout(1000);
      
      // Verificar que despesa aparece no card "Despesas de Hoje" usando texto específico
      const todayExpenseCard = page.locator('text=Despesa de hoje');
      await expect(todayExpenseCard).toBeVisible();
      
      const valueText = page.locator('text=R$ 75,50');
      await expect(valueText).toBeVisible();
      
      // Cadastrar segunda despesa para testar scroll
      await todayElement.click();
      await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
      await page.locator('button:has-text("+ Nova Despesa")').click();
      await page.locator('input[step="0.01"]').fill('120.00');
      await page.locator('textarea').fill('Segunda despesa hoje');
      await page.locator('button:has-text("Salvar")').click();
      
      await page.waitForSelector('.bg-green-100', { timeout: 5000 });
      await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
      
      // Aguardar atualização
      await page.waitForTimeout(1000);
      
      // Verificar que segunda despesa aparece
      const secondExpense = page.locator('text=Segunda despesa hoje');
      await expect(secondExpense).toBeVisible();
      
      // Verificar que há pelo menos 2 despesas visíveis
      const firstExpenseText = page.locator('text=Despesa de hoje');
      await expect(firstExpenseText).toBeVisible();
      await expect(secondExpense).toBeVisible();
    }
  });

  // CT-HOME-015: Lista de Despesas
  test('deve exibir lista de despesas do dia atual corretamente', async ({ page }) => {
    // Verificar se há despesas de hoje já cadastradas
    const emptyMessage = page.locator('text=Nenhuma despesa hoje');
    const hasEmpty = await emptyMessage.count() > 0;
    
    // Encontrar dia de hoje
    await page.waitForSelector('.grid.grid-cols-7');
    const allDays = await page.locator('.grid.grid-cols-7 > div').all();
    let todayElement = null;
    
    for (const day of allDays) {
      const hasBlueBackground = await day.evaluate(el => el.classList.contains('bg-blue-500'));
      if (hasBlueBackground) {
        todayElement = day;
        break;
      }
    }
    
    if (todayElement) {
      // Cadastrar despesa para hoje
      await todayElement.click();
      await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
      await page.locator('input[step="0.01"]').fill('250.75');
      await page.locator('textarea').fill('Despesa teste lista');
      await page.locator('button:has-text("Salvar")').click();
      
      await page.waitForSelector('.bg-green-100', { timeout: 5000 });
      await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
      await page.waitForTimeout(1000);
      
      // Verificar apenas despesas do dia atual
      const todayExpense = page.locator('text=Despesa teste lista');
      await expect(todayExpense).toBeVisible();
      
      // Verificar formatação de valores em reais (R$ 250,75)
      const formattedValue = page.locator('text=R$ 250,75').first();
      await expect(formattedValue).toBeVisible();
      
      // Testar atualização em tempo real - editar despesa
      await todayElement.click();
      await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
      
      const editButton = page.locator('button[title="Editar"]').first();
      await editButton.click();
      
      await page.locator('input[step="0.01"]').clear();
      await page.locator('input[step="0.01"]').fill('180.50');
      await page.locator('button:has-text("Atualizar")').click();
      
      await page.waitForSelector('.bg-green-100', { timeout: 5000 });
      await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
      await page.waitForTimeout(1000);
      
      // Verificar atualização em tempo real no card
      const updatedValue = page.locator('text=R$ 180,50').first();
      await expect(updatedValue).toBeVisible();
      
      // Verificar que valor antigo não aparece mais
      const oldValue = page.locator('text=R$ 250,75');
      const oldValueCount = await oldValue.count();
      expect(oldValueCount).toBe(0);
    }
  });

  // CT-HOME-016: Responsividade
  test('deve adaptar layout para diferentes tamanhos de tela', async ({ page }) => {
    // Testar Desktop (1024px+)
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);
    
    // Verificar sidebar visível
    const sidebar = page.locator('.w-64');
    await expect(sidebar).toBeVisible();
    
    // Verificar grid principal
    const mainGrid = page.locator('.grid.grid-cols-1.lg\\:grid-cols-3');
    await expect(mainGrid).toBeVisible();
    
    // Verificar calendário visível e usável
    const calendar = page.locator('.grid.grid-cols-7');
    await expect(calendar).toBeVisible();
    
    // Testar Tablet (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    // Verificar elementos principais ainda visíveis
    await expect(sidebar).toBeVisible();
    await expect(calendar).toBeVisible();
    
    // Verificar títulos visíveis
    const homeTitle = page.locator('h2:has-text("Home")');
    await expect(homeTitle).toBeVisible();
    
    // Testar Mobile (320px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Verificar calendário mantém usabilidade
    await expect(calendar).toBeVisible();
    
    // Verificar que elementos principais ainda funcionam
    const calendarTitle = page.locator('h3:has-text("Calendário de despesas")');
    await expect(calendarTitle).toBeVisible();
    
    // Testar interação no mobile
    const dayElement = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^10$/ }).first();
    await dayElement.click();
    
    // Verificar modal abre corretamente no mobile
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    const modal = page.locator('.fixed.inset-0');
    await expect(modal).toBeVisible();
    
    // Fechar modal
    const cancelButton = page.locator('button:has-text("Cancelar")');
    await cancelButton.click();
    
    // Voltar para desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);
    
    // Verificar que tudo volta ao normal
    await expect(sidebar).toBeVisible();
    await expect(calendar).toBeVisible();
  });

  // CT-HOME-017: Ações Rápidas
  test('deve navegar corretamente pelas ações rápidas', async ({ page }) => {
    // Verificar título "Ações Rápidas"
    const quickActionsTitle = page.locator('h3:has-text("Ações Rápidas")');
    await expect(quickActionsTitle).toBeVisible();
    
    // Verificar 3 botões
    const newPurchaseButton = page.locator('button:has-text("Nova Compra")');
    const newSaleButton = page.locator('button:has-text("Nova Venda")');
    const reportsButton = page.locator('button:has-text("Relatórios Mensais")');
    
    await expect(newPurchaseButton).toBeVisible();
    await expect(newSaleButton).toBeVisible();
    await expect(reportsButton).toBeVisible();
    
    // Verificar ícones coloridos (SVG)
    const purchaseIcon = newPurchaseButton.locator('svg');
    const saleIcon = newSaleButton.locator('svg');
    const reportIcon = reportsButton.locator('svg');
    
    await expect(purchaseIcon).toBeVisible();
    await expect(saleIcon).toBeVisible();
    await expect(reportIcon).toBeVisible();
    
    // Testar navegação - Nova Compra
    await newPurchaseButton.click();
    await expect(page.locator('h3:has-text("Gestão de Compras")')).toBeVisible();
    
    // Voltar para Home
    const menuHome = page.locator('a:has-text("Home")');
    await menuHome.click();
    await expect(page.locator('h2:has-text("Home")')).toBeVisible();
    
    // Testar navegação - Nova Venda
    await newSaleButton.click();
    await expect(page.locator('h3:has-text("Gestão de Vendas")')).toBeVisible();
    
    // Voltar para Home
    await menuHome.click();
    await expect(page.locator('h2:has-text("Home")')).toBeVisible();
    
    // Testar navegação - Relatórios Mensais
    await reportsButton.click();
    await expect(page.locator('h3:has-text("Relatórios")')).toBeVisible();
    
    // Voltar para Home
    await menuHome.click();
    await expect(page.locator('h2:has-text("Home")')).toBeVisible();
  });

  // CT-HOME-018: Comportamento dos Modais
  test('deve validar comportamento padrão dos modais', async ({ page }) => {
    // Abrir modal clicando em um dia
    await page.waitForSelector('.grid.grid-cols-7');
    const dayElement = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^14$/ }).first();
    await dayElement.click();
    
    // Aguardar modal abrir
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Verificar overlay escuro (bg-black bg-opacity-50)
    const backdrop = page.locator('.fixed.inset-0.bg-black.bg-opacity-50');
    await expect(backdrop).toBeVisible();
    
    // Verificar botão X no header
    const closeButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' });
    const closeButtonCount = await closeButton.count();
    expect(closeButtonCount).toBeGreaterThan(0);
    
    // Testar que não fecha ao clicar no conteúdo
    const modalContent = page.locator('.bg-white.rounded-xl');
    await modalContent.click();
    
    // Modal deve continuar aberto
    await expect(backdrop).toBeVisible();
    await expect(page.locator('h3:has-text("Nova Despesa")')).toBeVisible();
    
    // Testar fechamento ao clicar fora (backdrop)
    const backdropBox = await backdrop.boundingBox();
    if (backdropBox) {
      // Clicar no canto superior esquerdo do backdrop (fora do modal)
      await page.mouse.click(10, 10);
      
      // Modal deve fechar
      await page.waitForSelector('.fixed.inset-0', { state: 'hidden', timeout: 5000 });
      await expect(backdrop).not.toBeVisible();
    }
    
    // Abrir modal novamente para testar botão X
    await dayElement.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    // Testar fechamento com botão X
    const xButton = page.locator('button').filter({ has: page.locator('svg path[d*="M6 18L18 6M6 6l12 12"]') }).first();
    if (await xButton.count() > 0) {
      await xButton.click();
    } else {
      // Fallback: usar botão Cancelar
      await page.locator('button:has-text("Cancelar")').click();
    }
    
    // Modal deve fechar
    await page.waitForSelector('.fixed.inset-0', { state: 'hidden', timeout: 5000 });
    await expect(backdrop).not.toBeVisible();
  });

  // CT-HOME-019: Modal de Sucesso
  test('deve exibir modal de sucesso com feedback adequado', async ({ page }) => {
    // Cadastrar despesa para gerar modal de sucesso
    await page.waitForSelector('.grid.grid-cols-7');
    const dayElement = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^16$/ }).first();
    await dayElement.click();
    
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('input[step="0.01"]').fill('99.00');
    await page.locator('textarea').fill('Teste modal sucesso');
    await page.locator('button:has-text("Salvar")').click();
    
    // Verificar modal de sucesso aparece
    const successModal = page.locator('.bg-green-100');
    await expect(successModal).toBeVisible();
    
    // Verificar ícone check verde
    const checkIcon = successModal.locator('svg');
    await expect(checkIcon).toBeVisible();
    
    // Verificar título "Sucesso!"
    await expect(page.locator('h3:has-text("Sucesso!")')).toBeVisible();
    
    // Verificar mensagem específica
    await expect(page.locator('p:has-text("Despesa cadastrada com sucesso!")')).toBeVisible();
    
    // Verificar auto-fechamento em 2 segundos
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 3000 });
    await expect(successModal).not.toBeVisible();
    
    // Testar fechamento clicando fora
    await dayElement.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('button:has-text("+ Nova Despesa")').click();
    await page.locator('input[step="0.01"]').fill('50.00');
    await page.locator('textarea').fill('Teste fechar fora');
    await page.locator('button:has-text("Salvar")').click();
    
    // Aguardar modal de sucesso aparecer
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    
    // Clicar fora do modal de sucesso
    await page.mouse.click(10, 10);
    
    // Modal deve fechar
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 1000 });
  });

  // CT-HOME-020: Validações de Formulário
  test('deve validar formulário com feedback em tempo real', async ({ page }) => {
    // Abrir modal de nova despesa
    await page.waitForSelector('.grid.grid-cols-7');
    const dayElement = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^17$/ }).first();
    await dayElement.click();
    
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    
    const valueInput = page.locator('input[step="0.01"]');
    const descriptionInput = page.locator('textarea');
    const saveButton = page.locator('button:has-text("Salvar")');
    
    // Testar valor obrigatório
    await valueInput.click();
    await descriptionInput.click(); // blur no campo valor
    
    // Verificar mensagem de erro clara
    await expect(page.locator('.text-red-500:has-text("Campo obrigatório")')).toBeVisible();
    
    // Verificar botão salvar desabilitado
    await expect(saveButton).toBeDisabled();
    
    // Testar valor positivo (feedback visual)
    await valueInput.fill('100');
    
    // Botão deve habilitar
    await expect(saveButton).toBeEnabled();
    
    // Limpar e testar novamente
    await valueInput.clear();
    await descriptionInput.click();
    
    // Verificar feedback em tempo real
    await expect(page.locator('.text-red-500:has-text("Campo obrigatório")')).toBeVisible();
    await expect(saveButton).toBeDisabled();
    
    // Preencher valor válido
    await valueInput.fill('50.50');
    
    // Verificar descrição opcional (não obrigatória)
    await expect(saveButton).toBeEnabled();
    
    // Salvar sem descrição (deve funcionar)
    await saveButton.click();
    
    // Verificar sucesso
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await expect(page.locator('h3:has-text("Sucesso!")')).toBeVisible();
  });

  // CT-HOME-021: Cálculo do Total Mensal
  test('deve calcular e formatar total mensal corretamente', async ({ page }) => {
    // Capturar total inicial
    const totalElement = page.locator('p:has-text("Total do mês:")');
    const initialTotal = await totalElement.textContent();
    
    // Verificar formato brasileiro (R$ X,XX)
    expect(initialTotal).toMatch(/Total do mês: R\$ [0-9.,]+/);
    
    // Adicionar primeira despesa
    await page.waitForSelector('.grid.grid-cols-7');
    const day1 = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^11$/ }).first();
    await day1.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('input[step="0.01"]').fill('100.50');
    await page.locator('textarea').fill('Despesa 1');
    await page.locator('button:has-text("Salvar")').click();
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar recálculo automático
    const totalAfter1 = await totalElement.textContent();
    expect(totalAfter1).toContain('100');
    
    // Adicionar segunda despesa
    const day2 = page.locator('.grid.grid-cols-7 > div').filter({ hasText: /^21$/ }).first();
    await day2.click();
    await page.waitForSelector('.fixed.inset-0', { timeout: 5000 });
    await page.locator('input[step="0.01"]').fill('250.75');
    await page.locator('textarea').fill('Despesa 2');
    await page.locator('button:has-text("Salvar")').click();
    await page.waitForSelector('.bg-green-100', { timeout: 5000 });
    await page.waitForSelector('.bg-green-100', { state: 'hidden', timeout: 5000 });
    
    // Verificar soma (100.50 + 250.75 = 351.25)
    const totalAfter2 = await totalElement.textContent();
    expect(totalAfter2).toContain('351');
    
    // Verificar formatação brasileira (vírgula para decimais)
    expect(totalAfter2).toMatch(/R\$ [0-9]+,[0-9]{2}/);
    
    // Verificar consideração apenas do mês atual
    expect(totalAfter2).toContain('Total do mês:');
  });

});