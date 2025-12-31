const express = require('express')
const User = require('../models/user.model')

const router = express.Router()


router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body

    try{
        const token = await User.matchPasswordAndGenerateToken(email, password)

        res.cookie("token", token)
        return res.redirect("/")
    }catch (error){
        return res.render("signin", {error})
    }
})

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body

    try{
        await User.create({
            name,
            email,
            password
        })

       res.redirect('signin')
    }catch (error) {
        console.log(`Error: user.route.js -> /signup :: while user signup : ${error}`);
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
})

module.exports = router