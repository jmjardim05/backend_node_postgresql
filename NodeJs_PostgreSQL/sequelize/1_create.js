// pega o objeto models
const models = require("./models");

async function create() {
    // sync cria as tabelas no banco
    // a opção force faz com que sejam dropadas caso já existam
    await models.sequelize.sync({ force: true });
    await models.sequelize.close();

    console.log("Banco de dados sincronizado!");
}

create();