#!/bin/bash
set -e

echo "🔧 CI Setup - Iniciando configuração..."

# Criar usuário de teste
echo "👤 Criando usuário de teste..."
cd backend
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await prisma.usuario.upsert({
      where: { email: 'admin@empresa.com' },
      update: {},
      create: {
        nome: 'Admin',
        email: 'admin@empresa.com',
        senha: hashedPassword,
        perfil: 'admin'
      }
    });
    console.log('✅ Usuário criado');
  } catch (e) {
    console.log('❌ Erro:', e.message);
  } finally {
    await prisma.\$disconnect();
  }
}
createUser();
"
cd ..

# Iniciar backend
echo "🚀 Iniciando backend..."
cd backend
nohup npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd frontend
nohup npm run dev -- --port 3001 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

# Aguardar serviços
echo "⏳ Aguardando serviços iniciarem..."
for i in {1..60}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1 && curl -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Serviços prontos!"
        exit 0
    fi
    echo "Tentativa $i/60..."
    sleep 3
done

echo "❌ Timeout - Serviços não iniciaram"
exit 1