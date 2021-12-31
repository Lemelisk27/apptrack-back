const {App} = require("../models")

// const appData = [
//     {
//         id: 1,
//         employer: "First Company",
//         applied: Date.now(),
//         link: "https://www.google.com",
//         notes: "notes on the first company",
//         title: "First Web Development",
//         UserId: 1
//     },
//     {
//         id: 2,
//         employer: "Second Company",
//         applied: Date.now(),
//         link: "https://www.google.com",
//         notes: "notes on the second company",
//         title: "Second Web Development",
//         UserId: 1
//     },
//     {
//         id: 3,
//         employer: "Closed Company",
//         applied: Date.now(),
//         link: "https://www.google.com",
//         notes: "notes on the closed company",
//         title: "Closed Web Development",
//         open: false,
//         UserId: 1
//     }
// ]

const buildApps = () => {
    const openApp = 100
    const closedApp = 50
    const month = 11
    const days = 31
    const year = 2021
    const employers = ["Microsoft", "Google", "Amazon", "Yahoo", "US Government"]
    const appData = []

    for (let i = 0; i < openApp; i++) {
        const day = Math.floor(Math.random() * days)
        const empIndex = Math.floor(Math.random() * employers.length)
        const tempObj = {
            employer: employers[empIndex],
            applied: new Date(year, month, day),
            link: "https://www.google.com",
            notes: "Sample Note",
            title: employers[empIndex] + " Development",
            open: true,
            UserId: 1
        }
        appData.push(tempObj)
    }

    for (let i = 0; i < closedApp; i++) {
        const day = Math.floor(Math.random() * days)
        const empIndex = Math.floor(Math.random() * employers.length)
        const tempObj = {
            employer: employers[empIndex],
            applied: new Date(year, month, day),
            closed: new Date(year, month, day + 1),
            link: "https://www.google.com",
            notes: "Sample Note",
            title: employers[empIndex] + " Development",
            open: false,
            UserId: 1
        }
        appData.push(tempObj)
    }

    return appData
}

const seedApps = () => App.bulkCreate(buildApps())

module.exports = seedApps