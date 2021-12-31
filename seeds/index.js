const seedUsers = require("./user-seeds")
// const seedApps = require("./app-seeds")

const sequelize = require("../config/connection")

const seedAll = async () => {
    await sequelize.sync({force: true})
    console.log('\n-----DATABASE SYNCED-----\n')
    await seedUsers()
    console.log('\n-----USERS SYNCED-----\n')
    // await seedApps()
    // console.log('\n-----APPS SYNCED-----\n')
    process.exit(0)
}

seedAll()