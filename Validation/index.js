const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_name',"category_name is required").notEmpty()
    .isLength({min:3}).withMessage("Category name must be at least 3 characters")

]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next()
}

exports.productCheck = [
    check('product_name','Product name is required').notEmpty()
        .isLength({min:3}).withMessage('produt must have at least 3 character'),

    check('product_price','Price is required').notEmpty()
        .isNumeric().withMessage('Price must be a number'),

    check('product_description','Description is required').notEmpty()
        .isLength({min:20}).withMessage('Description must be at least 20 character'),

    check('category','category is required').notEmpty(),

    check('count_in_stock',"count in stock is required").notEmpty()
        .isNumeric().withMessage('Count must be a number')
]


