// aqui será exportado o objeto com todas as models
// seria o DbContext do EntityFramework

const sequelize = require("../_database");

const models = {
    evento: require("./evento"),
    participante: require("./participante"),
    sequelize
}

module.exports = models;