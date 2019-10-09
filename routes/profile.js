const express = require("express");
const router = express.Router();

router.get('/', (req, res)=> {

    console.log(req);
    res.status.json({message:"dsadsa"});
} );


module.exports = router;