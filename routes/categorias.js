const express = require('express');
const router = express.Router();
const categoria = require('./../models/categoria');

//Rotas para categorias

router.get('/', (req, res) => {
	categoria.findAll(req, res);
});

router.get('/add', (req, res) => {
	res.render('pages/categoria/addCategoria', {
		title: 'Adicionar categoria'
	});
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

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    categoria.find(id).then(categoria => {
        res.render('pages/categoria/editCategoria', {
            title: 'Editando categoria', 
            categoria
        });        
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao identificar categoria');
    });
});

router.post('/update/:id', (req, res) => {
    categoria.update(req.body, req.params.id).then(categoria => {
        req.flash('success_msg', 'Dados alterados com sucesso!');
        res.redirect('/categorias');
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/categorias');
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    categoria.deletar(id).then(result => {
        req.flash('success_msg', "Dados deletados com sucesso");
        res.redirect('/categorias');
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/categorias');
    });
});

router.get('/consulta/:id', (req, res) => {
    const id = req.params.id;
    
    categoria.findProdutosCategoria(id).then(produtos => {       
        categoria.find(id).then(categoria => {
            res.render('pages/categoria/listaProdutosCategoria', {produtos, categoria});
        }).catch(err => {
            req.flash('error_msg', err.message);
            res.redirect('/categorias');
        });
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/categorias');
    });       
});

module.exports = router;