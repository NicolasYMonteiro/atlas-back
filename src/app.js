const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerUser = require('./routes/user');
const routerTask = require('./routes/task');
/*const routerSubTask = require('./Routes/routerSubTask')*/

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routerUser);
app.use(routerTask);
/*app.use(routerSubTask);*/


module.exports = app;