#!/bin/bash

echo "🚀 Iniciando serviços..."

# Backend
cd backend
nohup npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Frontend  
cd frontend
nohup npm run dev -- --port 3001 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

# Aguardar serviços
echo "Aguardando serviços iniciarem..."
sleep 20

echo "✅ Serviços iniciados!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:3001"