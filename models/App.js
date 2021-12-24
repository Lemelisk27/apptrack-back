const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class App extends Model {}

App.init({
    employer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    applied: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    closed: {
        type: DataTypes.DATEONLY
    },
    link: {
        type: DataTypes.TEXT
    },
    notes: {
        type: DataTypes.TEXT
    },
    open: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    sequelize,
    timestamps: false
})

module.exports = App