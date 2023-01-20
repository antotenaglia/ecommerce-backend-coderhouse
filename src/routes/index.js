import { Router } from "express";
import { cartRouter } from "./cart.route.js";
import { productRouter } from "./product.route.js";

const router = Router();

router.use("/carts", cartRouter);
router.use("/products", productRouter);

export default router;