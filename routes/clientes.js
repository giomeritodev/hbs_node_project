const express = require('express');
const router = express.Router();

const clientes = require('./../models/cliente');

router.get('/', (req, res) => {
    clientes.findAll().then(clientes => {
        res.render('pages/cliente/clientes', {title: 'Lista de clientes', clientes});        
    }).catch(err => {
        req.flash('error_msg', 'houve um erro na busca dos dados', err.message);
        res.redirect('/clientes');
    });
});

router.get('/add', (req, res) => {
    res.render('pages/cliente/addCliente', {title: 'Adicionando novo cliente'});
});

router.post('/novo', (req, res) => {
    clientes.save(req.body).then(cliente => {
       req.flash('success_msg', 'Cliente adicionado');
       res.redirect('/clientes');
    }).catch(err => {
        req.flash('error_msg', 'Erro ao adicionar cliente', err.message); 
        res.redirect('/clientes');
    });
});

module.exports = router;