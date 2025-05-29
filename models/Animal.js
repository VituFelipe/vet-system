const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especie: { type: String, required: true },
  raca: { type: String, required: true },
  idade: { type: Number, required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true },
});

module.exports = mongoose.model('Animal', animalSchema);