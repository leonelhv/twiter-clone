const { Router } = require("express")

const catchedAsync = require("../utils/catchedAsync.js");
const seedUsers = require("../seeders/user.seeder.js")

const router = Router()

router.post('/users', catchedAsync(seedUsers))

module.exports = router;