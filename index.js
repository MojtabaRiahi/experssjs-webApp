const winston=require('winston')
const express = require('express');
const app = express();
require('./startup/loggin');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// connecting app settings
const port = process.env.port || 3000;
app.listen(port, () => winston.info(`app is listennig on port ${port} . . .`));
