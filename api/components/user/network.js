const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller');

const router = express.Router();

router.get('/', function (req, res) {
    const lista = Controller.list();
    response.success(req, res, lista, 200);
})

router.get("/:id", function (req, res) {
    const { id } = req.params
    const listOne = Controller.listOne(id)
    response.success(req,res, listOne, 200)
})

router.post()
router.put()
router.patch()
router.delete()

module.exports = router;