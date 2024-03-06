const jwt = require('jsonwebtoken');
const error = require('../utils/error')
const config = require('../config')

const secret = config.jwt.secret

const options = {
//   expiresIn: 300, // 5 minutos en segundos (300 segundos)
  expiresIn: 2000, 
  algorithm: 'HS256' // Algoritmo de firma
}


function sign(data) {
    return jwt.sign(data, secret, options);
}

const check = {
    own: function (req, expectedOwner) {
        const decoded = decodeHeader(req)
        if (decoded.id !== expectedOwner) {
            throw new error('No puedes hacer esto', 403)
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req)
        // Usuario autenticado, podrías realizar alguna acción aquí, como permitir el acceso a recursos.
        // Por ejemplo:
        if (decoded instanceof Error) return decoded;
        // O realizar alguna otra acción que necesites.
    }
}

function getToken(auth) {
    if (!auth) {
        // throw new error('No viene token', 400)
        return "no token"
    }

    if (auth.indexOf('Bearer ') === -1) {
        // throw new error('Formato invalido', 400)
        return "formato invalido"
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function verify(token) {

    
    if (token === "no token") {
        let err = {
            message: "No viene token",
            statusCode: 400
        }
        return new Error('No viene token', { cause: err })
    }
    if (token === "formato invalido") {
        let err = {
            message: 'Formato invalido',
            statusCode: 400
        }
        return new Error('Formato invalido', { cause: err })
    }


    const verify = jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            // console.log(err);
            // return new Error("Error verificando token: ", err)
            err.statusCode = 401

            

            return new Error('Error verificando Token', {
                cause: err,
            })
        }
        // if (err) return err
        return decoded
    })
    return verify 
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