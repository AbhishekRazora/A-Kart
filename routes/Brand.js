import { Router } from "express";
import { createBrand, fetchBrands } from "../controllers/Brand.js";
import { verifyToken } from "../utils/token-manager.js";

const brandRouter=Router()

brandRouter.get('/',fetchBrands)
brandRouter.post('/',verifyToken,createBrand)

export default brandRouter;