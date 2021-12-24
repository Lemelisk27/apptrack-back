const router = require('express').Router()
const userRoutes = require("./user-routes")
const appRoutes = require("./app-routes")

router.use("/users",userRoutes)
router.use("/apps",appRoutes)

module.exports = router