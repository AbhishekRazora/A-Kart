import { Router } from "express";
import { createProduct, fetchAllProducts, fetchProductsById, updateProducts } from "../controllers/Product.js";
import { verifyToken } from "../utils/token-manager.js";
import Product from "../model/Product.js";



const productRouter=Router()

productRouter.route('/')
    .post(verifyToken,createProduct)
    productRouter.get("/",fetchAllProducts)
    productRouter.get("/:id",fetchProductsById)
    productRouter.patch('/:id',verifyToken,updateProducts)
    // productRouter.get('/update/test',async(req,res)=>{
    //     try {
    //         const products=await Product.find({})
    //     for(let product of products){
    //         product.discountedPrice=Math.round(product.price*(1-product.discountPercentage/100))
    //         await product.save()
    //         console.log(product.title+ ' updated')
    //     }
    //     res.status(201).json({message:'updated'})
    //     } catch (error) {
    //         return res.status(400).json({error})
    //     }
        
    // })

    export default productRouter;