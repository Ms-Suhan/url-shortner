const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { createToken } = require('../utils/auth.util')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    const user = this
    
    if(!user.isModified('password')) return next


    const saltRounds = 12

    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    this.password = hashedPassword

    next
})

userSchema.statics.matchPasswordAndGenerateToken = async function(email, password){
    const user = await User.findOne({email})

    if(!user) throw new Error('User not found')


    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) throw new Error('Invalid Password')

    const token = createToken(user)

    return token
}

const User = mongoose.model('user', userSchema)

module.exports = User