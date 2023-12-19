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

  function follow(from, to) {
    return store.create(TABLA + '_follow', {
      user_from: from,
      user_to: to
    })
  }

  async function following(user) {
    const join = {}
    join[TABLA] = 'user_to' // { user: 'user_to' }
    const query = { user_from: user }

    return await store.query(TABLA + '_follow', query, join)
  }
 
  return {
    list,
    listOne,
    create,
    update,
    remove,
    follow,
    following
  }
}