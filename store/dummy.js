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
const tableAuthHashed = path.resolve(__dirname, '../utils/mock/MOCK_DATA_TABLE_AUTH_HASHED.json')

const bcrypt = require("bcrypt")

async function dbMock(mockPath) {
  try {
  const db = await fs.readFile(mockPath, "utf8")
    return JSON.parse(db)
  } catch (error) {
    console.error("error with json",error);
  }
}

// Base de datos en memoria
let db = []


dbMock(tableUser).then(data => {
  db.user = data
}).catch(error => console.log(error))

async function saveTableHashed() {
  try {
    // Asegúrate de que tableAuth esté definido
    if (!tableAuth) {
      throw new Error('tableAuth is undefined')
    }

    const data = await dbMock(tableAuth)

    // Asegúrate de que dbMock haya devuelto un resultado
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid result from dbMock')
    }

    const dataHashed = data.map((user) => {
      // Asegúrate de que user.password esté definido
      if (user.password) {
        const hashedPassword = bcrypt.hashSync(user.password, 5)
        user.password = hashedPassword
        console.log(user)
      }

      return user
    })

    const pathToSaveHashedPasswords = path.resolve(
      __dirname,
      '../utils/mock/MOCK_DATA_TABLE_AUTH_HASHED.json'
    )

    await fs.writeFile(
      pathToSaveHashedPasswords,
      JSON.stringify(dataHashed, null, 1)
    )

    console.log('Hashed passwords saved successfully.')
  } catch (error) {
    console.error(error)
  }
}

// Llamar a la función
// saveTableHashed()


async function saveTableHashedWithPromise() {
  try {
    const data = await dbMock(tableAuth)

    const dataHashed = await Promise.all(
      data.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 5)
        user.password = hashedPassword
        console.log(user)
        return user
      })
    )

    const pathToSaveHashedPasswords = path.resolve(
      __dirname,
      '../utils/mock/MOCK_DATA_TABLE_AUTH_HASHED_2.json'
    )

    await fs.writeFile(
      pathToSaveHashedPasswords,
      JSON.stringify(dataHashed, null, 1)
    )

    console.log('Hashed passwords saved successfully.')
  } catch (error) {
    console.error(error)
  }
}

// saveTableHashedWithPromise()

dbMock(tableAuthHashed)
  .then((data) => {
    db.auth = data
  })
  .catch((error) => console.log(error))


// Metodos que alteran la db
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
        const userSecure = {id: user[0].id, name: user[0].username}
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

function update(tabla, data, id) {
  return new Promise((resolve, reject) => {
    const index = db[tabla].findIndex((user) => user.id === Number(id))
    // agregando cambios al id correspondiente
    db[tabla][index] = {
      ...db[tabla][index],
      ...data
    }

    resolve("updated done")
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
  update,
  remove,
  query,
}
