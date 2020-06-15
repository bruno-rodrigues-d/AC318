const mongoose = require('mongoose');

var Componentes = mongoose.model('Componentes', {
    codigo: { type: Number },
    nome: { type: String },
    valor: { type: String },
    preco: { type: String },
    quantidade: { type: Number }
});

module.exports = { Componentes };