#!/bin/bash

echo "🚀 Configurando ambiente de testes..."

# Instalar dependências raiz
echo "📦 Instalando dependências raiz..."
npm install

# Setup Backend
echo "🔧 Configurando Backend..."
cd backend
npm install
if [ ! -f .env ]; then
    echo "DATABASE_URL=mysql://root:password@localhost:3306/gestor_empresarial" > .env
    echo "JWT_SECRET=your-secret-key" >> .env
    echo "⚠️  Configure o .env com suas credenciais MySQL"
fi
npx prisma migrate dev --name init
cd ..

# Setup Frontend
echo "🎨 Configurando Frontend..."
cd frontend
npm install
cd ..

# Instalar Playwright
echo "🎭 Instalando Playwright..."
npx playwright install chromium

echo "✅ Setup concluído!"
echo ""
echo "Para executar os testes:"
echo "1. Inicie os serviços: npm run start:services"
echo "2. Execute os testes: npm test"