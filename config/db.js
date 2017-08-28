const connection = `mongodb://${process.env.DB_HOST}/${process.env.DB}`
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

exports.db = mongoose.connect(connection)
