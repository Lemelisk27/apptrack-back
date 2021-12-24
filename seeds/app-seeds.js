const {App} = require("../models")

const appData = [
    {
        id: 1,
        employer: "First Company",
        applied: Date.now(),
        link: "https://www.google.com",
        notes: "notes on the first company",
        UserId: 1
    },
    {
        id: 2,
        employer: "Second Company",
        applied: Date.now(),
        link: "https://www.google.com",
        notes: "notes on the second company",
        UserId: 1
    },
    {
        id: 3,
        employer: "Closed Company",
        applied: Date.now(),
        link: "https://www.google.com",
        notes: "notes on the closed company",
        open: false,
        UserId: 1
    }
]

const seedApps = () => App.bulkCreate(appData)

module.exports = seedApps