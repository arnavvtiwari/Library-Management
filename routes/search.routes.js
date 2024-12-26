const express = require('express')
const Book = require('../models/books.models')
const router = express.Router()
const {search} = require('../controllers/search.controllers')

router.get('/', (req, res) => {
    return search(req, res)
})
module.exports = router