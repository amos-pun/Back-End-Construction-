const Product = require('../Model/ProductModel')

// to add new product
exports.addProduct = async(req,res) => {
    if(!req.file){
        return res.status(400).json({error:"File not selected"})
    }
    let productToAdd = new Product({
        product_name : req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
    })
    productToAdd = await productToAdd.save()
    if(!productToAdd){
        return res.status(400).json({error:"Something is wrong"})
    }
    res.send(productToAdd)
}

// to veiw product list
exports.getAllProducts = async (req, res) => {
    let products = await Product.find()
    .populate('category','category_name')
    // .select(["category_name",'rating'])
    // .sort([['product_name','asc']]) desc
    // .limit(3)
    if(!products){
        return res.status(400).json({error:"products name is entered wrong"})
    }
    res.send(products)
}
// we can use select also 
// 2 ota or baadi chahi array ma dinu parha .. .select(['category_name','rating'])
// we can use minus also .select(['-rating'])


// to get product list of particular category
exports.getProductsByCategory = async (req, res) => {
    let products = await Product.find({category: req.params.category_id})
    if(!products){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(products)
}

// to update product
exports.updateProduct = async ( req, res) => {
    let producttoUpdate = await Product.findByIdAndUpdate(req.params.id,
        req.file?
        {
        product_name : req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating,
    }:
    {
        product_name : req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating,
    }
    ,{new:true})
    if(!producttoUpdate){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(producttoUpdate)
}

// to delete prouct (promis syntax)
exports.deleteProduct = (req,res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(product=>{
        if(!product){
            return  res.status(400).json({error:"Product not found"})
        }
        return res.status(200).json({messgae:"Product deleted successfully"})
    })
    .catch(error=>{
        return res.status(400).json({error:error.message})
    })
}