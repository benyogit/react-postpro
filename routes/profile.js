const express = require("express");
const router = express.Router();
const auth = require('./midlleware/auth');
const Profile = require('../model/Profiles');

router.get('/self', auth, async (req, res)=> {

    try{
        const profile = await Profile.findOne({ user: req.user.id});

        if(!profile){
            res.status(400).json({msg:"This is not the User's profile"});
        }
        
        res.status(200).json({profile});
        
    }catch(error){
        res.status(500).json({msg:"Server Error"});
    }
} );


module.exports = router;