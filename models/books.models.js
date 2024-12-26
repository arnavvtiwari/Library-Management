const db = require('mongoose')

const bookSchema = new db.Schema({
    title: {
        type: String,
        
    },
    author: {
        type: String,

    },
    genre:{
        type: String,

    },
    published: {
        type: Number,

    },
    ISBN:{
        type: String,

        unique: true
    },
    stock:{
        type: Number,

    }
})
db.model('Book', bookSchema)
module.exports = db.model('Book')