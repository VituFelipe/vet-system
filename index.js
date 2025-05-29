require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const pessoaRoutes = require('./routes/pessoa');
const animalRoutes = require('./routes/animal');
const servicoRoutes = require('./routes/servico');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/animais', animalRoutes);
app.use('/api/servicos', servicoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});