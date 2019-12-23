const express = require('express');
const router = express.Router();
const produtos = require('./../models/produto');


router.get('/', (req, res) => {
    
    produtos.findAll().then(produtos => {
        res.render('pages/produto/produtos', {
            title: 'Lista de produtos',
            produtos
        }).catch(err => {
            if(err){
                req.flash('error_msg', 'Erro ao buscar produto');
                res.redirect('/produtos');
            }
        });        
    });
});

router.get('/add', (req, res) => {
    produtos.findCategorias().then(categorias => {
        res.render('pages/produto/addProduto', {
            title: 'Adicionando novo item', 
            categorias
        });
    });
});

router.post('/novo', (req, res) => {
    produtos.save(req.body).then(produto => {
       req.flash('success_msg', 'Produto adicionado com sucesso');
       res.redirect('/produtos');    
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/produtos');
    });
});

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;    
    produtos.findCategoriaProduto(id).then(produto => {
        produtos.findCategorias().then(categorias => {
            res.render('pages/produto/editProduto', {
                title: 'Alterando item', 
                produto,
                categorias
            });            
        });
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/produtos');
    });
});

router.post('/update/:id', (req, res) => {
    const id = req.params.id;
    produtos.update(id, req.body).then(result => {
        req.flash('success_msg', 'Dados alterados com sucesso!');
        res.redirect('/produtos');
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/produtos');
    });
});

module.exports = router;