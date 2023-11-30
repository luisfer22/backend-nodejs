const store = require('../../../store/dummy');

const TABLA = 'user';

function list() {
    return store.list(TABLA);
}

function listOne(id) {
    // console.log(store.get(TABLA, id))
    return store.get(TABLA, id)
}

module.exports = {
    list,
    listOne,
};