const express = require('express')
const Book = require('../models/books.models')
const router = express.Router()
const {search} = require('../controllers/search.controllers')

// To search books by title
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Retrieve a list of books by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the books to search for
 *     responses:
 *       200:
 *         description: A list of books matching the title
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Title is required
 *       500:
 *         description: An error occurred during the search
 */



router.get('/', (req, res) => {
    return search(req, res)
})
module.exports = router