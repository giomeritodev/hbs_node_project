const express = require('express');
const router = express.Router();
const Handlebars = require('express-handlebars');
const Pedido = require('./../models/pedido');
const Cliente = require('./../models/cliente');
const Produto = require('./../models/produto');


router.get('/', (req, res) => {
   res.render('pages/pedido/pedidos', {title: 'Lista de pedidos'}); 
});

router.get('/pdv', (req, res) => {
    Cliente.findAll().then(clientes => {
        Produto.findAll().then(produtos => {   
            if(!req.session.pedido){
                res.render('pages/pedido/pdv', {title: 'PDV', clientes, produtos, pedido: null});    
            }
            const pedido = new Pedido(req.session.pedido);
            res.render('pages/pedido/pdv', {title: 'PDV', clientes, produtos, pedido: pedido.generateArray(), valorTotal: pedido.valorTotal });
            
        }).catch(err => {
            req.flash('error_msg', "Erro ao buscar os produtos", err.message);
        });
    }).catch(err => {
        req.flash('error_msg', "Erro ao buscar os clientes", err.message);
    });    
});

router.post('/pdv/add-items-pedido', (req, res) => {
    const pedido = new Pedido(req.session.pedido ? req.session.pedido : {});  
    
    const produtoID = req.body.produto_id;
    const clienteID = req.body.cliente_id;
    
    Produto.find(produtoID).then((produto) => {        
        produto.forEach((prod) => {
            
            console.log(prod);
            try{
                pedido.add(prod, prod.prod_id);                
            }
            catch(err){
                req.flash('error_msg', 'Houve um erro ao adicionar os items no pedido ==> ', err.message)
                res.redirect('/pedidos/pdv');
            }
        });
        
    }).catch(err => {
        req.flash('error_msg', "O produto não esta cadastrado", err.message);
        res.redirect('/pedidos/pdv');
    });
});

router.get('/test', (req, res) => {
    res.send(pedido.array);
});

module.exports = router;