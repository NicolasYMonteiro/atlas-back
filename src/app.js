const express = require('express');
const bodyParser = require('body-parser');
const routerUser = require('./Routes/routerUser');
const routerTask = require('./Routes/routerTask');
const routerSubTask = require('./Routes/routerSubTask')

const cors = require('cors');


const app = express();

app.use(cors({
    origin: '*', // Permitir apenas esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permite envio de cookies, se necessário
  }));

app.use(bodyParser.json());

app.use(routerUser);
app.use(routerTask);
app.use(routerSubTask);


module.exports = app;