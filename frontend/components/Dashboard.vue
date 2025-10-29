<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              Gestor Empresarial
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">
              Olá, {{ usuario.nome }}
            </span>
            <span class="text-sm text-gray-500 capitalize">
              ({{ usuario.perfil }})
            </span>
            <button
              @click="$emit('logout')"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Notas Fiscais</h3>
          <p class="text-gray-600">Gerencie suas notas fiscais</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Produtos</h3>
          <p class="text-gray-600">Controle de estoque</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Financeiro</h3>
          <p class="text-gray-600">Relatórios e análises</p>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Sistema!
          </h2>
          <p class="text-gray-600 mb-6">
            Seu painel de controle empresarial está sendo preparado...
          </p>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Em desenvolvimento
          </span>
        </div>
      </div>
    </main>
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
</script>