# Library Management System

## Overview

This is a **Library Management System** API built using **Node.js**, **Express.js**, and **MongoDB**. The API supports CRUD operations on books and includes a search functionality with fuzzy search logic. Swagger is integrated for easy API documentation.

---

## Features

- Add, get, update, and delete books.
- Search for books by title using fuzzy search logic.
- RESTful architecture for easy integration.
- Swagger UI for comprehensive API documentation.

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (running instance or cloud setup)
- **npm** (for package management)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/library-management-system.git
   cd library-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and configure the following:
     ```env
     PORT=3000
     MONGO_URI=your-mongodb-uri
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API documentation at `http://localhost:3000/api-docs` (Swagger UI).

---

## API Endpoints

### Books Route (`/books`)

- **POST `/books`**: Add a new book.
- **GET `/books`**: Get all books.
- **GET `/books/:id`**: Get a book by it's ISBN.
- **PUT `/books/:id`**: Update a book by ID.
- **DELETE `/books/:id`**: Delete a book by ID.

### Search Route (`/search`)

- **GET `/search`**: Search for a book by title (fuzzy logic).

---

## Example Request & Response

### Add a Book (`POST /books`)

Request:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```

Response:
```json
{
  "message": "Book added successfully",
  "data": {
    "_id": "exampleId123",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedYear": 1925
  }
}
```

### Search for a Book (`GET /search?title=gatsby`)

Response:
```json
{
  "message": "Search results",
  "data": [
    {
      "_id": "exampleId123",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedYear": 1925
    }
  ]
}
```

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Documentation**: Swagger UI

---

## Run Tests

1. Install development dependencies:
   ```bash
   npm install --save-dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

---

## Future Enhancements

- Add user authentication and role-based access.
- Implement pagination for listing books.
- Enhance search functionality with additional filters.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Submit a pull request with a detailed description.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
