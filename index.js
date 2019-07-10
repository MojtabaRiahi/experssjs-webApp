//require('express-async-errors');
require('winston-mongodb')
const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const error = require('./middleware/error')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const app = express();

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

/////route address
const user = require('./routes/users');
const auth = require('./routes/auth');
const post = require('./routes/post');

/////////////check jwt privateKey in config
if (!config.get('jwtPrivateKey')) {
    console.log('fatal error: jwtPrivatekey not define !');
    process.exit(1)
}
//connect to dataBase with mongoose
const db = config.get("db")
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${db}...`))
    .catch(err => console.log('error:', err))
//////////////middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//error handler
app.use(error);
// connecting app settings
const port = process.env.port || 3000;
app.listen(port, () => winston.info(`app is listennig on port ${port} . . .`));
