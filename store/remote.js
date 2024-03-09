// const request = require('request');
const request = require("node-fetch")

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    function list(table) {
        return req({method:'GET', table});
    }
    function get(table, id) {
        return req({method:'GET', table, id});
    }
    function create(table, data) {
        return req({
            method: 'POST', table, data
        });
    }
    function update(table, id, data) {
        return req({
            method: 'PATCH', table, id, data
        });
    }
    function remove(table, id) {
        return req({method:'DELETE', table, id});
    }
    function query(table, id) {
        return req('GET', table , id);
    }



    // function get(table, id)
    // function upsert(table, data)
    // function query(table, query, join)

    function req({
        method,
        table,
        id = '',
        data }) {
        
        let url = URL + '/' + table + '/' + id;
        body = '';

        return new Promise((resolve, reject) => {
            request(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: method === "GET" ? undefined : JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {

                    reject(new Error(`HTTP error! Status: ${response.status}`));
                } else {
                    return response.json();
                }
            })
                .then(data => {
                resolve(data.body);
            })
            .catch(error => {
                reject(error);
        });
    });
            // request({
            //     method,
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     url,
            //     body,
            // }, (err, req, body) => {
            //     if (err) {
            //         console.error('Error con la base de datos remota', err);
            //         return reject(err.message);
            //     }

            //     const resp = JSON.parse(body);
            //     return resolve(resp.body);
            // })
        // })
    }

    return {
        list,
        get,
        create,
        update,
        remove,
        query
    }
}

module.exports = createRemoteDB;