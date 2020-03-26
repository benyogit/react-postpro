const express = require("express");
const AWS = require("aws-sdk");
const uuid = require('uuid/v1');
const { check, validationResult } = require("express-validator");
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID, 
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY

});
const router = express.Router();

const auth = require("./midlleware/auth");

router.get('/',auth, (req, res)=> {

    console.log("reach here in upload");
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl(
        "putObject",
         { 
        Bucket: "postpro-images", 
        ContentType: "images/jpeg",
        Key: key

        }, 
        (err, url) => 
        {
            
            return res.status(200).json({url, key}) ;
        }
        );
    //res.status(200).json({message:"Good "});
} );

module.exports = router;