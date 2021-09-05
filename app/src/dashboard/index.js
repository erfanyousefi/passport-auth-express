const router = require('express').Router()
router.get("/", (req, res, next) => {
    return res.send("welcome To Dashboard")
})
module.exports = router