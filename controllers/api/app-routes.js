const express = require('express');
const router = express.Router();
const {App} = require("../../models")
const sequelize = require("../../config/connection")
const tokenAuth = require("../../middleware/tokenAuth")

router.get("/user/:id", tokenAuth, (req, res) => {
    App.findAll({
        where: {
            UserId: req.params.id
        },
        attributes: {
            include: [[sequelize.fn('date_format', sequelize.col('applied'), '%m-%d-%Y'), 'applied_date']]
        },
        order: [["applied", "DESC"]]
    })
    .then(foundApps=>{
        if (!foundApps) {
            res.status(404).json({Message: "Nothing Found"})
        }
        else {
            res.json(foundApps)
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

router.post("/", tokenAuth, (req, res) => {
    App.create({
        UserId: req.body.UserId,
        employer: req.body.employer,
        applied: req.body.applied,
        link: req.body.link,
        notes: req.body.notes,
        title: req.body.title,
    })
    .then(newApp=>{
        res.json(newApp)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

module.exports = router