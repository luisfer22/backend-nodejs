const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network')
const post = require('./components/post/network')

const errors = require("../network/errors")

const swaggerUi = require('swagger-ui-express')
const openapiSpecification = require("../docs/swagger")
// const swaggerDoc = require('./swagger.json')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth)
app.use('/api/post', post)

// routing & inicializing swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(errors)

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});