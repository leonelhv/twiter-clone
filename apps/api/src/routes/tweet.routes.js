const { Router } = require("express")
const { createTweet } = require("../controllers/tweet.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")

const router = Router()

router.post('/tweet', catchedAsync(createTweet))

module.exports = router;