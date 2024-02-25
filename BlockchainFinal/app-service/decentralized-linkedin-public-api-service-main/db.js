// db.js

const mysql = require('mysql2/promise');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

const pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    port: config.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
