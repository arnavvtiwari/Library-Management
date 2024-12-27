const Book = require('../models/books.models')
const Fuse = require('fuse.js');

const search = async (req, res) => {
    try {
        const { title } = req.query;
        // Fetch all books from the database
        const allBooks = await Book.find();
        const options = {
            keys: ['title'], // Specify the fields to search on
            threshold: 0.3,  // Adjust the threshold for fuzzy matching
        };
        // Initialize Fuse.js with the book data and options
        const fuse = new Fuse(allBooks, options);
        // Perform a fuzzy search for the input title
        const results = fuse.search(title);
        // Map results to get the actual book objects
        const books = results.map(result => result.item);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching books' });
    }
}
module.exports = {search}