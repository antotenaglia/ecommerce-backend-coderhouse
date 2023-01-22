import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct)

router.route("/:_id")
    .get(productController.getProductById)
    .put(productController.updateProductById)
    .delete(productController.deleteProductById)

export const productRouter = router;