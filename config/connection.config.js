const db = require('mongoose')

try {
    db.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`).then
    console.log('Connected to the database')
}
catch (error) {
    console.error('Error connecting to the database: ', error)
}

module.exports = db.connection