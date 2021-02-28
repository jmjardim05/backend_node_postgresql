const client = require("./_database");

async function insertOnTables() {
    await client.connect(); // conecta no banco usando as configrações definidas na criação do client
    
    // Criar Eventos
    const insertEvento = "INSERT INTO evento (nome) VALUES ($1)"; // $1 = PARÂMETRO 1
    await client.query(insertEvento, ["Encontro de Nodejs"]); // parâmetros são passados em array
    await client.query(insertEvento, ["Encontro de Postgresql"]);
    
    // Criar Participantes
    const insertParticipante = "INSERT INTO participante (nome) VALUES ($1)";
    await client.query(insertParticipante, ["Carlos"]);
    await client.query(insertParticipante, ["Augusto"]);
    await client.query(insertParticipante, ["Janaína"]);
    await client.query(insertParticipante, ["Rafael"]);
    
    // Adicionar participantes do evento Nodejs
    const insertEventoParticipante = "INSERT INTO evento_participante (evento_id,participante_id) VALUES ($1, $2)";
    await client.query(insertEventoParticipante, [3, 5]); // Carlos
    await client.query(insertEventoParticipante, [3, 6]); // Augusto
    await client.query(insertEventoParticipante, [3, 7]); // Janaína

    // Adicionar participantes do evento Postgresql
    await client.query(insertEventoParticipante, [4, 7]); // Janaína
    await client.query(insertEventoParticipante, [4, 8]); // Rafael
    
    await client.end(); // finaliza a conexão

    console.log("Eventos e participantes incluídos com sucesso");
}

insertOnTables();