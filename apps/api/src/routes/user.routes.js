const { Router } = require("express")
const { getInfoUser, getRepliesUser, getLikesUser } = require("../controllers/user.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")

const router = Router()

router.get('/user/:username', catchedAsync(getInfoUser))
router.get('/user/:username/replies', catchedAsync(getRepliesUser))
router.get('/user/:username/likes', catchedAsync(getLikesUser))


module.exports = router;