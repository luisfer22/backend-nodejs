const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');

const swaggerUi = require('swagger-ui-express')
const openapiSpecification = require("../docs/swagger")
// const swaggerDoc = require('./swagger.json')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ROUTER
app.use('/api/user', user);

// routing & inicializing swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});