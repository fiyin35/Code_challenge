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
    }
});

const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    roleName: {
        type: Sequelize.STRING,
        default: 'basic'
    }
});

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    groupName: {
        type: Sequelize.STRING,
        default: 'employee'
    },
});

const UserRoles = sequelize.define('userRoles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignkey: true
    },
    groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignkey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignkey: true
    },
})


UserRoles.belongsTo(User, {foreignkey: 'userId'});
UserRoles.belongsTo(Role, {foreignkey: 'roleId'});
UserRoles.belongsTo(Group, {foreignkey: 'groupId'});



module.exports = {User, Role, Group, UserRoles};