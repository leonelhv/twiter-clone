const { Router } = require("express")
const { login, register } = require("../controllers/auth.controller.js")
const catchedAsync = require("../utils/catchedAsync.js")

const router = Router()

router.post('/register', catchedAsync(register))
router.post('/login', catchedAsync(login))

module.exports = router;