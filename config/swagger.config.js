const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    swagger: '2.0', // Specify Swagger version
    info: {
        title: 'My API', // API title
        version: '1.0.0', // API version
        description: 'API documentation with Swagger', // API description
    },
    host: 'localhost:3000', // Specify the base URL of the API
    basePath: '/', // The base path for the API
    schemes: ['http'], // The protocol to be used (http or https)
    paths: {
        '/api': { // Define the endpoints
            get: {
                summary: 'Returns a greeting message',
                responses: {
                    200: {
                        description: 'A successful response',
                    },
                },
            },
        },
    },
};


// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    apis: ['./routes/books.routes.js'], // Paths to files with Swagger annotations
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
