const jwt=require("jsonwebtoken");

const createToken=(authInfo)=>{
    const payload={
        ...authInfo
    }

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'15m'});
}

const validateToken=(token)=>{
    const payload= jwt.verify(token,process.env.JWT_SECRET_KEY);
    return payload;
}

module.exports={createToken,validateToken};