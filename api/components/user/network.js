const express = require('express');

const secure = require('./secure')
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *    summary: return all users
 *    tags: 
 *      - users
 *    description: return all users of database.
 *    responses:
 *      200:
 *        description: List of users succesfull obtained
 *      500:
 *        description: Some server error
*/
router.get('/', function (req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
})

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: get one user
 *     tags: 
 *       - users
 *     description: get one user by id.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: id to obtain user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users succesfull obtained
 *       500:
 *         description: Some server error
*/

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
        
router.post("/", function (req, res) {
    Controller.create(req.body)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
})

router.patch('/:id', secure('update'), function (req, res) {
    console.log(req.body);

    Controller.update(req.body, req.params.id)
        .then((user) => {
            console.log(user);
            response.success(req, res, user, 201)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500)
        })
})
// router.delete()

module.exports = router;