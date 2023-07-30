const { Router } = require("express")
const { createTweet, getTweets } = require("../controllers/tweet.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")

const router = Router()

router.post('/tweet', catchedAsync(createTweet))
router.get('/tweets', catchedAsync(getTweets))

module.exports = router;