const Sequelize = require('sequelize');
const mysql = require("mysql2");
require('dotenv').config();

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const sequelize = new Sequelize('exercise', process.env.DB_USER, process.env.DB_PASSWORD,
 {dialect: 'mysql', host: process.env.DB_HOST});

 module.exports = sequelize;

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS exercise`,
  function (err, results) {
    console.log(`db exercise created successfully ${results}`);
    console.log(err);
  }
);

// Close the connection
connection.end();