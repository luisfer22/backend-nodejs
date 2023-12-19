const mysql = require('mysql2');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    console.log(table, typeof(id));
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function create(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
        if (err) return reject(err)
            resolve(result)
        })
    })
}

function update(table, data, id) {
    return new Promise((resolve, reject) => {
        connection.query(
        `UPDATE ${table} SET ? WHERE id=?`,
        [data, id],
        (err, result) => {
        if (err) return reject(err)
        resolve(result)
            }
        )
    })
}

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data)
    } else {
        return insert(table, data)
    }
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id='${id}'`, (err, result) => {
            if (err) return reject(err)
            resolve(result || null)
        })
    })
}

function queryV1(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err)
            resolve(res[0] || null)
            })
    })
}

function query(table, query, join) {
    let joinQuery = ''
        if (join) {
            const key = Object.keys(join)[0]
            const val = join[key]
            // console.log(
            //     'join: ' +
            //     join.user +
            //     ' table: ' +
            //     table +
            //     '\nkey:' +
            //     key +
            //     '\t' +
            //     'val:' +
            //     val
            // )
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
        }

    return new Promise((resolve, reject) => {
        connection.query(
        `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
        query,
        (err, res) => {
            if (err) return reject(err)
            resolve(res || null)
        }
        )
    })
}


module.exports = {
    list,
    get,
    create,
    update,
    remove,
    query
}