//require('express-async-errors');
require('winston-mongodb')
const winston = require('winston');
module.exports = function () {

    // winston.exceptions.handle(
    //     new winston.transports.Console({ colorize: true, prettyprint: true}),
    //     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    // )

    //unCaught Exception
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
}