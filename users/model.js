const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('users', {

    email: {
        type:  Sequelize.STRING,
        field: 'email',
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false
    },
    password_confirmation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    },
        {
            timestamps: false,
            tableName: 'users'
        })
    
module.exports = User;