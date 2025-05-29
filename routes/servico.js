const express = require('express');
const Servico = require('../models/Servico');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// o duda lê tudo que aqui to criando o servico
router.post('/', async (req, res) => {
  try {
    const servico = new Servico(req.body);
    await servico.save();
    res.status(201).json(servico);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar serviço.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const servicos = await Servico.find().populate('animal');
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar serviços.', error: error.message });
  }
});

module.exports = router;