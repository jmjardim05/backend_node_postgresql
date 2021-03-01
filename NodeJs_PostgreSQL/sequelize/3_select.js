const models = require("./models");

async function select() {
    const eventos = await models.evento.findAll();
    console.table(eventos.map(value => value.get()));

    const participantes = await models.participante.findAll();
    console.table(participantes.map(value => value.get()));

    const eventosComParticipante = await models.evento.findAll({
        include: [{
            model: models.participante
        }]
    });
    eventosComParticipante.forEach(evento => {
        console.group("Evento: ", evento.nome);
        if (evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                console.log("Participante: ", participante.nome);
            });
        } else {
            console.log("Nenhum participante");
        }
        console.groupEnd("Evento: ", evento.nome);
    });

    await models.sequelize.close();
}

select();