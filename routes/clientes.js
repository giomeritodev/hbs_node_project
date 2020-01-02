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

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    clientes.find(id).then(cliente => {
        res.render('pages/cliente/editCliente', {title: 'Alterando dados do cliente', cliente});
    }).catch(err => {
        req.flash('error_msg', 'Erro ao retornar dados');
        res.redirect('/clientes');
    });    
});

router.post('/update/:id', (req, res) => {
    const id = req.params.id;
    clientes.update(id, req.body).then(cliente => {        
        req.flash('success_msg', 'Dados alterados');
        res.redirect('/clientes');
    }).catch(err => {
        req.flash('error_msg', 'Erro ao alterar os dados do cliente', err.message);
        res.redirect('/clientes');
    });
});

module.exports = router;