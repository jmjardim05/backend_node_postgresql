// Exercício
// 1. Renomear o particpante "Carlos" para "Carlos Augusto"
// 2. Remover o participante "Carlos" do evento id 1

const client = require("./_database");

async function updateRows() {
    await client.connect();

    const updateParticipante = "UPDATE participante SET nome = $1 WHERE id = $2";
    await client.query(updateParticipante, ["Carlos Augusto", 5]);
    result = await client.query("SELECT * FROM participante WHERE id = $1", [5]);
    console.log("1. Renomear o particpante 'Carlos' para 'Carlos Augusto'");
    console.log(result.rows);

    console.log("2. Remover o participante 'Carlos' do evento id 1");
    // antes da exclusão
    result = await client.query("SELECT * FROM evento_participante");
    console.log(result.rows);
    // depois da exclusão
    const deleteEventoParticipante = `DELETE FROM evento_participante 
                                      WHERE evento_id = $1 AND participante_id = $2`;
    await client.query(deleteEventoParticipante, [3, 5]);
    result = await client.query("SELECT * FROM evento_participante");
    console.log(result.rows);

    await client.end(); // não esquecer de fechar a conexão
}

updateRows();