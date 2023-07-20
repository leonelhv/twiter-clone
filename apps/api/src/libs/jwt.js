const jwt = require('jsonwebtoken')

function createAccessToken (payload) {

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })

}

function verifyAccessToken (token) {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) reject(err)
            resolve(payload)
        })
    })

}

module.exports = { createAccessToken, verifyAccessToken }