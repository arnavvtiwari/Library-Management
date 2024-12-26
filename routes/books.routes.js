const express = require('express');
const router = express.Router();

const Book = require('../models/books.models');

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A successful response
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
