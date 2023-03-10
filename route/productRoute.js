const express = require('express')
const { addProduct, getAllProducts, getProductsByCategory, updateProduct, deleteProduct, productDetail, getFillteredProduct } = require('../controller/ProdutController')
const { requireSignin, updateRole } = require('../controller/userController')
const upload = require('../Utlis/FileUpload')
const { validate, productCheck } = require('../Validation')
const router= express.Router()

router.post('/addproduct',upload.single('product_image'), requireSignin, productCheck, validate, addProduct)
router.get('/getallproducts',getAllProducts)
router.get('/getproductsbycategory/:category_id',getProductsByCategory)
router.put('/updateproduct/:id',upload.single('product_image'),updateProduct)
router.delete('/deleteproduct/:id',deleteProduct)
router.get('/productdetail/:id', productDetail)
router.post('/getfilteredproducts', getFillteredProduct)

module.exports = router