const jwt = require('jsonwebtoken');

function sign(data) {
    console.log(jwt.sign(data, 'secreto'))
    return jwt.sign(data, 'secreto');
}

module.exports = {
    sign,
};