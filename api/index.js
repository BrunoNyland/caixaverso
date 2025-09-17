const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/controllers/userController');

const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Configuração CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:5500', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
