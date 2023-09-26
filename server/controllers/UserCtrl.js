const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userCtrl = {
    register: async (req,res)=>{
        try {
            const { name, email, password} = req.body;


            //check if email already exists
            const user = await Users.findOne({email})
            if (user) return res.status(400).json({msg: "this email already exists"})


            //check if password meets the length requirements
            if (password.length < 6)
            return res.status(400).json({msg: 'password must be at least 6 characters'})

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name,
                email, 
                password: passwordHash      //store hashed password in database
            })
            await newUser.save();          //save new user

            const accessToken = createAccessToken({id: newUser._id})
            const refreshToken = createRefreshToken({id: newUser._id})
            res.cookie('refreshToken' , refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            return res.json({accessToken})
            } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async (req,res)=>{
        try {
                const {email, password} = req.body;
            
                const user = await Users.findOne({email})
                if(!user) return res.status(400).json({msg:'user does not exist'})
            
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg:'incorrect password'})
            
                // If the email and password are correct, create an access token and a refresh token
                const accessToken = createAccessToken({id: user._id})
                const refreshToken = createRefreshToken({id: user._id})

                // Set the refresh token as an HTTP-only cookie for secure storage
                    res.cookie('refreshToken' ,refreshToken,{
                        httpOnly:true,
                        path:'/user/refresh_token'
                    })
            
                    return res.json({accessToken})
            
                } catch (err) {
                return res.status(500).json({msg: err.message})
            }
    },
    logout: async(req,res)=>{
        try {
                res.clearCookie('refreshToken', {path: '/user/refresh_token' })
                return res.json({msg:"Logged Out Successfully"})
                } catch (err) {
                return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: async (req, res)=> {
        try {
            const rf_token = req.cookies.refreshToken;
            if(!rf_token) return res.status(400).json({msg: 'Please Login or Register'})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET,(err, user)=>{
                if(err) return res.status(400).json({msg: 'Login OR Register Now'})
                const accessToken = createAccessToken({id: user.id})
                return res.json({accessToken})
            })
            } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req,res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:"user does not exist"})

            return res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addCart: async (req,res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg:"user does not exist"})
            await Users.findOneAndUpdate({_id: req.user.id},{
                cart:req.body.cart
            })
            return res.json({msg: 'added to Cart'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl