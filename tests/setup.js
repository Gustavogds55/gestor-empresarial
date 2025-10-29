import { test as setup } from '@playwright/test';

// Setup para criar usuário de teste
setup('criar usuário de teste', async ({ request }) => {
  try {
    await request.post('http://localhost:3000/api/auth/registrar', {
      data: {
        nome: 'Admin',
        email: 'admin@empresa.com',
        senha: '123456',
        perfil: 'admin'
      }
    });
  } catch (error) {
    // Usuário já existe, ignorar erro
    console.log('Usuário já existe ou erro na criação:', error.message);
  }
});