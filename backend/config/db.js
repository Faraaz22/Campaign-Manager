// import mysql2
//  provides a promise-based API for interacting with MySQL databases
const mysql = require('mysql2/promise')
require('dotenv').config()

// our info pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

module.exports = pool
