const nanoid = require("nanoid")
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
    const { user, password } = userData
    completeUser = {
      id: nanoid.nanoid(),
      user,
      password
    }
    return store.create(TABLA, completeUser)
  }

  return {
    list,
    listOne,
    create
  }
}