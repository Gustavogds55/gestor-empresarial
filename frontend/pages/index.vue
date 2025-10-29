<template>
  <div>
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-lg">Carregando...</div>
    </div>
    
    <Dashboard 
      v-else-if="usuario" 
      :usuario="usuario" 
      @logout="handleLogout" 
    />
    
    <Login 
      v-else 
      @login="handleLogin" 
    />
  </div>
</template>

<script setup>
import Login from '~/components/Login.vue'
import Dashboard from '~/components/Dashboard.vue'

const usuario = ref(null)
const loading = ref(true)

onMounted(() => {
  // Verificar se há usuário logado no localStorage
  const token = localStorage.getItem('token')
  const usuarioSalvo = localStorage.getItem('usuario')
  
  if (token && usuarioSalvo) {
    usuario.value = JSON.parse(usuarioSalvo)
  }
  
  loading.value = false
})

const handleLogin = (dadosUsuario) => {
  usuario.value = dadosUsuario
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  usuario.value = null
}
</script>