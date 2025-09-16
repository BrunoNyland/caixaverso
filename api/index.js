const express = require('express');
const app = express();
const userRoutes = require('./src/controllers/userController');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
