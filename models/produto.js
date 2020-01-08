const conn = require('./../config/database');

//Querys
const findAll = 'select * from tb_produtos';
const insert = 'insert into tb_produtos (prod_nome, prod_valor, categoria_id) values(?, ?, ?)';
const findCategorias = 'select * from tb_categorias';
const findCategoriaProduto = 'select * from tb_produtos p inner join tb_categorias c on p.categoria_id = c.cat_id where p.prod_id = ?';
const findCatProduto = 'select categoria_id from tb_produtos where prod_id = ?';
const alterar = 'update tb_produtos set prod_nome = ?, prod_valor = ?, categoria_id = ? where prod_id = ?';
const find = 'select * from tb_produtos where prod_id = ?';
const deletar = 'delete from tb_produtos where prod_id = ?';

module.exports = {
    
    
    findAll(){
        return new Promise((resolve, reject) => {
           conn.query(findAll, (err, results) => {
              if(err){
                  reject(err)
              }else{
                  resolve(results);
              } 
           });
        });
    },
    
    find(id){
        return new Promise((resolve, reject) => {
            conn.query(find, [id], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });            
        });
    },
    
    findCategorias(){
      return new Promise((resolve, reject) => {
          conn.query(findCategorias, (err, results) => {
              if(err){
                  reject(err);
              }else{
                  resolve(results);
              }
          });
      });  
    },    
    
    findCategoriaProduto(prod_id){
        return new Promise((resolve, reject) => {
            conn.query(findCategoriaProduto, [prod_id], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });      
        });
    },
    
    save(fields){
        return new Promise((resolve, reject) => {
           conn.query(insert, [
               fields.prod_nome,
               fields.prod_valor,
               fields.categoria_id
           ], (err, results) => {
               if(err){
                   reject(err);
               }else{
                   resolve(results);
               }
           }); 
        });
    },    
    
    update(id, fields){
        return new Promise((resolve, reject) => {
           conn.query(alterar, [
               fields.prod_nome, 
               fields.prod_valor, 
               fields.categoria_id,
               id
           ], (err, results) => {
               if(err){
                   reject(err);
               }else{
                   resolve(results);
               }
           });
        });
    },
    
    delete(id){
        return new Promise((resolve, reject) => {
            conn.query(deletar, [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }
}

//TODO falta a implementação da alteração do produto e lista de categorias no formulário
//para alteração