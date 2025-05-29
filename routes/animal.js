const express = require('express');
const Animal = require('../models/Animal');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// Criar animal
router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar animal.', error: error.message });
  }
});

// Listar animais
router.get('/', async (req, res) => {
  try {
    const animais = await Animal.find().populate('tutor');
    res.json(animais);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar animais.', error: error.message });
  }
});

module.exports = router;