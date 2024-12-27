const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
    definition: {
      openapi: "3.0.0", // Specify the version of OpenAPI
      info: {
        title: "API Documentation", // Title of your API
        version: "1.0.0", // Version of your API
        description: "API documentation for your project", // Description of your API
      },
      servers: [
        {
          url: "http://localhost:5000", // Your server URL
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to your API route files
  };
// Initialize Swagger JSDoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
