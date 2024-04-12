import { Router } from "express";
import { createCategory, fetchCategory } from "../controllers/Category.js";
import { verifyToken } from "../utils/token-manager.js";

const categoryRouter=Router()

categoryRouter.get('/',fetchCategory)
categoryRouter.post('/',verifyToken,createCategory)


export default categoryRouter;