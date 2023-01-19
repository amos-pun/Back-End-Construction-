const express = require('express')
const { placeOrder } = require('../controller/OrderController')
const router= express.Router()

router.post('/orderplace', placeOrder )

module.exports = router