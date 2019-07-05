const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const error = require('./middleware/error')
const winston = require('winston')
const swaggerUi=require('swagger-ui-express')
const swaggerDocument=require('./swagger.json')
const app = express();
////
// winston.exceptions.handle(
//     new winston.transports.Console({ colorize: true, prettyprint: true}),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
// )
// process.on('unhandledRejection', (ex) => {
//     throw ex
// })
//winston.add(winston.transports.File, { filename: 'combined.log' })

const user = require('./routes/users');
const login = require('./routes/login');
const post = require('./routes/post');

/////////////check jwt privateKey in config
if (!config.get('jwtPrivateKey')) {
    console.log('fatal error: jwtPrivatekey not define !');
    process.exit(1)
}
//connect to dataBase with mongoose
const db = config.get("db")
mongoose.connect(db,{useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${db}...`))
//////////////middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', user);
app.use('/api/login', login);
app.use('/api/post', post);
app.use('/api/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
//error handler
app.use(error);
// connecting app settings
const port = process.env.port || 3000;
app.listen(port, () => winston.info(`app is listennig on port ${port} . . .`));
