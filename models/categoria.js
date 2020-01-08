const conn = require('./../config/database');

//Querys da categoria
const findAll = 'SELECT * FROM tb_categorias ORDER BY cli_createdAt DESC';
const insert = 'INSERT INTO tb_categorias(cat_nome) VALUES(?)';
const find = 'SELECT * FROM tb_categorias WHERE cat_id = ?';
const update = 'UPDATE tb_categorias SET cat_nome = ? WHERE cat_id = ?';
const deletar = 'DELETE FROM tb_categorias WHERE cat_id = ?';
const findProdutos = 'select * from tb_produtos prod inner join tb_categorias cat on prod.categoria_id = cat.cat_id where prod.categoria_id = ?';

module.exports = {

	findAll(req, res){
		conn.query(findAll, (err, results) => {

			if(err){
				req.flash('error_msg', 'Erro ao consultar as categorias');
			}
			
			res.render('pages/categoria/categorias', {
				title: 'Lista de categorias',
				categorias: results
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
    
    findProdutosCategoria(categoria_id){
        return new Promise((resolve, reject) => {
            conn.query(findProdutos, [categoria_id], (err, results) => {
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
			conn.query(insert, [fields.cat_nome], (err, results) => {
					if(err){
						reject(err);
					}else{
						resolve(results);
					}
				}
			);
		});
	},  
   
    
    update(fields, id){
        return new Promise((resolve, reject) => {
            conn.query(update, [fields.cat_nome, id], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    },
    
    deletar(id){
        return new Promise((resolve, reject) => {
           conn.query(deletar, [id], (err, results) => {
               if(err){
                   reject(err);
               }else{
                   resolve(results);
               }
           }); 
        });
    }    
}