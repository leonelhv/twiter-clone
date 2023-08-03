const { Router } = require("express")
const { getInfoUser } = require("../controllers/user.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")

const router = Router()

router.get('/user/:username', catchedAsync(getInfoUser))


module.exports = router;