const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function (req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
})

router.get("/:id", function (req, res) {
    const { id } = req.params
    Controller.listOne(id)  
            .then((user) => {
                response.success(req, res, user, 200)
            })
            .catch((err) => {
                response.error(req, res, err.message, 500)
            })
})

// router.post()
// router.put()
// router.patch()
// router.delete()

module.exports = router;