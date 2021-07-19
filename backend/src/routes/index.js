
const auth = require('./auth')

const router = require('express').Router();

const discord = require('./discord')

router.use("/auth", auth)
router.use("/discord", discord)

module.exports = router;