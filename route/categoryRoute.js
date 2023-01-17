const express = require('express')
const { addCategory, getAllCategories, getDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { requireSignin } = require('../controller/userController')
const { categoryCheck, validate } = require('../Validation')
const router = express.Router()

router.post('/addcategory',requireSignin, categoryCheck, validate, addCategory)
router.get('/getallcategories',getAllCategories)
router.get('/getcategorydetails/:id',getDetails)
router.put('/updatecategory/:id',updateCategory)
router.delete('/deletecategory/:id',deleteCategory)

module.exports = router