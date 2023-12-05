// const db = {
//   user: [
//     { id: 1, name: 'Carlos' },
//     { id: 2, name: 'Maria' }
//   ]
// }

const fs = require("fs/promises")
const path = require("path")

// path resolve combina la direccion actual del archivo, y la relativa que no esta como tal en lugar actual
const tableUser = path.resolve(__dirname, '../utils/mock/MOCK_DATA_TABLE_USERS.json')
const tableAuth = path.resolve(__dirname, '../utils/mock/MOCK_DATA_TABLE_AUTH.json')

async function dbMock(mockPath) {
  try {
  const db = await fs.readFile(mockPath, "utf8")
    return JSON.parse(db)
  } catch (error) {
    console.error("error with json",error);
  }
}

// Base de datos en memoria
let db = {}


dbMock(tableUser).then(data => {
  db.user = data
}).catch(error => console.log(error))


dbMock(tableAuth).then(data => {
  db.user = data
}).catch(error => console.log(error))

function list(tabla) {
  return new Promise((resolve, reject) => {
    resolve(db[tabla])
  })
}

function get(tabla, id) {
  return new Promise((resolve, reject) => {
    list(tabla).then((users) => {
      let user = users.filter((item) => item.id === Number(id)) || null
      if (user) {
        const userSecure = {id: user[0].id, name: user[0].user}
        resolve(userSecure)
      }
      reject("user not found")
    })
      
  
  })
}

function create(tabla, data) {
  return new Promise((resolve, reject) => {

    if (!db[tabla]) {
      db[tabla] = []
    }

    db[tabla].push(data)
    const dataView = {
      id: data.id,
      username: data.username
    }
    resolve(dataView)
  })
}

function remove(tabla, id) {
  return true
}

async function query(tabla, q) {
  let col = await list(tabla)
  let keys = Object.keys(q)
  let key = keys[0]

  return col.filter((item) => item[key] === q[key])[0] || null
}

module.exports = {
  list,
  get,
  create,
  remove,
  query,
}
