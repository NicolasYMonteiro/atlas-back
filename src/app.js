const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./routes/user');
/*const routerTask = require('./Routes/routerTask');
const routerSubTask = require('./Routes/routerSubTask')*/

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(user);
/*app.use(routerTask);
app.use(routerSubTask);*/


module.exports = app;