const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/connection.config');
const bookRouter = require('./routes/books.routes')
const searchRouter = require('./routes/search.routes');
const limiter = require('./middleware/ratelimiter');
const logRequestDetails = require('./middleware/logDetails');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://library-management-iet7.onrender.com/api-docs'); // Adjust for your origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Swagger Configuration
const swaggerOptions = {
    definition: {
      openapi: "3.0.0", // Version of OpenAPI
      info: {
        title: "Library Management System", // Title 
        version: "1.0.0", // Version 
        description: "API documentation for Library Management System", // Description 
        contact:{
            name: "Arnav Tiwari",
            email: "arnav.luck@gmail.com"
        }
      },
      servers: [
        {
          url: "https://library-management-fy6y.onrender.com", // Server URL
          // url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to API route files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  

  // Middlewares

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequestDetails)
app.use('/books', bookRouter);
app.use('/search',searchRouter)
app.use(limiter)

app.get('/', (req, res) => {
  res.send(
    `Welcome to the Library Management System!<br>
     <br>
     - Use <strong>/api-docs</strong> to view the API documentation.<br>
     - Use <strong>/books</strong> to perform CRUD operations.<br>
     - Use <strong>/search</strong> to perform search operations.<br>`
  );
  

});

// Port Configuration
app.listen(PORT, () => {
    console.log(`firstApp is running on port ${PORT}`);
});

module.exports = app;