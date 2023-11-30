// const db = {
//   user: [
//     { id: 1, name: 'Carlos' },
//     { id: 2, name: 'Maria' }
//   ]
// }

const fs = require("fs/promises")
const path = require("path")

// path resolve combina la direccion actual del archivo, y la relativa que no esta como tal en lugar actual
const mockPath = path.resolve(__dirname, '../utils/mock/MOCK_DATA.json')
async function dbMock() {
  try {
  const db = await fs.readFile(mockPath, "utf8")
    return JSON.parse(db)
  } catch (error) {
    console.error("error with json",error);
  }
}

let db = {}

dbMock().then(data => {
  db.user = data
}).catch(error => console.log(error))

function list(tabla) {
  return db[tabla]
}

function get(tabla, id) {
  let col = list(tabla)
  console.log(col.filter((item) => item.id === Number(id) ))
  return col.filter((item) => item.id === Number(id)) || null
}

function upsert(tabla, data) {
  db[tabla].push(data)
}

function remove(tabla, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
