const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    roles: {
        type: Sequelize.STRING,
        allowNull: true
    },
    groups: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = User;