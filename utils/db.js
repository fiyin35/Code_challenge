const Sequelize = require('sequelize');
//const config = require('config.json');
const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
});

const sequelize = new Sequelize(database, user, password,
 {dialect: 'mysql', host: 'localhost'});

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