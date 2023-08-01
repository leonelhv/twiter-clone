const { Router } = require("express")
const { createTweet, getTweets, likeToTweet, getTweet } = require("../controllers/tweet.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")
const authRequired = require("../middlewares/validateToken.js")
const passUserToken = require("../middlewares/passUserToken.js")

const router = Router()

router.post('/tweet', authRequired, catchedAsync(createTweet))
router.post('/like-to-tweet', authRequired, catchedAsync(likeToTweet))
router.get('/tweet/:idTweet', passUserToken, catchedAsync(getTweet))
router.get('/tweets', passUserToken, catchedAsync(getTweets))

module.exports = router;