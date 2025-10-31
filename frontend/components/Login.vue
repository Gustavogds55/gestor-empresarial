<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-100 p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-light text-blue-900 mb-3 tracking-wide">
            Gestor Empresarial
          </h1>
          <p class="text-blue-600 text-sm">Faça login para continuar</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-3 w-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                v-model="formData.email"
                type="email"
                maxlength="50"
                @blur="validateEmail"
                class="w-full pl-12 pr-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Email"
              />
            </div>
            <div v-if="emailError" class="mt-1 text-red-500 text-xs">
              {{ emailError }}
            </div>
          </div>
          
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-3 w-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="formData.senha"
                type="password"
                maxlength="8"
                @blur="validateSenha"
                class="w-full pl-12 pr-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-sm"
                placeholder="Senha"
              />
            </div>
            <div v-if="senhaError" class="mt-1 text-red-500 text-xs">
              {{ senhaError }}
            </div>
          </div>

          <div v-if="error" class="bg-red-50/80 border border-red-200/50 rounded-xl p-3">
            <p class="text-red-600 text-sm text-center font-light">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 text-sm"
          >
            <div v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            </div>
            <span v-else>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

const emit = defineEmits(['login'])

const formData = reactive({
  email: '',
  senha: ''
})

const loading = ref(false)
const error = ref('')
const emailError = ref('')
const senhaError = ref('')

const validateEmail = () => {
  if (!formData.email) {
    emailError.value = 'Campo obrigatório'
  } else if (formData.email.length > 50) {
    emailError.value = 'Email deve ter no máximo 50 caracteres'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    emailError.value = 'Email inválido'
  } else {
    emailError.value = ''
  }
}

const validateSenha = () => {
  if (!formData.senha) {
    senhaError.value = 'Campo obrigatório'
  } else if (formData.senha.length > 8) {
    senhaError.value = 'Senha deve ter no máximo 8 caracteres'
  } else {
    senhaError.value = ''
  }
}

watch(() => formData.email, () => {
  if (emailError.value) {
    validateEmail()
  }
  if (error.value) {
    error.value = ''
  }
})

watch(() => formData.senha, () => {
  if (senhaError.value) {
    validateSenha()
  }
  if (error.value) {
    error.value = ''
  }
})



const handleSubmit = async () => {
  validateEmail()
  validateSenha()
  
  if (emailError.value || senhaError.value) {
    return
  }
  
  loading.value = true
  error.value = ''

  try {
    // Pequeno delay para testes capturarem o estado de loading
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const response = await $api.post('/auth/login', formData)
    const { token, usuario } = response.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    
    // Aguardar próximo tick para garantir que localStorage foi persistido
    await nextTick()
    
    // Limpar erro de login
    error.value = ''
    
    // Adicionar atributo no body para testes detectarem
    document.body.setAttribute('data-login-complete', 'true')
    
    emit('login', usuario)
  } catch (err) {
    error.value = err.response?.data?.error || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>