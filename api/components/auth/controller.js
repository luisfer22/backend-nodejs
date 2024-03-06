const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLA = 'auth'
const error = require("../../../utils/error")

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username })

    return bcrypt.compare(password, data[0].password).then((sonIguales) => {
        if (sonIguales === true) {
          // Generar token;
          return auth.sign(data[0])
        } else {
          throw new error('Contraseña incorrecta',401)
        }
    })
  }

    async function create(data) {
    const authData = {
        id: data.id
    }

    if (data.username) {
        authData.username = data.username
    }

    if (data.password) {
        authData.password = await bcrypt.hash(data.password, 5)
    }

    return await store.create(TABLA, authData)
  }

  async function update(data, id) {
    const authData = {}
    if (data.username) {
        authData.username = data.username
    }

    if (data.password) {
        authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.update(TABLA, authData, id)
  }

  async function remove(id) {
    return store.remove(TABLA, id)
  }

  return {
    create,
    update,
    remove,
    login
  }
}
