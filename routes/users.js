const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');
const ROUNDS = 10;

const config = require('config');

const User = require('../model/Users');
const Profile = require('../model/Profiles');
const jwt = require('jsonwebtoken');

router.post('/', [check("name","Name is Required").not().isEmpty(),
check("password","Password should contain at least 6 Characters").isLength({min:6}),
check("email","Invalid Email Address").isEmail(),
check('passwordConfirm', 'passwordConfirmation field must have the same value as the password field')
    .custom((value, { req }) => value === req.body.password)
]

,async (req, res, next)=> {

    
    const errors = validationResult(req);


    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()});
    }
    
    try {
        const {name,email, password} = req.body;

        let user= await User.findOne({email});
        if(user){

          return res.status(400).json({msg: "User already Exists"});
        }
        user = new User({
            name,
            email, 
            password
        });
        
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        const profile = new Profile({name, user: user._id });
        await profile.save();
        const payload = {
            user: {
              id: user.id
            }
          };
          

          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ token, expiresIn:3600, userId: user.id });
            }
          );

    }catch(err){
      console.log(err);
      res.status(500).json({msg: "Server Error"});
    }
} );


module.exports = router;