#!/bin/bash

echo "⏳ Aguardando serviços..."

# Aguardar backend
for i in {1..60}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Backend OK"
        break
    fi
    sleep 1
done

# Aguardar frontend
for i in {1..60}; do
    if curl -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Frontend OK"
        echo "🧪 Executando testes..."
        npm test
        exit 0
    fi
    sleep 1
done

echo "❌ Serviços não iniciaram"
exit 1