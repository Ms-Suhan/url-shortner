const jwt = require('jsonwebtoken')
const secret = '@#2suhan'

function createToken(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    }

    return jwt.sign(payload, secret)
}

function verifyToken(token){
    if(!token) return null

    return jwt.verify(token, secret)
}

module.exports = {
    createToken,
    verifyToken
}