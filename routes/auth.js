
const express = require("express");
const router = express.Router();
const auth = require('./midlleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../model/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

router.get('/',auth, (req, res)=> {

    console.log(req);
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
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({ token });
            }
          );

    }catch(err){
      res.status(500).json({errors: [{msg: "Server Error"}]});
    }
} );
module.exports = router;
