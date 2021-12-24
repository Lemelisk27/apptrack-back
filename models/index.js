const User = require("./User")
const App = require("./App")

User.hasMany(App, {
    onDelete: "CASCADE"
})

App.belongsTo(User)

module.exports = {
    User,
    App
}