import { Router } from "express";
import productRouter from "./Product.js";
import categoryRouter from "./Category.js";
import brandRouter from "./Brand.js";
import userRouter from "./User.js";
import authRouter from "./Auth.js";
import cartRouter from "./Cart.js";
import orderRouter from "./Order.js";
import paymentRouter from "./Payment.js";



const router=Router()

router.use('/products',productRouter)
router.use('/category',categoryRouter)
router.use('/brands',brandRouter)
router.use('/user',userRouter)
router.use('/auth',authRouter)
router.use('/cart',cartRouter)
router.use('/orders',orderRouter)
router.use('/payment',paymentRouter)




    export default router;