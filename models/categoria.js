const conn = require('./../config/database');

module.exports = {

	findAll(req, res){
		conn.query(`
			SELECT * FROM tb_categorias ORDER BY createdAt DESC
		`, (err, results) => {

			if(err){
				req.flash('error_msg', 'Erro ao consultar as categorias');
			}
			
			res.render('pages/categoria/categorias', {
				title: 'Lista de categorias',
				categorias: results
			});

		});
	},
	
	save(fields){
		return new Promise((resolve, reject) => {
			conn.query(
				`INSERT INTO tb_categorias(cat_nome)
				VALUES(?)`,
				[
					fields.cat_nome
				], (err, results) => {
					if(err){
						reject(err);
					}else{
						resolve(results);
					}
				}
			);
		});
	}

}