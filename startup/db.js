const mongoose = require('mongoose');
const winston = require('winston')
const db = config.get("db")


module.exports = function () {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => winston.info(`Connected to ${db}...`))
}