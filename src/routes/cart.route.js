import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router
    .route("/")
    .get(cartController.getCart)
    .post(cartController.postCart);

router
    .route("/purchase")
    .get(cartController.getCartPurchase);

export const cartRouter = router;