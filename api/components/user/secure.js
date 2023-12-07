const auth = require('../../../auth');

module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                const owner = req.params.id;
                auth.check.own(req, owner);
                next()
                break;

            default:
                next();
        }
    }

    return middleware;
}