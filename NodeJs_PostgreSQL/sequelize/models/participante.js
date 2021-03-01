const Sequelize = require("sequelize"); // pega toda a biblioteca, no _database pegamos só a classe Sequelize
const sequelize = require("../_database"); // pega o objeto Sequelize instanciado

// define define uma mapeamento objeto-relacional
// 1º parâmetro é o nome da tabela
// 2º parâmetro é o objeto com o mapeamentos das colunas
// ex: { id: { type: Sequelize.INTEGER } }
const Participante = sequelize.define("participante", {
    nome: {
        type: Sequelize.STRING // pegamos a constante da biblioteca
    }
});

module.exports = Participante; // expotamos a classe Evento para trabalhar com os eventos

// define o relacionamento entre as tabelas de evento e participante M:M
// indicando qual tabela faz a relação { through: }
const Evento = require("./evento");
Participante.belongsToMany(Evento, { through: "evento_participante" });