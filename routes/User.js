import { Router } from "express";
import { fetchUser, fetchUserById, updateUser } from "../controllers/User.js";
import { verifyToken } from "../utils/token-manager.js";


const userRouter=Router()

userRouter.get('/',verifyToken,fetchUserById)
userRouter.patch("/",verifyToken,updateUser)

export default userRouter;