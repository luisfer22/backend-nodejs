const express = require('express');

const response = require('../../../network/response');
const auth = require('./secure');
const Controller = require('./index');

const router = express.Router();

// Set routes
router.get('/', list)
router.get('/like', auth('fetch_own'), postsLiked)
router.get('/:id', listOne)
router.get('/user/:idUser', listByUser)
router.post('/user/:id', auth('create'), create)
router.patch('/:id', auth('update', { owner: 'user' }), update)
router.delete('/:id', auth('remove', { owner: 'user' }), remove)
// Like
router.get('/:id/like', auth('fetch_own'), postLikers)
router.post('/:id/like', auth('create'), like)


// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function listOne(req, res, next) {
    Controller.listOne(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

function listByUser(req, res, next) {
    Controller.listByUser(req.params.idUser)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

function create(req, res, next) {
    const { title, content } = req.body
    Controller.create(req.params.id, {title, content})
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

function update(req, res, next) {
    Controller.update(req.body,req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

function remove(req, res, next) {
    console.log(req.params.id);
    Controller.remove(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

// Likes

function like(req, res, next) {
  Controller.like(req.params.id, req.user.id)
    .then((post) => {
      response.success(req, res, post, 201)
    })
    .catch(next)
}

// Post que a el usuario logeado le dio le gusta
function postsLiked(req, res, next) {
  Controller.postsLiked(req.user.id)
    .then((post) => {
      response.success(req, res, post, 200)
    })
    .catch(next)
}


function postLikers(req, res, next) {
  Controller.postLikers(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200)
    })
    .catch(next)
}


module.exports = router;