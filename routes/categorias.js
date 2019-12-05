const express = require('express');
const router = express.Router();
const categoria = require('./../models/categoria');

//Rotas para categorias

router.get('/', (req, res) => {
	categoria.findAll(req, res);
});

router.get('/add', (req, res) => {
	res.render('pages/categoria/addCategoria', {title: 'Adicionar categoria'});
});

router.post('/nova', (req, res) => {
	
	var erros = [];
	if(!req.body.cat_nome || typeof req.body.cat_nome === 'undefined' || req.body.cat_nome === null){
		erros.push({texto: 'O campo nome não pode ser nulo'});
	} 

	if(req.body.cat_nome.length < 2){
		erros.push({texto: 'O nome categoria é muito pequeno'});
	}
	if(erros.length > 0){
		res.render('pages/categoria/addCategoria', { erros: erros });
	}else{
		categoria.save(req.body).then(results => {
			req.flash('success_msg', 'Categoria adicionada!');
			res.redirect('/categorias');
		}).catch((err) => {
			req.flash('error_msg', 'Houve um erro ao adicionar categoria. \n', err.message);
			res.redirect('/categorias');
		});		
	}

});

module.exports = router;