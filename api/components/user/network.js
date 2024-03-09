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
router.get('/', function (req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch(next)
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

router.get("/:id", function (req, res, next) {
    const { id } = req.params
    Controller.listOne(id)  
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
        })
        
router.post("/", function (req, res, next) {
    Controller.create(req.body)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
})

// router.patch('/:id', secure('update'), function (req, res,next) {
router.patch('/:id', function (req, res, next) {
    Controller.update(req.body, req.params.id)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
})

router.delete("/:id", function (req, res, next) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
})

router.post('/follow/:id', secure('follow'), function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch(next)
})

router.get('/:id/following', function following(req, res, next) {
    return Controller.following(req.params.id)
        .then((data) => {
            return response.success(req, res, data, 200)
        })
    .catch(next)
})

module.exports = router;