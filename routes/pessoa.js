const express = require('express');
const Pessoa = require('../models/Pessoa');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// Criar pessoa
router.post('/', async (req, res) => {
  try {
    const pessoa = new Pessoa(req.body);
    await pessoa.save();
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pessoa.', error: error.message });
  }
});

// Listar pessoas
router.get('/', async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pessoas.', error: error.message });
  }
});

module.exports = router;