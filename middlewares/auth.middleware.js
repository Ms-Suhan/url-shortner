const User = require("../models/user.model");
const { verifyToken } = require("../utils/auth.util");

function checkUserAuthentication(){
    return (req, res, next) => {
        const token = req.cookies?.token

        if(!token) return next()

        const user = verifyToken(token)

        req.user = user
        next()
    }
}

function loggedInUserOnly(req, res, next) {
    const user = req.user

    if(!user) return res.redirect('/user/signin')

    next()
}

module.exports = {
    checkUserAuthentication,
    loggedInUserOnly
}