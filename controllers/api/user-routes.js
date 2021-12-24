const express = require('express');
const router = express.Router();
const {User} = require("../../models")
const sequelize = require("../../config/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tokenAuth = require("../../middleware/tokenAuth")

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

router.post("/change", tokenAuth, (req, res) => {
    const updatedPassword = bcrypt.hashSync(req.body.newpassword,10)
    User.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(foundUser=>{
        if (bcrypt.compareSync(req.body.password,foundUser.password)) {
            User.update({
                password: updatedPassword
            },
            {
                where: {
                    id: req.body.id
                }
            })
            .then(updatedPassword=>{
                res.json(updatedPassword)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({Message: "An Error Occured", err:err})
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