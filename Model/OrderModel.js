const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    shipping_address:{
        type:String,
        required:true
    },
    alternate_shipping_address:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    total_price:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)






/*

orderitems : {product,quantity, _id},
             {product,quantity, _id} 

order :{
    orderitems : [id1, id2],
    user, shipping address, a...
}
*/