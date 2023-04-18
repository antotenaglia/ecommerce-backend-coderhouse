import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";

const router = Router();

router
    .route("/")
    .get(productsController.getProducts)

router
    .route("/loading")
    .get(isAdmin, productsController.getProductsLoading)
    .post(productsController.postProductsLoading)

router
    .route("/delete/:id")
    .delete(isAdmin, productsController.deleteProduct)

router
    .route("/update/:id")
    .get(isAdmin, productsController.getProductsUpdating)
    .put(isAdmin, productsController.updateProduct)

export const productRouter = router;