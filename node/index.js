const mysql = require('mysql');
const { fakerPT_BR: faker } = require('@faker-js/faker');
const express = require('express');

const PORT = 3000;

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};

const createConnection = () => mysql.createConnection(dbConfig);

const connection = createConnection();
connection.query(
    'CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY(ID))'
);
connection.end();

const app = express();

app.get('/', (req, res) => {
    const connection = createConnection();
    connection.query(
        `INSERT INTO people(name) VALUES("${faker.person.firstName()} ${faker.person.lastName()}")`
    );
    connection.query('SELECT name FROM people', (err, result) => {
        const nameList = result
            .map(({ name }) => `<li>${name}</li>`)
            .join('\n');

        res.send(`
        <h1>Full Cycle Rocks!</h1>
        <p>Nomes:</p>
        <ul>
            ${nameList}
        </ul>
        `);
    });
    connection.end();
});

app.listen(PORT, () => console.log(`Pronto para conexão na porta ${PORT}`));
