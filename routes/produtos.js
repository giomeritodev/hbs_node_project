const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/produto/produtos', {title: 'Lista de produtos'});
});

router.get('/add', (req, res) => {
   res.render('pages/produto/addProduto', {title: 'Adicionando novo item'}); 
});

router.post('/novo', (req, res) => {
    
});

module.exports = router;