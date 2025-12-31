const express = require('express')
const Url = require('../models/url.model')
const shortid = require('shortid')

const router = express.Router()

router.post('/', async (req, res) => {
    const {url} = req.body
    const user = req.user

    const shortId = shortid(8)

    await Url.create({
        shortId,
        originalUrl: url,
        createdBy: req.user.id
    })

    res.render('create-url',{shortId, user})
})

router.get('/create', (req, res) => {
    const user = req.user
    res.render('create-url', {user})
})
router.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId

    const urlDocument = await Url.findOne({shortId})

    if(!urlDocument) return res.json({"Message" : "Url not found"})

    await Url.updateOne({shortId}, {
        $push: {
            visitHistory: {
                timestamps: Date.now
            }
        }
    })

    res.redirect(urlDocument.originalUrl)
})


module.exports = router