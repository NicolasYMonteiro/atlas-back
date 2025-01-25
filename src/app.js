import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import routerUser from './Routes/routerUser';
import routerTask from './Routes/routerTask';
import routerSubTask from './Routes/routerSubTask';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', // Permitir apenas esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Middleware para lidar com solicitações preflight (OPTIONS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Envia uma resposta vazia para preflight requests
    }
    next();
});
app.use(json());

app.use(routerUser);
app.use(routerTask);
app.use(routerSubTask);


export default app;