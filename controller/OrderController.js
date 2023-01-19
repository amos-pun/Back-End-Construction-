let Order = require('../model/OrderModel')
let OrderItems = require('../model/OrderItemsModel')

// place order
exports.placeOrder = async ( req, res ) => {
    let orderItemsIds = await Promise.all (
        req.body.orderItems.map( async orderItem => {
            let orderItemToAdd = new OrderItems ({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            orderItemToAdd = await orderItemToAdd.save();
            if(!orderItemToAdd){
                return res.status(400).json({error:"Something is wrong"})
            }
            return orderItemToAdd._id
        
        })
    )
    // calculate total price
    let individualTotal = await Promise.all(
        orderItemsIds.map(async orderItemId =>{
            let item = await OrderItems.findById(orderItemId).populate('product','product_price')
            return item.quantity*item.product.product_price
        })
    )

    // total price
    let totalPrice = individualTotal.reduce((acc,cur)=>acc+cur)

    let newOrder = new Order({
        orderItems : orderItemsIds,
        user : req.body.user,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        country: req.body.country,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        total_price: totalPrice
    })
    newOrder = await newOrder.save()
    if(!newOrder){
        return res.status(400).json({error:"Failed to place order"})
    }
    res.send(newOrder)
}

// oder Items: [{product,quatity},{product,quantity}]