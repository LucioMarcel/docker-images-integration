const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const util = require("util");
const peopleName = 'Lúcio Marcel';

addPeople()

app.get('/', (req, res) => {
    let results = ["<h1>Full Cycle!</h1>"];

    getPeople().then((rows) => {
        
        rows.forEach((row) => {
            results.push(`<h3>Última Pessoa Cadastrada: ${row.name}</h3>`);
        });
        
        res.send(results.join(""));
    });
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})

async function addPeople() {
    const sql = `INSERT INTO people(name) VALUES('${peopleName}')`;
    return sqlExecute(sql);
}

function getPeople() {
    const sql = `SELECT id, name FROM people WHERE name = '${peopleName}' ORDER BY id DESC LIMIT 1`;
    return sqlExecute(sql);
}

async function sqlExecute(sql) {
    const connection = mysql.createConnection(config);
    const query = util.promisify(connection.query).bind(connection);

    try {
        const rows = await query(sql);
        return rows;
    } finally {
        connection.end();
    }
}