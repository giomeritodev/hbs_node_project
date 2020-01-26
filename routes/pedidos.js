const express = require('express');
const router = express.Router();
const Pedido = require('./../models/pedido');
const Cliente = require('./../models/cliente');
const Produto = require('./../models/produto');

var seq = 0;
function sq(item){
    seq += item;
}

router.get('/', (req, res) => {
   res.render('pages/pedido/pedidos', {title: 'Lista de pedidos'}); 
});

router.get('/pdv', (req, res) => {    
    Cliente.findAll().then(clientes => {           
        Produto.findAll().then(produtos => { 
            if(!req.session.pedido){
                res.render('pages/pedido/pdv', {
                    title: 'PDV', 
                    clientes, 
                    pedido: null,
                    produtos
                });    
            }
            const pedido = new Pedido(req.session.pedido);  
 
            res.render('pages/pedido/pdv', {
                title: 'PDV', 
                clientes,                
                pedido: pedido.generateArray(), 
                valorTotal: pedido.valorTotal,
                totalQtd: pedido.totalQtd,
                produtos                
            });
        });
    }).catch(err => {
        req.flash('error_msg', "Erro ao buscar os clientes", err.message);
    });    
});

router.post('/pdv/add-items-pedido', (req, res) => {
    const pedido = new Pedido(req.session.pedido ? req.session.pedido : {}); 
    //console.log(pedido);
    let dados = req.body;
    
    if(dados.ped_quantidade < 1 || dados.ped_quantidade === 0){
        req.flash('error_msg', `A quantidade não pode ser ${dados.ped_quantidade}`);
        res.redirect('/pedidos/pdv');
    }

    Produto.find(dados.produto_id).then((produto) => {         
        if(produto.length === 0){
            req.flash('error_msg', 'Produto não encontrado');
            res.redirect('/pedidos/pdv');
        }
        produto.forEach((prod) => {
            try{
                pedido.add(prod, prod.prod_id, dados.ped_quantidade);
                req.session.pedido = pedido;                
                //req.flash('success_msg', 'Item adicionado');
                res.redirect('/pedidos/pdv');                
            }
            catch(err){
                req.flash('error_msg', 'Houve um erro ao adicionar o item no pedido ==> ', err.message);
                res.redirect('/pedidos/pdv');
            }
        });
    }).catch(err => {
        req.flash('error_msg', err.message);
        res.redirect('/pedidos/pdv');
    });
});

module.exports = router;