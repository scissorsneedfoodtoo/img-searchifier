const connection = 'mongodb://' + process.env.DB_USER + ':' + process.env.PASS + '@' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

exports.db = mongoose.connect(connection, { useNewUrlParser: true })
