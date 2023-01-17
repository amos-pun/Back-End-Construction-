const express = require('express')
const { testfunction, secondfn } = require('../controller/testCont')
const router = express.Router()

router.get('/test', testfunction )
router.get('/second', secondfn )

module.exports = router
