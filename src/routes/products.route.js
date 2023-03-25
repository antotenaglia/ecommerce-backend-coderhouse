import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";

const router = Router();

router
    .route("/")
    .get(productsController.getProducts);

router
    .route("/loading")
    .get(isAdmin, productsController.getProductsLoading);

export const productRouter = router;