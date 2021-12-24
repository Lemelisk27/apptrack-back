const {User} = require("../models")

const userData = [
    {
       id: 1,
       first_name: "Zach",
       last_name: "Smith",
       username: "Lemelisk27",
       password: "password"
    }
]

const seedUsers = () => User.bulkCreate(userData,{individualHooks:true})

module.exports = seedUsers