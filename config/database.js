const mysql = require('mysql2');

const connection = mysql.createConnection({
	host : "localhost",
	port : 3306,
	user : "root",
	password : "giogiu",
	database : "hbs_db"
});

connection.connect(err => {
    if(err){
        console.log(err.message);
    }else{
        createTableCategoria(connection);
        createTableProduto(connection);
    }
});

function createTableProduto(conn){
    conn.query(`
        create table if not exists tb_produtos(
            prod_id integer primary key auto_increment,
            prod_nome varchar(255) not null,
            prod_valor double not null,
            categoria_id int not null,
            createdAt datetime default now()
        );
    `, (err, results) => {
        if(err){
            console.log(err.message);
        }else{
            console.log('Tabela produtos criada');
        }
    });
}

function createTableCategoria(conn){
    conn.query(`
        create table if not exists tb_categorias(
            cat_id integer primary key auto_increment,
            cat_nome varchar(255) not null,
            createdAt datetime default now()
        );
    `, (err, results) => {
        if(err){
            console.log(err.message)
        }else{
            console.log('Tabela de categorias criada');
        }
    });
}

module.exports = connection;