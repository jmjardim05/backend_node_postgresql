const { connect } = require("./config/database");

// importa o express (instalar o express via npm primeiro)
const express = require("express");

// importa o middleware body-parser
// const bodyParser = require("body-parser");
// body-parser é deprecated usar express.json() no lugar

// importar a rota de usuários
const userRoute = require("./routes/userRoute");

// cria uma constante para acessar os métodos do express
const app = express();

// adiciona o middleware para receber requisições em json
app.use(express.json());

//registra a rota users
userRoute(app);

connect();

// inicia o servidor web
app.listen(8000, () => console.log("API rodando na porta 8000"));