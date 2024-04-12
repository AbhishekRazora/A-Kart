import Brand from "../model/Brand.js"

export const fetchBrands=async(req,res,next)=>{
    try {
        const brands=await Brand.find({})
        res.status(200).json(brands)
    } catch (error) {
     res.status(400).json(error)   
    }

}

export const createBrand=async(req,res,next)=>{
    try {
        const brand=new Brand(req.body)
        await brand.save()
        res.status(201).json(brand) 
    } catch (error) {
        res.status(400).json(error)
        
    }

}