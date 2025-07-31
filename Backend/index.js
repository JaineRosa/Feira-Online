//importar o express
const express = require('express');
//importar o cors
const cors = require('cors');
//importar o express-fileupload
const fileUpload = require('express-fileupload');
//importar o path
const path = require('path');

//criar o objeto app
const app = express();
//configurar o cors
app.use(cors());
//adicionar o fileupload
app.use(fileUpload());
//configurar o express para receber JSON
app.use(express.json());

//importar o arquivo de rotas  
const produtos = require('./rotas/produtos');
//configurar as rotas
app.use('/', produtos);

app.use('/img', express.static('img'));

//iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});