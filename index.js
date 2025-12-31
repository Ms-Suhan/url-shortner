require('dotenv').config()
const express = require('express')
const path = require('path')
const connectDb = require('./connectDb')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.route')
const urlRouter = require('./routes/url.route')

const {checkUserAuthentication, loggedInUserOnly} = require('./middlewares/auth.middleware')


const app = express()
const PORT = process.env.PORT || 3000

connectDb()


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use(checkUserAuthentication())

app.set('view engine', "ejs")
app.set('views', path.resolve('./views') )

app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    const user = req.user
    res.render("home", {user})
})

app.use('/user', userRouter)
app.use('/url', urlRouter)

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
})
