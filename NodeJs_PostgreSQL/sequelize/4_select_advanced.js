const models = require("./models");
const { Op } = require("sequelize");

async function select() {
    const eventos = await models.evento.findAll({
        attributes: ["nome"],
        where: {
            nome: {
                [Op.like]: "%Nodejs"
            }
        },
        include: {
            model: models.participante,
            attributes: ["nome"],
            where: {
                [Op.not]: {
                    nome: {
                        [Op.substring]: "o"
                    }
                }
            }
        }
    });

    eventos.forEach(evento => {
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