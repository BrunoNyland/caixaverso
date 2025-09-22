const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/controllers/userController');

const PORT = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Configuração CORS
app.use(cors({
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}/api`);
  console.log(`Site pode ser acessado em http://localhost:${PORT}/`);
});
