const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerUser = require('./Routes/routerUser');
const routerTask = require('./Routes/routerTask');
const routerSubTask = require('./Routes/routerSubTask')

const app = express();

app.use(cors({
    origin: 'https://atlasdevelopment.vercel.app', // Permitir apenas esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.options('*', cors()); // Responde automaticamente às preflight requests

app.use(bodyParser.json());

app.use(routerUser);
app.use(routerTask);
app.use(routerSubTask);


module.exports = app;