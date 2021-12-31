const express = require('express')
const sequelize = require("./config/connection")
const routes = require("./controllers")
const compression = require("compression")
const cors = require("cors")

const app = express()
app.use(cors())
// app.use(cors({
//     origin:["https://zwsapptrack.herokuapp.com"]
// }))
const PORT = process.env.PORT || 3001

const {User} = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
app.use(compression())

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
    });
});