// importa o objeto pg para podemros criar uma conexão com o PostgreSQL
const pg = require("pg");

// cria uma nova conexão com o PostgreSQL
const client = new pg.Client(
    {
        database: "postgres",
        host: "localhost",
        password: "TO@07nm[",
        port: 5432,
        user: "postgres"
    }
);

// exporta a constante client com a conexão criada, para que possamos usar a conexão criada em outros módulos
module.exports = client;