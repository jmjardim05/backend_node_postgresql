const client = require("../NodeJs_PostgreSQL/_database");

async function dropTables() {
    await client.connect(); // conecta no bacno usando as configrações definidas na criação do client
    await client.query("DROP TABLE evento CASCADE"); // query() executa uma comando SQL
    await client.query("DROP TABLE participante CASCADE");
    await client.query("DROP TABLE evento_participante CASCADE");
    await client.end(); // finaliza a conexão

    console.log("Tabelas excluídas");
}

dropTables();