import { Router } from "express";
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from "../controllers/Cart.js";
import { verifyToken } from "../utils/token-manager.js";

const cartRouter=Router()

cartRouter.post('/',verifyToken,addToCart)
cartRouter.get('/',verifyToken,fetchCartByUser)
cartRouter.patch('/:id',verifyToken,updateCart)
cartRouter.delete('/:id',verifyToken,deleteFromCart)



export default cartRouter;