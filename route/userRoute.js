const express = require('express')
const { register, verifyEmail, resendVerification, forgetPassword, resetPassword, getAllUsers, getUserDetail, findUser, updateUser, removeUser, signIn, signOut, deleteAll, updateRoleAdmin, updateRoleUser } = require('../controller/userController')
const { userCheck, validate } = require('../Validation')
const router = express.Router()

router.post('/register',userCheck, validate, register)
router.get(`/verifyEmail/:token`, verifyEmail)
router.post('/resendVerification',resendVerification)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.get('/userslist',getAllUsers)
router.get('/userdetail/:id',getUserDetail)
router.get('/findusers', findUser)
router.put('/updateuser/:id',updateUser)
router.put('/updaterole/:id', updateRoleAdmin )
router.put('/updateroleuser/:id', updateRoleUser )
router.delete('/removeuser/:id', removeUser)
router.delete('/deleteall', deleteAll)

router.post('/signin', validate, userCheck, signIn)
router.get('/signout', signOut)

router.post('/adminrole', )

module.exports = router