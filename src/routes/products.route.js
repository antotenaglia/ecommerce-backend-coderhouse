import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";

const router = Router();

router
    .route("/")
    .get(productsController.getProducts);

router
    .route("/loading")
    .get(isAdmin, productsController.getProductsLoading)
    .post(productsController.postProductsLoading);

router
    .route("/product/:_id")
    .get(productsController.getProductsById);

router
    .route("/:category")
    .get(productsController.getProductsByCategory);

router
    .route("/delete/:_id")
    .delete(isAdmin, productsController.deleteProduct);

router
    .route("/update/:_id")
    .get(isAdmin, productsController.getProductsUpdating)
    .put(isAdmin, productsController.updateProduct);

export const productRouter = router;