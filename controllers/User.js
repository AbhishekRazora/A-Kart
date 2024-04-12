import User from "../model/User.js"

export const fetchUser=async(req,res,next)=>{
    try {

        const user=await User.find({})
        res.status(200).json(user)
    } catch (error) {
     res.status(400).json(error)   
    }

}






export const fetchUserById=async(req,res,next)=>{
    try {
        const {id}=res.locals.jwtData;
        const user=await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
        
    }

}





export const updateUser=async(req,res,next)=>{
    try {
       
        const {id}=res.locals.jwtData;

        const user=await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
        
    }

}