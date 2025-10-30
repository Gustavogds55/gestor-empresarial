const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const senhaHash = await bcrypt.hash('123456', 10);
    
    const usuario = await prisma.usuario.upsert({
      where: { email: 'admin@empresa.com' },
      update: {},
      create: {
        nome: 'Admin',
        email: 'admin@empresa.com',
        senha: senhaHash,
        perfil: 'admin'
      }
    });
    
    console.log('Usuário criado:', usuario);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();