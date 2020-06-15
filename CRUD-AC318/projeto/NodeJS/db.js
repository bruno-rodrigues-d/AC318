const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Crud-AC318', (err) => {
    if (!err)
        console.log('MongoDB conectou com sucesso.');
    else
        console.log('Erro na conexão: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;