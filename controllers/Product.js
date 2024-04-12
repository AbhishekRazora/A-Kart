import Product from "../model/Product.js"

export const createProduct= async(req,res,next)=>{
    try {
        const product=new Product(req.body)
        product.discountedPrice=Math.round(product.price*(1-product.discountPercentage/100))
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error)
    }

}

export const fetchAllProducts= async(req,res,next)=>{
    try {
        // // here we need all query string
        // // filter={"category":["smartphone","laptops"]}
        // // sort ={_sort:"price",_order="desc"}
        // // pagination={_page:1,_limit=10}

       
        let condition={}

        if(!req.query.admin){
            condition.deleted={$ne:true}
        }
        
        let query=Product.find(condition)
       
        let totalProductsQuery=Product.find(condition)

       
        if(req.query.category){
            query= query.find({category:{$in:req.query.category.split(',')}})
         
            totalProductsQuery= totalProductsQuery.find({category:{$in:req.query.category.split(',')}})
        }
        if(req.query.brand){
          
            query= query.find({brand:{$in:req.query.brand.split(',')}})
            totalProductsQuery= totalProductsQuery.find({brand:{$in:req.query.brand.split(',')}})
        }
        if(req.query._sort && req.query._order){
            query= query.sort({[req.query._sort]:req.query._order});
            totalProductsQuery= totalProductsQuery.sort({[req.query._sort]:req.query._order});
        }

        const totalDocs=await totalProductsQuery.countDocuments()
        
        
       
        if(req.query._page && req.query._limit){
            const pageLimit=req.query._limit;
            const page=req.query._page
           
            query=query.skip(pageLimit*(page-1)).limit(pageLimit);
        }

      
        const product= await query.exec()
      

        
        
        res.set('X-Total-Count',totalDocs)
       
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json(error)
    }

}


export const fetchProductsById=async(req,res,next)=>{
    const {id}=req.params;

    try {
        const product=await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
        
    }

}

export  const updateProducts=async(req,res,next)=>{
    const {id} =req.params;
    try {
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
        product.discountedPrice=Math.round(product.price*(1-product.discountPercentage/100))
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
        
    }
}