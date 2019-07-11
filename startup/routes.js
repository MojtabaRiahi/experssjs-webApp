const express = require('express');
const user = require('../routes/users');
const auth = require('../routes/auth');
const post = require('../routes/post');
const error = require('../middleware/error')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use('/api/post', post);
    app.use('/api/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    //error handler
    app.use(error);
}