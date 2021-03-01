const models = require("./models");
const { Op } = require("sequelize");

async function exercicio() {
    // sync para criar o novo campo na tabela
    await models.sequelize.sync({ alter: true });

    // bulkCreate permite passar várias instancias do modelo para inserir tudo de uma vez só
    const listaNovosEventos = await models.evento.bulkCreate([
        { nome: "Aplicações REST com Delphi", data: new Date(2021, 3, 5) },
        { nome: "ASP.Net Core", data: new Date(2021, 4, 5) },
        { nome: "Oracle e Java", data: new Date(2021, 5, 5) },
        { nome: "Aplicações Mobile Delphi+Firemonkey", data: new Date(2021, 6, 5) },
        { nome: "Testes com Mocha - Javascript", data: new Date(2021, 7, 5) }]);
    
    // incluir particpantes nestes eventos
    await listaNovosEventos[0].setParticipantes(await models.participante.findAll({ where: { nome: ["Carlos", "Augusto"] }}));
    await listaNovosEventos[1].setParticipantes(await models.participante.findAll({ where: { nome: ["Carlos", "Rafael"] }}));
    await listaNovosEventos[2].setParticipantes(await models.participante.findAll({ where: { nome: ["Janaína", "Augusto"] }}));
    await listaNovosEventos[3].setParticipantes(await models.participante.findAll({ where: { nome: ["Rafael", "Augusto"] }}));
    await listaNovosEventos[4].setParticipantes(await models.participante.findAll({ where: { nome: ["Carlos", "Janaína"] }}));

    const eventosEmAbril = await models.evento.findAll({
        attributes: ["nome"],
        where: {
            data: {
                [Op.gte]: new Date(2021, 4, 1),
                [Op.lte]: new Date(2021, 4, 30)
            }
        },
        include: {
            model: models.participante,
            attributes: ["nome"]
        }
    });
    eventosEmAbril.forEach(evento => {
        console.group("Evento em Abril: ", evento.nome);
        if (evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                console.log("Participante: ", participante.nome);
            });
        } else {
            console.log("Nenhum participante");
        }
        console.groupEnd("Evento em Abril: ", evento.nome);
    });

    await models.sequelize.close();
}

exercicio();