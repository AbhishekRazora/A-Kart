import jwt from 'jsonwebtoken'
import { COOKIE_Name } from './constant.js'


/*****==== Creating the token=====*** */


export const createToken=(id,email,expiresIn)=>{
    const payload={id,email}

    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn,
    })
    return token;

}



/***===== verify the token ======*** */

export const verifyToken=async(req,res,next)=>{

    const token=req.signedCookies[`${COOKIE_Name}`]

    if(!token || token.trim()===""){
        return res.status(401).json({success:false,message:"Token Not Received"})
    }

    return new Promise((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{

            if(err){
                reject(err.message)
                return res.status(401).json({success:false,message:"Token Expired"})

            }else{
                // console.log('token verify')
                resolve()
                res.locals.jwtData=success;
                // console.log(res.locals.jwtData)
                return next();
            }

        })

    })
    
}