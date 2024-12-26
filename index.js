const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/connection.config');
const bookRouter = require('./routes/books.routes')
const searchRouter = require('./routes/search.routes');
const limiter = require('./middleware/ratelimiter');
const logRequestDetails = require('./middleware/logDetails');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequestDetails)
app.use('/books', bookRouter);
app.use('/search',searchRouter)
app.use(limiter)

app.listen(PORT, () => {
    console.log(`firstApp is running on port ${PORT}`);
});