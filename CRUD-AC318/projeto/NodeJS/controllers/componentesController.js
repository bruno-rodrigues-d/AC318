const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Componentes } = require('../models/componentes');

// => localhost:3000/componentes/
router.get('/', (req,res) => {
    Componentes.find( (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Componentes :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Componentes.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Componentes :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var comp = new Componentes({
        codigo: req.body.codigo,
        nome: req.body.nome,
        valor: req.body.valor,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
    });
    comp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Componentes Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var comp = {
        codigo: req.body.codigo,
        nome: req.body.nome,
        valor: req.body.valor,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
    };
    Componentes.findByIdAndUpdate(req.params.id, { $set: comp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Componentes Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Componentes.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Componentes Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;