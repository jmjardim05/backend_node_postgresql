const models = require("./models");

async function insert() {
    // cria os eventos
    // create cria e retorna o objeto, quando cria executa o INSERT na base de dados
    // parâmetro é um objeto com as colunas e valor das colunas sendo inseridas
    const nodejs = await models.evento.create({ nome: "Encontro de Nodejs" });
    const postgres = await models.evento.create({ nome: "Encontro de Postrgesql" });

    // cria os participantes
    const carlos = await models.participante.create({ nome: "Carlos" });
    const augusto = await models.participante.create({ nome: "Augusto" });
    const janaina = await models.participante.create({ nome: "Janaína" });
    const rafael = await models.participante.create({ nome: "Rafael" });

    // define os eventos e participantes
    // quando define o relacionamento (belongsToMany) o objeto ganha um método set pra definir 
    // o relacionamento, esse comando dá INSERT na tabela de relacionamento evento_participante passando os dois ids
    // o parâmetro é uma array de objetos do tipo definido (Participante)
    await nodejs.setParticipantes([carlos, augusto, janaina]); // neste caso é o método setParticipantes()... o nome da tabela é pluralizado na criação pelo sequelize
    await postgres.setParticipantes([janaina, rafael]);

    await models.sequelize.close();

    console.log("Dados inseridos com sucesso!")
}

insert();