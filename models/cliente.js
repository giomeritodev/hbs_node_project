const conn = require('./../config/database');

//Query

const add = `insert into tb_clientes
            (cli_tipo, cli_nome, cli_cpfOuCnpj, cli_email, cli_fone, cli_celular, cli_cep, cli_rua, cli_complemento, cli_numero, cli_bairro, cli_cidade, cli_estado, cli_status)
            values
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

`;

const findAll = 'select * from tb_clientes';

const alterar = `update tb_clientes set cli_email = ?, cli_fone = ?, cli_celular = ?, cli_cep = ?, cli_rua = ?, cli_complemento = ?,  cli_numero = ?, cli_bairro = ?, cli_cidade = ?, cli_estado = ?, cli_status = ? where cli_id = ?;
`;

const deletar = 'delete from tb_clientes where cli_id = ?';
const find = 'select * from tb_clientes where cli_id = ?';

module.exports = {
    
    save(fields){
        return new Promise((resolve, reject) => {
            conn.query(add, [
                fields.cli_tipo,
                fields.cli_nome,
                fields.cli_cpfOuCnpj,
                fields.cli_email,
                fields.cli_fone,
                fields.cli_celular,
                fields.cli_cep,
                fields.cli_rua,
                fields.cli_complemento,
                fields.cli_numero,
                fields.cli_bairro,
                fields.cli_cidade,
                fields.cli_estado,
                fields.cli_status
            ], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });          
        });
    },
    
    findAll(){
        return new Promise((resolve, reject) => {
           conn.query(findAll, (err, results) => {
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
                fields.cli_email,
                fields.cli_fone,
                fields.cli_celular,
                fields.cli_cep,
                fields.cli_rua,
                fields.cli_complemento,
                fields.cli_numero,
                fields.cli_bairro,
                fields.cli_cidade,
                fields.cli_estado,
                fields.cli_status,
                id
            ], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    },
    
    find(id){
        return new Promise((resolve, reject) => {
           conn.query(find, [id], (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
           });
        });
    }
    
}