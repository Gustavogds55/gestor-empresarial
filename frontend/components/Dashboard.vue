<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white/90 backdrop-blur-sm shadow-xl border-r border-blue-100">
      <!-- Logo -->
      <div class="flex items-center justify-center h-16 px-4 border-b border-blue-200">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 class="text-lg font-semibold text-gray-900">
            Gestor Empresarial
          </h1>
        </div>
      </div>
      
      <!-- Menu -->
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <a href="#" 
             :class="menuAtivo === 'dashboard' ? 'bg-blue-100/80 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-blue-50/50'"
             @click="menuAtivo = 'dashboard'"
             class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Home
          </a>
          
          <a href="#" 
             :class="menuAtivo === 'compras' ? 'bg-blue-100/80 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-blue-50/50'"
             @click="menuAtivo = 'compras'"
             class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            Compras
          </a>
          
          <a href="#" 
             :class="menuAtivo === 'vendas' ? 'bg-blue-100/80 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-blue-50/50'"
             @click="menuAtivo = 'vendas'"
             class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Vendas
          </a>
          
          <a href="#" 
             :class="menuAtivo === 'relatorios' ? 'bg-blue-100/80 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-blue-50/50'"
             @click="menuAtivo = 'relatorios'"
             class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Relatórios
          </a>
        </div>
      </nav>
    </div>
    
    <!-- Conteúdo Principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header :class="[
        'backdrop-blur-sm shadow-sm border-b transition-colors duration-300',
        temaEscuro ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-blue-100'
      ]">
        <div class="px-6 h-16 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">{{ tituloSecao }}</h2>
          
          <!-- Usuário -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span class="text-sm font-medium text-white">{{ usuario.nome.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="hidden sm:block">
                <p :class="[
                  'text-sm font-medium transition-colors duration-300',
                  temaEscuro ? 'text-gray-200' : 'text-gray-700'
                ]">{{ usuario.nome }}</p>
                <p :class="[
                  'text-xs capitalize transition-colors duration-300',
                  temaEscuro ? 'text-gray-400' : 'text-gray-500'
                ]">{{ usuario.perfil === 'admin' ? 'Administrador' : usuario.perfil }}</p>
              </div>
            </div>
            <button
              @click="$emit('logout')"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <!-- Conteúdo -->
      <main :class="[
        'flex-1 p-6 overflow-auto transition-colors duration-300',
        temaEscuro ? 'bg-gradient-to-br from-gray-900/30 via-transparent to-gray-800/30' : 'bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/30'
      ]">
        <!-- Dashboard -->
        <div v-if="menuAtivo === 'dashboard'">


      <!-- Grid Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Obrigações e Ações Rápidas -->
        <div class="space-y-6">
          <!-- Despesas de Hoje -->
          <div :class="[
            'backdrop-blur-sm rounded-xl shadow-lg border transition-colors duration-300 h-56 flex flex-col',
            temaEscuro ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-blue-100'
          ]">
            <div :class="[
              'px-6 py-4 border-b transition-colors duration-300 flex-shrink-0',
              temaEscuro ? 'border-gray-700' : 'border-blue-200'
            ]">
              <h3 :class="[
                'text-lg font-medium transition-colors duration-300',
                temaEscuro ? 'text-white' : 'text-gray-900'
              ]">Despesas de Hoje</h3>
            </div>
            <div class="p-6 flex-1 overflow-hidden">
              <div class="space-y-3 h-full overflow-y-auto">
                <div 
                  v-for="despesa in despesasHoje" 
                  :key="despesa.id"
                  class="p-3 rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">{{ despesa.descricao }}</p>
                    <p class="font-semibold text-gray-900">R$ {{ despesa.valor.toFixed(2).replace('.', ',') }}</p>
                  </div>
                </div>
                <div v-if="despesasHoje.length === 0" class="text-center py-8 text-gray-500">
                  Nenhuma despesa hoje
                </div>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div :class="[
            'backdrop-blur-sm rounded-xl shadow-lg border transition-colors duration-300',
            temaEscuro ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-blue-100'
          ]">
            <div :class="[
              'px-6 py-4 border-b transition-colors duration-300',
              temaEscuro ? 'border-gray-700' : 'border-blue-200'
            ]">
              <h3 :class="[
                'text-lg font-medium transition-colors duration-300',
                temaEscuro ? 'text-white' : 'text-gray-900'
              ]">Ações Rápidas</h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <button @click="menuAtivo = 'compras'" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span class="font-medium">Nova Compra</span>
                  </div>
                </button>
                <button @click="menuAtivo = 'vendas'" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span class="font-medium">Nova Venda</span>
                  </div>
                </button>
                <button @click="menuAtivo = 'relatorios'" class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span class="font-medium">Relatórios Mensais</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendário MEI -->
        <div class="lg:col-span-2">
          <div :class="[
            'backdrop-blur-sm rounded-xl shadow-lg border transition-colors duration-300',
            temaEscuro ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-blue-100'
          ]">
          <div :class="[
            'px-6 py-4 border-b transition-colors duration-300',
            temaEscuro ? 'border-gray-700' : 'border-blue-200'
          ]">
            <div class="flex items-center justify-between">
              <div>
                <h3 :class="[
                  'text-lg font-medium transition-colors duration-300',
                  temaEscuro ? 'text-white' : 'text-gray-900'
                ]">Calendário de despesas</h3>
                <p :class="[
                  'text-sm transition-colors duration-300',
                  temaEscuro ? 'text-gray-400' : 'text-gray-500'
                ]">Total do mês: R$ {{ formatarMoeda(totalDespesasMes) }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="navegarMes(-1)"
                  class="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div class="text-center min-w-[120px]">
                  <div class="text-lg font-semibold text-gray-900">{{ mesAtual }}</div>
                  <div class="text-sm text-gray-500">{{ anoAtual }}</div>
                </div>
                <button 
                  @click="navegarMes(1)"
                  class="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <!-- Calendário -->
            <div class="grid grid-cols-7 gap-1 mb-6">
              <div v-for="dia in diasSemana" :key="dia" class="p-3 text-center font-semibold text-gray-600 text-sm">
                {{ dia }}
              </div>
              <div 
                v-for="dia in diasDoMes" 
                :key="dia.data" 
                :class="[
                  'p-2 text-center text-sm border rounded-lg cursor-pointer transition-all duration-200 min-h-[48px] flex flex-col items-center justify-center relative',
                  dia.isHoje ? 'bg-blue-500 text-white font-bold shadow-md' : '',
                  dia.temObrigacao && !dia.isHoje ? 'bg-red-50 border-red-200 hover:bg-red-100' : '',
                  !dia.temObrigacao && !dia.isHoje ? 'hover:bg-gray-50 border-gray-200' : '',
                  !dia.doMesAtual ? 'text-gray-300 bg-gray-50' : 'text-gray-900'
                ]"
                @click="mostrarDetalhes(dia)"
              >
                <span class="text-sm font-medium">{{ dia.numero }}</span>
                <div v-if="dia.temObrigacao" :class="[
                  'w-2 h-2 rounded-full mt-1',
                  dia.isHoje ? 'bg-white' : 'bg-red-500'
                ]"></div>
                <!-- Badge para múltiplas obrigações -->
                <div v-if="dia.quantidadeObrigacoes > 1" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ dia.quantidadeObrigacoes }}
                </div>
              </div>
            </div>
            
            <!-- Legenda -->
            <div class="flex items-center justify-center space-x-6 text-sm">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span class="text-gray-600">Hoje</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span class="text-gray-600">Obrigações</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
        </div>
        
        <!-- Compras -->
        <div v-if="menuAtivo === 'vendas'">
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Gestão de Vendas</h3>
            <p class="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        </div>
        
        <!-- Compras -->
        <div v-if="menuAtivo === 'compras'">
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Gestão de Compras</h3>
            <p class="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        </div>
        
        <!-- Relatórios -->
        <div v-if="menuAtivo === 'relatorios'">
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Relatórios</h3>
            <p class="text-gray-600">Funcionalidade em desenvolvimento...</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de Despesas -->
    <div v-if="modalAberto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="fecharModal()">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4" @click.stop>
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ modoModal === 'adicionar' ? 'Nova Despesa' : modoModal === 'editar' ? 'Editar Despesa' : 'Despesas do Dia' }}
            </h3>
            <button @click="fecharModal()" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            {{ diaSelecionado?.numero }} de {{ mesAtual }}, {{ anoAtual }}
          </p>
        </div>

        <!-- Conteúdo -->
        <div class="p-6">
          <!-- Modo Adicionar/Editar -->
          <div v-if="modoModal === 'adicionar' || modoModal === 'editar'">
            <form @submit.prevent="salvarDespesa()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input 
                  v-model="formularioDespesa.valor" 
                  type="number" 
                  step="0.01" 
                  placeholder="0,00"
                  :class="[
                    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                    errosFormulario.valor ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  ]"
                  @blur="validarCampo('valor')"
                  @input="validarCampo('valor')"
                >
                <p v-if="errosFormulario.valor" class="text-red-500 text-sm mt-1">{{ errosFormulario.valor }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  v-model="formularioDespesa.descricao" 
                  placeholder="Descreva a despesa..."
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div class="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  @click="fecharModal()" 
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  :disabled="errosFormulario.valor || !formularioDespesa.valor"
                  :class="[
                    'flex-1 px-4 py-2 rounded-md transition-colors',
                    (errosFormulario.valor || !formularioDespesa.valor)
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  ]"
                >
                  {{ modoModal === 'editar' ? 'Atualizar' : 'Salvar' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Modo Visualizar -->
          <div v-else>
            <div class="space-y-3">
              <div 
                v-for="despesa in diaSelecionado?.obrigacoes" 
                :key="despesa.id"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ despesa.categoria }}</h4>
                  <div class="flex space-x-2">
                    <button 
                      @click="editarDespesa(despesa)"
                      class="text-blue-500 hover:text-blue-700"
                      title="Editar"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      @click="excluirDespesa(despesa.id)"
                      class="text-red-500 hover:text-red-700"
                      title="Excluir"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="text-gray-600 text-sm mb-2">{{ despesa.descricao }}</p>
                <p class="font-semibold text-gray-900">R$ {{ despesa.valor.toFixed(2).replace('.', ',') }}</p>
              </div>
            </div>
            <div class="flex space-x-3 pt-4">
              <button 
                @click="modoModal = 'adicionar'; formularioDespesa = { valor: '', descricao: '' }; despesaEditando = null; limparErros()" 
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                + Nova Despesa
              </button>
              <button 
                @click="fecharModal()" 
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Sucesso -->
    <div v-if="modalSucesso.aberto" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="modalSucesso.aberto = false">
      <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300" @click.stop>
        <div class="p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ modalSucesso.titulo }}</h3>
          <p class="text-gray-600">{{ modalSucesso.mensagem }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  usuario: {
    type: Object,
    required: true
  }
})

defineEmits(['logout'])

// Dados reativos
const menuAtivo = ref('dashboard')
const metricas = ref({
  notasMes: 0,
  faturamentoMes: 0,
  compras: 0,
  despesas: 0
})

// Títulos das seções
const titulos = {
  dashboard: 'Home',
  compras: 'Compras',
  vendas: 'Vendas',
  relatorios: 'Relatórios'
}

const tituloSecao = computed(() => titulos[menuAtivo.value] || 'Dashboard')

// Despesas de hoje
const despesasHoje = computed(() => {
  const hoje = new Date()
  const diaHoje = hoje.getDate()
  const mesHoje = hoje.getMonth()
  const anoHoje = hoje.getFullYear()
  
  const chave = `${anoHoje}-${mesHoje}`
  const despesas = despesasPorMes.value[chave] || []
  
  return despesas.filter(despesa => despesa.dia === diaHoje)
})

// Total de despesas do mês atual
const totalDespesasMes = computed(() => {
  const chave = `${anoAtualIndex.value}-${mesAtualIndex.value}`
  const despesas = despesasPorMes.value[chave] || []
  
  return despesas.reduce((total, despesa) => total + despesa.valor, 0)
})

const mesAtual = ref('')
const anoAtual = ref(0)
const mesAtualFixo = ref('')

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const diasDoMes = ref([])
const obrigacoesMes = ref([])

// Modal e formulário
const modalAberto = ref(false)
const diaSelecionado = ref(null)
const modoModal = ref('adicionar') // 'adicionar', 'visualizar' ou 'editar'
const despesaEditando = ref(null)
const formularioDespesa = ref({
  valor: '',
  descricao: ''
})

// Validação do formulário
const errosFormulario = ref({
  valor: ''
})

const validarCampo = (campo) => {
  if (campo === 'valor') {
    if (!formularioDespesa.value.valor || formularioDespesa.value.valor === '') {
      errosFormulario.value.valor = 'Campo obrigatório'
    } else {
      errosFormulario.value.valor = ''
    }
  }
}

const limparErros = () => {
  errosFormulario.value.valor = ''
}



// Modal de sucesso
const modalSucesso = ref({
  aberto: false,
  titulo: '',
  mensagem: ''
})

// Carregar despesas do localStorage ou usar dados de exemplo
const carregarDespesasLocalStorage = () => {
  const despesasSalvas = localStorage.getItem('despesasPorMes')
  if (despesasSalvas) {
    return JSON.parse(despesasSalvas)
  }
  return {
    '2024-0': [ // Janeiro 2024
      { id: 1, dia: 5, valor: 250.00, categoria: 'Aluguel', descricao: 'Aluguel do escritório' },
      { id: 2, dia: 10, valor: 80.50, categoria: 'Internet', descricao: 'Conta de internet' },
      { id: 3, dia: 15, valor: 120.00, categoria: 'Material', descricao: 'Material de escritório' },
      { id: 4, dia: 20, valor: 45.30, categoria: 'Transporte', descricao: 'Combustível' },
      { id: 5, dia: 25, valor: 200.00, categoria: 'Marketing', descricao: 'Anúncios online' }
    ]
  }
}

// Despesas por mês (reativo)
const despesasPorMes = ref(carregarDespesasLocalStorage())

// Salvar no localStorage sempre que despesas mudarem
const salvarDespesasLocalStorage = () => {
  localStorage.setItem('despesasPorMes', JSON.stringify(despesasPorMes.value))
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// Métodos
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR').format(valor)
}

// Variáveis para navegação do calendário
const mesAtualIndex = ref(new Date().getMonth())
const anoAtualIndex = ref(new Date().getFullYear())

const gerarCalendario = (mes = mesAtualIndex.value, ano = anoAtualIndex.value) => {
  const hoje = new Date()
  
  mesAtual.value = meses[mes]
  anoAtual.value = ano
  
  const primeiroDia = new Date(ano, mes, 1)
  const ultimoDia = new Date(ano, mes + 1, 0)
  const diasAnteriores = primeiroDia.getDay()
  const mesAnterior = new Date(ano, mes, 0)
  
  const dias = []
  
  // Dias do mês anterior
  for (let i = diasAnteriores - 1; i >= 0; i--) {
    const dia = mesAnterior.getDate() - i
    dias.push({
      numero: dia,
      data: `${ano}-${mes}-${dia}`,
      doMesAtual: false,
      isHoje: false,
      temObrigacao: false,
      quantidadeObrigacoes: 0
    })
  }
  
  // Dias do mês atual
  for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
    const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()
    const chave = `${ano}-${mes}`
    const despesasDia = despesasPorMes.value[chave]?.filter(d => d.dia === dia) || []
    const temDespesa = despesasDia.length > 0
    
    dias.push({
      numero: dia,
      data: `${ano}-${mes + 1}-${dia}`,
      doMesAtual: true,
      isHoje,
      temObrigacao: temDespesa,
      quantidadeObrigacoes: despesasDia.length,
      obrigacoes: despesasDia
    })
  }
  
  // Dias do próximo mês
  const diasRestantes = 42 - dias.length
  for (let dia = 1; dia <= diasRestantes; dia++) {
    dias.push({
      numero: dia,
      data: `${ano}-${mes + 2}-${dia}`,
      doMesAtual: false,
      isHoje: false,
      temObrigacao: false,
      quantidadeObrigacoes: 0
    })
  }
  
  diasDoMes.value = dias
  // Atualizar obrigações do mês
  const chave = `${ano}-${mes}`
  const despesasDoMes = despesasPorMes.value[chave] || []
  obrigacoesMes.value = despesasDoMes.map(despesa => ({
    id: despesa.id,
    titulo: despesa.categoria,
    descricao: despesa.descricao,
    valor: `R$ ${despesa.valor.toFixed(2).replace('.', ',')}`,
    tipo: 'Despesa',
    categoria: 'Mensal'
  }))
}

const navegarMes = (direcao) => {
  mesAtualIndex.value += direcao
  
  if (mesAtualIndex.value > 11) {
    mesAtualIndex.value = 0
    anoAtualIndex.value++
  } else if (mesAtualIndex.value < 0) {
    mesAtualIndex.value = 11
    anoAtualIndex.value--
  }
  
  gerarCalendario(mesAtualIndex.value, anoAtualIndex.value)
}

const mostrarDetalhes = (dia) => {
  if (!dia.doMesAtual) return
  
  diaSelecionado.value = dia
  limparErros()
  
  if (dia.temObrigacao) {
    modoModal.value = 'visualizar'
  } else {
    modoModal.value = 'adicionar'
    formularioDespesa.value = { valor: '', descricao: '' }
  }
  
  modalAberto.value = true
}

const editarDespesa = (despesa) => {
  despesaEditando.value = despesa
  formularioDespesa.value = {
    valor: despesa.valor.toString(),
    descricao: despesa.descricao
  }
  modoModal.value = 'editar'
  limparErros()
}

const mostrarSucesso = (titulo, mensagem) => {
  modalSucesso.value = {
    aberto: true,
    titulo,
    mensagem
  }
  setTimeout(() => {
    modalSucesso.value.aberto = false
  }, 2000)
}

const fecharModal = () => {
  modalAberto.value = false
  diaSelecionado.value = null
  despesaEditando.value = null
  limparErros()
}

const salvarDespesa = () => {
  validarCampo('valor')
  if (errosFormulario.value.valor) return
  
  const chave = `${anoAtualIndex.value}-${mesAtualIndex.value}`
  
  if (modoModal.value === 'editar') {
    // Editar despesa existente
    const despesas = despesasPorMes.value[chave] || []
    const index = despesas.findIndex(d => d.id === despesaEditando.value.id)
    if (index !== -1) {
      despesas[index] = {
        ...despesas[index],
        valor: parseFloat(formularioDespesa.value.valor),
        descricao: formularioDespesa.value.descricao
      }
      mostrarSucesso('Sucesso!', 'Despesa alterada com sucesso!')
    }
  } else {
    // Adicionar nova despesa
    if (!despesasPorMes.value[chave]) {
      despesasPorMes.value[chave] = []
    }
    
    const novaDespesa = {
      id: Date.now(),
      dia: diaSelecionado.value.numero,
      valor: parseFloat(formularioDespesa.value.valor),
      categoria: 'Despesa',
      descricao: formularioDespesa.value.descricao
    }
    
    despesasPorMes.value[chave].push(novaDespesa)
    mostrarSucesso('Sucesso!', 'Despesa cadastrada com sucesso!')
  }
  
  salvarDespesasLocalStorage()
  gerarCalendario(mesAtualIndex.value, anoAtualIndex.value)
  fecharModal()
}

const excluirDespesa = (despesaId) => {
  const chave = `${anoAtualIndex.value}-${mesAtualIndex.value}`
  if (despesasPorMes.value[chave]) {
    despesasPorMes.value[chave] = despesasPorMes.value[chave].filter(d => d.id !== despesaId)
    salvarDespesasLocalStorage()
    gerarCalendario(mesAtualIndex.value, anoAtualIndex.value)
    
    // Atualizar modal imediatamente
    if (diaSelecionado.value) {
      const despesasAtualizadas = despesasPorMes.value[chave]?.filter(d => d.dia === diaSelecionado.value.numero) || []
      diaSelecionado.value.obrigacoes = despesasAtualizadas
      diaSelecionado.value.temObrigacao = despesasAtualizadas.length > 0
      diaSelecionado.value.quantidadeObrigacoes = despesasAtualizadas.length
    }
    
    mostrarSucesso('Sucesso!', 'Despesa excluída com sucesso!')
  }
}

const abrirModalDia = (diaInfo) => {
  // Encontrar o dia no calendário
  const diaCalendario = diasDoMes.value.find(d => d.numero === diaInfo.dia && d.doMesAtual)
  if (diaCalendario) {
    diaSelecionado.value = diaCalendario
    modoModal.value = 'visualizar'
    modalAberto.value = true
  }
}

const carregarMetricas = async () => {
  try {
    // Simular dados do mês atual
    const faturamentoMes = 8750.30
    const notasMes = 12
    const compras = 3250.80
    
    metricas.value = {
      notasMes,
      faturamentoMes,
      compras,
      despesas: totalDespesasMes.value
    }
  } catch (error) {
    console.error('Erro ao carregar métricas:', error)
  }
}



// Watcher para atualizar métricas quando despesas mudam
watch(totalDespesasMes, () => {
  carregarMetricas()
})

onMounted(() => {
  // Definir mês atual fixo
  const hoje = new Date()
  mesAtualFixo.value = meses[hoje.getMonth()]
  
  gerarCalendario()
  carregarMetricas()
})
</script>