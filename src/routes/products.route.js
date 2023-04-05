import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = Router();

router
    .route("/")
    .get(productsController.getProducts);

router
    .route("/loading")
    .get(isAdmin, productsController.getProductsLoading)
    .post(productsController.postProductsLoading);

export const productRouter = router;