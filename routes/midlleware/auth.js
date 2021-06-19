const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =(req, res, next)=>{

    const token = req.header('x-auth-token');

    
    if(!token){

        return res.status(401).json({msg:" No Token Found, please Login or Register"});
    }

    try{
        const decodedTok = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedTok.user;
        next();

    }catch(err){
        console.log("Bad Token");
        console.log(process.env.JWT_SECRET);
        console.log(err);

        return res.status(401).json({msg:" Invalid Token"});
    }
}