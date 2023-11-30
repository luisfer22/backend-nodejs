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
        console.log(store.get(TABLA, id))
    return store.get(TABLA, id)
  }

  return {
    list,
    listOne
  }
}