<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white/90 backdrop-blur-sm shadow-xl border-r border-blue-100">
      <!-- Logo -->
      <div class="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 class="text-lg font-semibold text-gray-900">
          Gestor Empresarial
        </h1>
      </div>
      
      <!-- Menu -->
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <a href="#" 
             :class="menuAtivo === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'"
             @click="menuAtivo = 'dashboard'"
             class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Dashboard
          </a>
          
          


        </div>
        

      </nav>
    </div>
    
    <!-- Conteúdo Principal -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div class="px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">{{ tituloSecao }}</h2>
          
          <!-- Usuário -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span class="text-sm font-medium text-white">{{ usuario.nome.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="hidden sm:block">
                <p class="text-sm font-medium text-gray-700">{{ usuario.nome }}</p>
                <p class="text-xs text-gray-500 capitalize">{{ usuario.perfil }}</p>
              </div>
            </div>
            <button
              @click="$emit('logout')"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <!-- Conteúdo -->
      <main class="flex-1 p-6 overflow-auto bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/30">
        <!-- Dashboard -->
        <div v-if="menuAtivo === 'dashboard'">
      <!-- Métricas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dl>
                <dt class="text-xs font-medium text-gray-500 truncate">Notas</dt>
                <dd class="text-base font-medium text-gray-900">{{ metricas.notasMes }}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dl>
                <dt class="text-xs font-medium text-gray-500 truncate">Vendas</dt>
                <dd class="text-base font-medium text-gray-900">R$ {{ formatarMoeda(metricas.faturamentoMes) }}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dl>
                <dt class="text-xs font-medium text-gray-500 truncate">Compras</dt>
                <dd class="text-base font-medium text-gray-900">R$ {{ formatarMoeda(metricas.compras) }}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1">
              <dl>
                <dt class="text-xs font-medium text-gray-500 truncate">Despesas</dt>
                <dd class="text-base font-medium text-gray-900">R$ {{ formatarMoeda(metricas.despesas) }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Obrigações e Ações Rápidas -->
        <div class="space-y-6">
          <!-- Obrigações do Mês -->
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
            <div class="px-6 py-4 border-b border-blue-200">
              <h3 class="text-lg font-medium text-gray-900">Despesas do mês</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div 
                  v-for="obrigacao in obrigacoesMes" 
                  :key="obrigacao.id"
                  class="p-4 rounded-lg border-l-4 border-red-500 bg-red-50"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-gray-900">{{ obrigacao.titulo }}</h4>
                    <span class="text-xs font-medium px-2 py-1 rounded bg-red-200 text-red-800">
                      {{ obrigacao.tipo }}
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">{{ obrigacao.descricao }}</p>
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-medium text-gray-700">Valor: {{ obrigacao.valor }}</span>
                    <span class="text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-800">
                      {{ obrigacao.categoria }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ações Rápidas -->
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
            <div class="px-6 py-4 border-b border-blue-200">
              <h3 class="text-lg font-medium text-gray-900">Ações Rápidas</h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span class="font-medium">Nova Compra</span>
                  </div>
                </button>
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span class="font-medium">Nova Venda</span>
                  </div>
                </button>
                <button class="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
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
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
          <div class="px-6 py-4 border-b border-blue-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Calendário de despesas</h3>
                <p class="text-sm text-gray-500">Gerencie suas despesas mensais</p>
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
      </main>
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
  dashboard: 'Dashboard'
}

const tituloSecao = computed(() => titulos[menuAtivo.value] || 'Dashboard')

const mesAtual = ref('')
const anoAtual = ref(0)
const mesAtualFixo = ref('')

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const diasDoMes = ref([])
const obrigacoesMes = ref([])

// Despesas por mês (vazio inicialmente)
const despesasPorMes = {}

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
    const despesasDia = [] // Vazio por enquanto, será preenchido futuramente
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
  obrigacoesMes.value = [] // Vazio por enquanto
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
  if (dia.temObrigacao && dia.doMesAtual) {
    // Aqui pode implementar modal ou tooltip com detalhes
    console.log('Obrigações do dia:', dia.obrigacoes)
  }
}

const carregarMetricas = async () => {
  try {
    const hoje = new Date()
    const diasNoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate()
    
    // Simular dados do mês atual
    const faturamentoMes = 8750.30
    const notasMes = 12
    const compras = 3250.80
    const despesas = 1850.40
    
    metricas.value = {
      notasMes,
      faturamentoMes,
      compras,
      despesas
    }
  } catch (error) {
    console.error('Erro ao carregar métricas:', error)
  }
}



onMounted(() => {
  // Definir mês atual fixo
  const hoje = new Date()
  mesAtualFixo.value = meses[hoje.getMonth()]
  
  gerarCalendario()
  carregarMetricas()
})
</script>