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
        createTableCliente(connection);
        createTablePedido(connection);
    }
});

function createTableCategoria(conn){
    conn.query(`
        create table if not exists tb_categorias(
            cat_id integer primary key auto_increment,
            cat_nome varchar(255) not null,
            cli_createdAt datetime default now()
        );
    `, (err, results) => {
        if(err){
            console.log(err.message)
        }else{
            console.log('Tabela de categorias criada');
        }
    });
}

function createTableProduto(conn){
    conn.query(`
        create table if not exists tb_produtos(
            prod_id integer primary key auto_increment,
            prod_nome varchar(255) not null,
            prod_valor double not null,
            categoria_id int not null,            
            prod_createdAt datetime default now()
        );
    `, (err, results) => {
        if(err){
            console.log(err.message);
        }else{
            console.log('Tabela produtos criada');
        }
    });
}


function createTableCliente(conn){
    conn.query(`
        create table if not exists tb_clientes(
            cli_id integer primary key auto_increment,
            cli_tipo varchar(2) not null,
            cli_nome varchar(255) not null,
            cli_cpfOuCnpj varchar(100),
            cli_email varchar(100),
            cli_fone varchar(50),
            cli_celular varchar(50),
            cli_cep varchar(30),
            cli_rua varchar(255),
            cli_complemento varchar(100),
            cli_numero varchar(10),
            cli_bairro varchar(100),
            cli_cidade varchar(255),
            cli_estado varchar(100),
            cli_status varchar(50),
            cli_createdAt datetime default now()
        );
    `, (err, result) => {
        if(err){
            console.log(err.message);
        }else{
            console.log('Tabela de clientes criada');
        }
    });
}

function createTablePedido(conn){
    conn.query(`
        create table if not exists tb_pedidos(
            ped_id integer primary key auto_increment,
            cliente_id int,
            produto_id int,
            ped_quantidade int,
            ped_createdAt datetime default now()
        );
    `, (err, result) => {
        if(err){
            console.log(err.message);
        }else{
            console.log("Tabela de pedidos criada");
        }
    });
};

module.exports = connection;