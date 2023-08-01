const jwt = require("jsonwebtoken")
const responseCustom = require("../utils/response")

const passUserToken = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return next()
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return responseCustom(res, 401, { message: "Token is not valid" })
        req.user = user
        next()
    })
}

module.exports = passUserToken 