import Cart from "../model/Cart.js"

export const addToCart=async(req,res,next)=>{
    try {
        const cart=new Cart(req.body)
        const cartItems=await (await cart.save()).populate('product')
        res.status(201).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
        
    }

}





export const fetchCartByUser=async(req,res,next)=>{
    try {
      
        const {id}=res.locals.jwtData;
       
        const cartItems=await Cart.find({user:id}).populate('user').populate('product');
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
        
    }

}


export const deleteFromCart=async(req,res,next)=>{
    try {
    const {id}=req.params;
    await Cart.findByIdAndDelete(id)
    res.status(200).json({message:"Deleted Successfully"})
} catch (error) {
    res.status(400).json(error)
    
}
}


export const updateCart=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const cart=await Cart.findByIdAndUpdate(id,req.body,{new:true})
        const result=await cart.populate('product');
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json(error)
        
    }

}