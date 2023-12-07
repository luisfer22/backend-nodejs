const jwt = require('jsonwebtoken');
const error = require('../utils/error')
const config = require('../config')

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret);
}


function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req)
        if (decoded.id !== Number(owner)) {
            throw new error('No puedes hacer esto', 403)
        }
    }
}

function getToken(auth) {
    if (!auth) {
        throw new error('No viene token', 400)
    }

    if (auth.indexOf('Bearer ') === -1) {
        console.log("auth: \n",auth);
        throw new error('Formato invalido', 400)
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    // Aquí se asigna el objeto decodificado (decoded) a la propiedad user del objeto req 
    //  (objeto de solicitud).Esto es bastante común en el middleware de autenticación en Express.
    //  Al asignar el objeto decodificado a req.user, se hace accesible en otras partes del código
    //  (por ejemplo, en controladores de rutas posteriores) para que puedas acceder a la 
    //  información del usuario autenticado.
    req.user = decoded

    return decoded
}



module.exports = {
    sign,
    check,
};