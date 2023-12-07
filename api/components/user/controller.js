const nanoid = require("nanoid")
const auth = require("../auth")
const TABLA = 'user';
const error = require("../../../utils/error")

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
      throw new error('Informacion requerida', 401)
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

  function remove(id) {
    auth.remove(id)
    return store.remove(TABLA, id)
  }

  return {
    list,
    listOne,
    create,
    update,
    remove
  }
}