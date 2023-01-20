const express = require('express')
const { placeOrder, getAllOrders, getOrderDetails, getUserOrders, updateOrder, deleteOrder } = require('../controller/OrderController')
const router= express.Router()

router.post('/orderplace', placeOrder )
router.get('/getallorders',getAllOrders)
router.get('/getorderdetails',getOrderDetails)
router.get('/userorders/:id',getUserOrders)
router.put('/updatestatus/:orderid',updateOrder)
router.delete('/deleteorder/:orderid',deleteOrder)

module.exports = router