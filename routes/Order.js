import { Router } from "express";
import { createOrder, deleteOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from "../controllers/Order.js";
import { verifyToken } from "../utils/token-manager.js";

const orderRouter=Router()

orderRouter.post('/',verifyToken,createOrder)
orderRouter.get('/',verifyToken,fetchOrdersByUser)
orderRouter.patch('/:id',verifyToken,updateOrder)
orderRouter.delete('/:id',verifyToken,deleteOrder)
orderRouter.get('/admin',verifyToken,fetchAllOrders)


export default orderRouter;