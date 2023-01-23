const express = require('express')
const { register, verifyEmail, resendVerification, forgetPassword, resetPassword, getAllUsers, getUserDetail, findUser, updateUser, removeUser, signIn, signOut, deleteAll } = require('../controller/userController')
const { userCheck, validate } = require('../Validation')
const router = express.Router()

router.post('/register',userCheck, validate, register)
router.get(`/verifyEmail/:token`, verifyEmail)
router.post('/resendVerification',resendVerification)
router.post('/forgotpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.get('/userslist',getAllUsers)
router.get('/userdetail/:id',getUserDetail)
router.get('/findusers', findUser)
router.put('/updateuser/:id',updateUser)
router.delete('/removeuser', removeUser)
router.delete('/deleteall', deleteAll)
router.post('/signin',userCheck, validate, signIn)
router.get('/signout', signOut)

module.exports = router