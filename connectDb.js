require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

async function connectDb() {
    try{
        await mongoose.connect(`${MONGO_URL}/url-shortner`)
        console.log('Monogdb connected!!');
    }catch (error) {
        console.log(`Error : connectDb.js :: while connecting to database : ${error}`);
    }
}

module.exports = connectDb