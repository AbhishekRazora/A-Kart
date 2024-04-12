import Order from "../model/Order.js"
import Product from "../model/Product.js"
import User from "../model/User.js"
import sendEmail from "../utils/email.js"
import { invoiceTemplate } from "../utils/invoiceTemplate.js"

export const createOrder=async(req,res,next)=>{
    try {
        const order=new Order(req.body)
      

        /*****==here we have to update stocks===**** */

        for(let item of order.items){
           let product= await Product.findOne({_id:item.product.id})
           product.$inc('stock',-1*item.quantity);
           await product.save()
        }

        await order.save()
        const user= await User.findById(order.user)
        /*******Sendind mail****** */
        const subject=`Order Confiremed ! `
        sendEmail({
            email: user.email,
            subject,
            // message,
            html:invoiceTemplate(order)
        })
       
        /***********=============******* */
       return res.status(201).json(order)
    } catch (error) {
        return res.status(400).json(error)
        
    }

}





export const fetchOrdersByUser=async(req,res,next)=>{
    try {
        const {id}=res.locals.jwtData
        // const orders=await Order.find({user:id}).populate('user');
        const orders=await Order.find({user:id});
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json(error)
        
    }

}


export const deleteOrder=async(req,res,next)=>{
    try {
    const {id}=req.params;
    await Order.findByIdAndDelete(id)
    res.status(200).json({message:"Deleted Successfully"})
} catch (error) {
    res.status(400).json(error)
    
}
}


export const updateOrder=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const order=await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(order)
        
    } catch (error) {
        res.status(400).json(error)
        
    }

}


export const fetchAllOrders= async(req,res,next)=>{
    try {
        // here we need all query string
        // filter={"category":["smartphone","laptops"]}
        // sort ={_sort:"price",_order="desc"}
        // pagination={_page:1,_limit=10}

       
        let query=Order.find({})
        let totalOrdersQuery=Order.find({})

        
       
        if(req.query._sort && req.query._order){
            query= query.sort({[req.query._sort]:req.query._order});
        }

        

        if(req.query._page && req.query._limit){
            const pageLimit=req.query._limit;
            const page=req.query._page
            query=query.skip(pageLimit*(page-1)).limit(pageLimit);
        }


        // const totalItem=await query.countDocuments()
        const orders= await query
        const totalOrder=await totalOrdersQuery.countDocuments()
        

        
       
        res.set('X-Total-Count',totalOrder)
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json(error)
    }

}