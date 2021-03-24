const mongoose = require("mongoose");

const config = {
    uri: "mongodb://localhost:27017/teste-mongoose", // connection string do banco de dados
    options: { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    } // opções que serão passadas na conexão
}

// mongoose.connection.once(evento, callback) => define um evento que será dispnrado apenas uma vez
mongoose.connection.once("open", () => console.log("Conectado com sucesso no MongoDB"));
// mongoose.connection.on(ebento, callback) => define um evento
mongoose.connection.on("error", () => console.error("Erro ao se comunicar com o MongoDB"));

//exporta a função que vai conectar no banco de dados
module.exports = {
    connect: () => mongoose.connect(config.uri, config.options)
}