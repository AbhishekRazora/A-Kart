import Category from "../model/Category.js"

export const fetchCategory=async(req,res,next)=>{
    try {
        const categories=await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
     res.status(400).json(error)   
    }

}



export const createCategory=async(req,res,next)=>{
    try {
        const category=new Category(req.body)
        await category.save()
        res.status(201).json(category) 
    } catch (error) {
        res.status(400).json(error)
        
    }

}