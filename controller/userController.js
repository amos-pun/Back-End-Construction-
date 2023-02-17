const User = require('../Model/userModel')
const Token = require('../Model/TokenModel')
const sendEmail = require('../Utlis/setEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const {expressjwt} = require('express-jwt')

// register new user
exports.register = async (req, res) => {

    const { username, email, password } = req.body

    // check if email already registered
    const user = await User.findOne({email: email})
    if(user){
        return res.status(400).json({error:"Email already exists."})
    }

    let newUser = new User({
        username: username,
        email : email,
        password : password
    })
    
    // add user to database
    newUser = await newUser.save()
    if(!newUser){
        return res.status(400).json({error:"something went wrong"})
    }
    // token generate 
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: newUser._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({erros:"failed to generate"})
    }

    // send token in email
    // const url = `http://localhost:5000/api/verifyEmail/${token.token}`
    const url1 = `${process.env.FRONTEND_URL}/verifyEmail/${token.token}`

    sendEmail({
        from: "noreply@something.com",
        to: newUser.email,
        subject: "Verification Email",
        text: `Click to verify email. ${url1}`,
        html: `<a href="${url1}"><button>Verify</button></a>`
    })

    res.send(newUser)
}

// to verify user
exports.verifyEmail = async (req, res) => {

    // check token
    const token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error:"Invalid token or may have expire"})
    }

    // find users
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    // check if already verified
    if(user.isVerified){
        return res.status(400).json({error:"User already verified. Login to continue"})
    }
    // verify user
    user.isVerified = true
    user = await user.save()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send({message:"User verified successfully."})
}

// to resend verification email
exports.resendVerification = async (req, res) => {
    // check if email is registered or not
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    // check if already verified
    if(user.isVerified){
        return res.status(400).json({error:"Email/User already verified"})
    }
    // generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    // send token in email
    // const url = `http://localhost:5000/api/verifyEmail/${token.token}`
    const aa = `${process.env.FRONTEND_URL}/verifyEmail/${token.token}`

    sendEmail({
        from: "noreply@something.com",
        to: user.email,
        subject: "Verification Email",
        text: `Click to verify email. ${aa}`,
        html: `<a href="${aa}"><button>Verify Email</button></a>`
    })

    res.send({message:"Verification link has been sent to your email."});
    console.log("token number hase been send")
}

 // forget password
 exports.forgetPassword = async (req, res) => {
    // check email
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }

    // generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }

    // send in email
    //  const url = `http://localhost:5000/api/resetpassword/${token.token}`
     const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`
     sendEmail({
         from:"noreply@gmail.com",
         to: user.email,
         subject: "Password reset email",
         text:`Click on the link to reset password ${url}`,
         html:`<a href="${url}"><button>Reset Password</button></a>`
     })
    res.send({message:"Reset password has been sent verify it quick"})
 }

//  to reset password
exports.resetPassword = async (req, res) => {
    const token = await Token.findOne({token: req.params.token})
    if(!token){
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }

    // find User
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error:"something went wrong"})
    }
    user.password = req.body.password
    user = await user.save()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Password hase been reset"})
}
    

// get all users list
// .populate() to join the Table
// for example.. produt ma category join garnu lai populate gareyko cha.
exports.getAllUsers = async (req, res) => {
    let users = await User.find()
    .select(['username','email','role'])
    // array .select(['username','email'])
    if(!users){
        return res.status(400).json({error:"user do not exist"})
    }
    res.send(users)
}

// to get user details
exports.getUserDetail = async (req, res) => {
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"User name do not match"})
    }
    res.send(user)
}

// to get user according to usernmae or email
// --> .find({username: req.body.username})
// --> .find({username: req.params.username})
// --> .find({email: req.body.email})
// --> .find({email: req.params.email})
exports.findUser = async (req, res) => {
    let user = await User.find({username: req.body.username}).select(['username','createdat']).sort({date:-1})
    if(!user){
        return res.send({error:"username do not exist"})
    }
    res.send(user)
}

// to update username
exports.updateUser = async(req,res)=>{
    let user = await User.findByIdAndUpdate(req.params.id,
        {
        username: req.body.username,
        email: req.body.email,
        isVerified: req.body.isVerified,
        role: req.body.role
    },{new:true})
    if(!user){
        return res.send({error:"Cannot update your request"})
    }
    res.send(user)
}

// to update role Admin
exports.updateRoleAdmin = async(req,res)=>{
    let user = await User.findByIdAndUpdate(req.params.id,
        {
            role: 1
        }   
    ,{new:true})
    if(!user){
        return res.send({error:"Cannot update your request"})
    }
    res.send(user)
}

// to update role user
exports.updateRoleUser = async(req,res)=>{
    let user = await User.findByIdAndUpdate(req.params.id,
        {
            role: 0
        }   
    ,{new:true})
    if(!user){
        return res.send({error:"Cannot update your request"})
    }
    res.send(user)
}

// to remove username
exports.removeUser = async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.send({error:"Cannot remove"})
    }
    res.send({msg:"User has been removed"})
}

// to delete all users
exports.deleteAll = async (req, res) => {
    let user = await User.remove({})
    if(!user){
        return res.status(400).json({error:"Users not available"})
    }
    res.send(user)
}

// sign process
exports.signIn = async (req, res) => {
    let{email, password} = req.body
    // check email
    let user = await User.findOne({email: email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    
    // check password
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Email and password do not match"})
    }
    
    // check if verified
    if(!user.isVerified){
        return  res.status(400).json({error:"User not Verified"})
    }
    
    // create sign in token
    let token = jwt.sign({user: user._id, role: user.role}, process.env.JWT_SECRET)

    // set Cookie
    res.cookie('myCookie', token, {expire: Date.now()+86400 })
    
    // return info to frontend
    let { _id, username, role} = user
    res.send({token, user:{_id, username, email, role}})
    
}

// signOut
exports.signOut = async (req, res) => {
    await res.clearCookie('myCookie')
    res.send({message:"Signed Out Successfully"})
}

// for authorization
// jo koi ley product add garna mildaina .. or anyone do not have access to add products or category
//  this for admin purpose only
exports.requireSignin = expressjwt({
    algorithms : ['HS256'],
    secret : process.env.JWT_SECRET
})
