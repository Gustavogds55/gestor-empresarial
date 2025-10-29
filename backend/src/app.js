const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const notaFiscalRoutes = require('./routes/notaFiscalRoutes');
const authRoutes = require('./routes/authRoutes');

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Gestor Empresarial funcionando!' });
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});