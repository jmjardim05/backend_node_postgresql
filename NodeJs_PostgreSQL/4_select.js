const client = require("./_database");

async function retrieveRows() {
    await client.connect();

    // pega todos os eventos
    result = await client.query("SELECT * FROM evento");
    console.log("Eventos:");
    console.table(result.rows);

    // pega todos os participantes
    result = await client.query("SELECT * FROM participante");
    console.log("Participantes:");
    console.table(result.rows);

    // pega todos os eventos e seus participantes
    result = await client.query(`SELECT b.nome as evento, 
                                        c.nome as participante 
                                FROM evento_participante a 
                                INNER JOIN evento b ON b.id = a.evento_id
                                INNER JOIN participante c ON c.id = a.participante_id`);
    console.log("Eventos e seus Participantes:");
    console.table(result.rows);

    await client.end();
}

retrieveRows();