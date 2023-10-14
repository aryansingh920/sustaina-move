import express, { Request, Response } from 'express';
const swaggerUi = require('swagger-ui-express');


const app = express();
const YAML = require('yamljs'); // To parse the YAML file

const swaggerDocument = YAML.load('swagger.yml'); 

// Middleware to parse JSON requests
app.use(express.json());


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 3000');
});
