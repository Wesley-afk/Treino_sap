import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  database: 'biblioteca',
})

connection.connect((error) => {
    if(error){
        console.error('Erro ao tentar se conectar com o banco de dados', error);
        return
    }else{
        console.log("Conectado ao banco de dados com sucesso!");
    }
})

export default connection