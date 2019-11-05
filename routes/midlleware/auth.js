const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =(req, res, next)=>{

    const token= req.header('x-auth-token');

    
    if(!token){

        return res.status(401).json({msg:" No Token Found, please Login or Register"});
    }

    try{

        const decodedTok= jwt.verify(token, config.get("jwtSecret"));

        req.user = decodedTok.user;
        next();

    }catch(err){
        console.log("Bad Token");

        return res.status(401).json({msg:" Invalid Token"});
    }
}