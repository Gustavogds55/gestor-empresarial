#!/bin/bash

echo "🔍 Verificando serviços..."

# Verificar se backend está rodando
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Backend não está rodando na porta 3000"
    echo "Execute: ./start-services.sh"
    exit 1
fi

# Verificar se frontend está rodando
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "❌ Frontend não está rodando na porta 3001"
    echo "Execute: ./start-services.sh"
    exit 1
fi

echo "✅ Serviços rodando!"
echo "🧪 Executando testes..."
npm test