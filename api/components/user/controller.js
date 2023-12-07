const nanoid = require("nanoid")
const auth = require("../auth")
const TABLA = 'user';

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(TABLA)
  }

  function listOne(id) {
    return store.get(TABLA, id)
  }

  function create(userData) {
    const { username, password } = userData

    if (username === undefined || password === undefined) {
      throw new Error('Informacion requerida')
    }

    completeUser = {
      id: nanoid.nanoid(),
      username
    }

    console.log(userData);

    auth.create({
      ...completeUser,
      password
    })

    return store.create(TABLA, completeUser)
  }

  function update(userData, id) {
    const { username, password } = userData

    completeUser = {
      username
    }

    auth.update({
      ...completeUser,
      password
    }, id)

    return store.update(TABLA, completeUser, id)
  }

  return {
    list,
    listOne,
    create,
    update
  }
}