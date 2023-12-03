const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Api user',
        version: '0.0.1'
        },
        host: 'localhost:3000/',
    },
    apis: ['./api/components/**/network.js'] // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

console.log(openapiSpecification);

module.exports = openapiSpecification