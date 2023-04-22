import Router from "koa-router";
import { productsController } from "../controllers/products.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";

const router = new Router({
    prefix: "/products"
});

router.get("/", productsController.getProducts);
router.get("/loading", isAdmin, productsController.getProductsLoading)
router.post("/loading", productsController.postProductsLoading)
router.delete("/delete/:id", isAdmin, productsController.deleteProduct)
router.get("/update/:id", isAdmin, productsController.getProductsUpdating)
router.put("/update/:id", isAdmin, productsController.updateProduct)

export const productRouter = router;