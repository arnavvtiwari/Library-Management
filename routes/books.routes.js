const express = require('express');
const router = express.Router();

const Book = require('../models/books.models');

// To get schema of the books
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         published:
 *           type: integer
 *           description: The year the book was published
 *         ISBN:
 *           type: string
 *           description: The unique ISBN number of the book
 *         stock:
 *           type: integer
 *           description: The number of copies available in stock
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - published
 *         - ISBN
 *         - stock
 */

// To get all the books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     responses:
 *       200:
 *         description: Successfully retrieved list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

// To get a specific book by ID
/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: Retrieve a book by its ISBN
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ISBN of the book to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: An error occurred while fetching the book
 */

// To add a new book
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 */

// To edit a specific book by ID
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */

// To delete a book by ID
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */



// Get all books
router.get('/', async (req, res) => {    
    try {
        const books = await Book.find();
        res.status(200).json(books); // 200 OK
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching books' }); // 500 Internal Server Error
    }
});

// Add a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, genre, published, ISBN, stock } = req.body;
        if (!title || !author || !ISBN || stock === undefined) {
            return res.status(400).json({ message: 'Required fields are missing' }); // 400 Bad Request
        }
        const book = new Book({ title, author, genre, published, ISBN, stock });
        const savedBook = await book.save();
        res.status(201).json(savedBook); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the book' }); // 500 Internal Server Error
    }
});

// Get a specific book by ID
router.get('/:bookId', async (req, res) => {
    try {
        const book = await Book.find( { ISBN: req.params.bookId });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
        }
        res.status(200).json(book); // 200 OK
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the book' }); // 500 Internal Server Error
    }
});

// Delete a book by ID
router.delete('/:bookId', async (req, res) => {
    try {
        const removedBook = await Book.deleteOne({ _id: req.params.bookId });
        if (removedBook.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
        }
        res.status(200).json({ message: 'Book deleted successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the book' }); // 500 Internal Server Error
    }
});

// Update a book by ID
router.put('/:bookId', async (req, res) => {
    try {
        const { title, author, genre, published, ISBN, stock } = req.body;
        const updatedBook = await Book.updateOne(
            { _id: req.params.bookId },
            {
                $set: { title, author, genre, published, ISBN, stock }
            }
        );
        if (updatedBook.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' }); // 404 Not Found
        }
        res.status(200).json({ message: 'Book updated successfully' }); // 200 OK
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the book' }); // 500 Internal Server Error
    }
});

module.exports = router;
