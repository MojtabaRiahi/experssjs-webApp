const express = require('express');
const config = require('config');
const app = express();
require('./startup/loggin')
require('./startup/routes')(app)
require('./startup/db')();

/////////////check jwt privateKey in config
if (!config.get('jwtPrivateKey')) {
    console.log('fatal error: jwtPrivatekey not define !');
    process.exit(1)
}

// connecting app settings
const port = process.env.port || 3000;
app.listen(port, () => winston.info(`app is listennig on port ${port} . . .`));
