const client = require("./_database");

async function createTables() {
    await client.connect(); // conecta no banco usando as configrações definidas na criação do client
    
    await client.query(`CREATE TABLE evento(
        id serial PRIMARY KEY,
        nome VARCHAR (50) UNIQUE NOT NULL
       );`); // query() executa um comando SQL
    
    await client.query(`CREATE TABLE participante(
        id serial PRIMARY KEY,
        nome VARCHAR (50) UNIQUE NOT NULL
       );`);
    
    await client.query(`CREATE TABLE evento_participante(
        evento_id integer NOT NULL,
        participante_id integer NOT NULL,
        PRIMARY KEY (evento_id, participante_id),
        FOREIGN KEY (evento_id) REFERENCES evento (id),
        FOREIGN KEY (participante_id) REFERENCES participante (id)
      );`);
    
    await client.end(); // finaliza a conexão

    console.log("Tabelas criadas!");
}

createTables();