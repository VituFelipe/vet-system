const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
});

module.exports = mongoose.model('Pessoa', pessoaSchema);