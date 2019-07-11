//require('express-async-errors');
require('winston-mongodb')
const winston = require('winston');
const express = require('express');
const config = require('config');

const app = express();

require('./startup/routes')(app)
require('./startup/db')();

// winston.exceptions.handle(
//     new winston.transports.Console({ colorize: true, prettyprint: true}),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
// )

//un Caught Exception
process.on('uncaughtException', (ex) => {
    console.log(ex);
    winston.error(ex.message, ex);
    process.exit(1);
})
//unhandle Promise rejection
process.on('unhandledRejection', (ex) => {
    console.log(ex);
    winston.error(ex.message, ex);
    process.exit(1);
})

//log error and exception in logFile.log
const transportsFile = new winston.transports.File({
    filename: 'logFile.log'
});
winston.add(transportsFile)

//log error in mongo db
const transportsDb =
    new (winston.transports.MongoDB)({
        db: config.get('db'),
        level: 'error'
    })
winston.add(transportsDb)
/////////////check jwt privateKey in config
if (!config.get('jwtPrivateKey')) {
    console.log('fatal error: jwtPrivatekey not define !');
    process.exit(1)
}

// connecting app settings
const port = process.env.port || 3000;
app.listen(port, () => winston.info(`app is listennig on port ${port} . . .`));
