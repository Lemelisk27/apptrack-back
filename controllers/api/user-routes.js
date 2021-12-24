const express = require('express');
const router = express.Router();
const {User} = require("../../models")
const sequelize = require("../../config/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(foundUser=>{
        if (!foundUser) {
            res.status(401).json({Message: "Incorrect Username or Password"})
        }
        else if (bcrypt.compareSync(req.body.password,foundUser.password)) {
            const token = jwt.sign({
                username: foundUser.username,
                id: foundUser.id
            },
            process.env.JWT_SECRET
            ,{
                expiresIn: "2h"
            })
            res.json({
                token: token,
                user: foundUser
            })
        }
        else {
            res.status(401).json({Message: "Incorrect Username or Password"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

module.exports = router