const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
}

User.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    hooks:{
        beforeCreate(newUser){
            newUser.password = bcrypt.hashSync(newUser.password,10)
            return newUser
        },
        beforeUpdate(updatedUser){
            updatedUser.password = bcrypt.hashSync(updatedUser.password,10);
            return updatedUser;
        }
    },
    sequelize,
    timestamps: false
})

module.exports = User