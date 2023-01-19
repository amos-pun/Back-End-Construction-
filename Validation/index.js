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

exports.userCheck = [
    check('username','username is required').notEmpty()
        .isLength({min:3}).withMessage('Username musst be at least 3 characters'),
    check('email','Email is required').notEmpty()
        .isEmail().withMessage("Email format incorrect"),
    check('password',"password is required").notEmpty()
        .isLength({min:8}).withMessage("Password must be at least 8 character")
        .not().isIn(['asdf1234','password','12345678']).withMessage("cannot use common words")
        .matches(/[a-z]/).withMessage("password must be at least one lowercase character")
        .matches(/[A-Z]/).withMessage("password must be at least one Upper character")
        .matches(/[0-9]/).withMessage("password must be at least one numeric character")
        .matches(/[-+_!@#$%^&*]/).withMessage("password must be at least one special character")
        .not().matches(/[\\;:.,]/).withMessage("\:;., are not allowed in password")
]
// .matches ma expression ma dinu milcha .. ie. (/[-+]/)
// .isIn ma array ma dinu milcha .. ie. (['amso','password','1234567890'])

