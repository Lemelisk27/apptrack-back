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
            include: [[sequelize.fn('date_format', sequelize.col('applied'), '%m-%d-%Y'), 'applied_date'],[sequelize.fn('date_format', sequelize.col('closed'), '%m-%d-%Y'), 'closed_date']]
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

router.get("/:id", tokenAuth, (req, res) => {
    App.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            include: [[sequelize.fn('date_format', sequelize.col('applied'), '%m-%d-%Y'), 'applied_date'],[sequelize.fn('date_format', sequelize.col('closed'), '%m-%d-%Y'), 'closed_date']]
        }
    })
    .then(foundApp=>{
        if (!foundApp) {
            res.status(404).json({Message: "Nothing Found"})
        }
        else {
            res.json(foundApp)
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

router.put("/close", tokenAuth, (req, res) => {
    App.update({
        closed: req.body.closed,
        open: req.body.open
    },
    {
        where: {
            id: req.body.id
        }
    })
    .then(updatedApp=>{
        res.json(updatedApp)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

router.put("/", tokenAuth, (req, res) => {
    App.update({
        UserId: req.body.UserId,
        applied: req.body.applied,
        closed: req.body.closed,
        employer: req.body.employer,
        link: req.body.link,
        notes: req.body.notes,
        open: req.body.open,
        title: req.body.title,
    },
    {
        where: {
            id: req.body.id
        }
    })
    .then(updatedApp=>{
        res.json(updatedApp)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({Message: "An Error Occured", err:err})
    })
})

module.exports = router