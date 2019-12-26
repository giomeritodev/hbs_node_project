const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/cliente/clientes', {title: 'Lista de clientes'});
});

router.get('/add', (req, res) => {
    res.render('pages/cliente/addCliente', {title: 'Adicionando novo cliente'});
});

module.exports = router;