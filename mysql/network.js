const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', listOne);
router.post('/:table', create);
router.patch('/:table/:id', update);
router.delete('/:table/:id', remove);

async function list(req, res, next) {
    const datos = await Store.list(req.params.table)
    response.success(req, res, datos, 200);
}

async function listOne(req, res, next) {
    const datos = await Store.get(req.params.table, req.params.id)
    response.success(req, res, datos, 200);
}

async function create(req, res, next) {
    console.log("req.body:",req.body);
    const datos = await Store.create(req.params.table, req.body)
    response.success(req, res, datos, 200);
}

async function update(req, res, next) {
    console.log(req.body);
    const datos = await Store.update(req.params.table, req.body, req.params.id)
    response.success(req, res, datos, 200);
}

async function remove(req, res, next) {
    const datos = await Store.remove(req.params.table, req.params.id)
    response.success(req, res, datos, 200);
}

module.exports = router;