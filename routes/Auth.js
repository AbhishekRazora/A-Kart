import { Router } from "express";
import { checkUserAuth, createUser, loginUser, resetPassword, resetPasswordRequest, signOutUser } from "../controllers/Auth.js";
import passport from "passport";
import { verifyToken } from "../utils/token-manager.js";


const authRouter=Router()

authRouter.post('/sign-up',createUser)
authRouter.post('/sign-in',loginUser)
authRouter.get('/check',verifyToken,checkUserAuth)
authRouter.get('/sign-out',verifyToken,signOutUser)
authRouter.post('/reset-password-request',resetPasswordRequest)
authRouter.post('/reset-password',resetPassword)


export default authRouter;