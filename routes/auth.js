
const express = require("express");
const router = express.Router();
const auth = require('./midlleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../model/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

router.get('/',auth, (req, res)=> {

    
    res.status(200).json({message:"Good "});
} );


router.post('/', [
check("password","Bad Credintials").not().isEmpty(),
check("email","Bad Credintials").not().isEmpty()
]

,async (req, res, next)=> {

    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({msg: "Bad credintials"});
    }
    
    try {
        const {email, password} = req.body;

        let user= await User.findOne({email});
        if(! user){
            return res.status(400).json({msg: "Bad credintials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({msg: "Bad credintials"});
        }
        const payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(
            payload,
                process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ token, expiresIn:3600, userId:user.id});
            }
          );

    }catch(err){
      res.status(500).json({msg: "Server Error"});
    }
} );
module.exports = router;
