#!/bin/bash

echo "🛑 Parando serviços..."

# Matar processos nas portas 3000 e 3001
pkill -f "node.*3000" 2>/dev/null || true
pkill -f "node.*3001" 2>/dev/null || true

echo "✅ Serviços parados!"