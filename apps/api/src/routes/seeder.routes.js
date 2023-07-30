const { Router } = require("express")

const catchedAsync = require("../utils/catchedAsync.js");
const seedUsers = require("../seeders/user.seeder.js");
const seedTweets = require("../seeders/tweet.seeder.js");

const router = Router()

router.post('/users', catchedAsync(seedUsers))
router.post('/tweets', catchedAsync(seedTweets))

module.exports = router;