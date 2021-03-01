// importa a classe Sequelize para conexão com o banco PostgreSQL
const Sequelize = require("sequelize").Sequelize;

// configura o sequelize para conexão com o banco
const sequelize = new Sequelize(
    {
        database: "postgres",
        host: "localhost",
        password: "TO@07nm[",
        port: 5432,
        username: "postgres", 
        dialect: "postgres", // informar em dialect qual banco está acessando (MariaDB, MySQL, MSSQL, Postgres, SQLLite)
        logging: true // mostra os comandos executados no console        
    }
);

// exporta a sequelize para usar em outros módulos
module.exports = sequelize;

// Testa a conexão
async function test() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados efetuado com sucesso!");
    } catch(err) {
        console.error("Erro ao testar a conexão: ");
        console.error(err);
        process.exit();
    }
}

test();