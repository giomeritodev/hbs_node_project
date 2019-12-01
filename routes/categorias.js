const express = require('express');
const router = express.Router();

//Rotas para categorias

router.get('/', (req, res) => {
	res.render('pages/categoria/categorias', {title: 'Lista de categorias'});
});

router.get('/add', (req, res) => {
	res.render('pages/categoria/addCategoria', {title: 'Adicionar categoria'});
});

module.exports = router;