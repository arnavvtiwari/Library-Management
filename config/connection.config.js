const db = require('mongoose')

try {
    db.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`).then //connect to the database
    console.log('Connected to the database')
}
catch (error) {
    console.error('Error connecting to the database: ', error) //log the error
}

module.exports = db.connection