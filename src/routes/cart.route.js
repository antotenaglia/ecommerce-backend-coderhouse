import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router
    .route("/")
    .get(cartController.getCart)
    .post(cartController.postCart);

router
    .route("/:_idCart/delete")
    .delete(cartController.deleteCart);

router
    .route("/:_idCart/delete/product/:_idProduct")
    .delete(cartController.deleteProductInCart);

export const cartRouter = router;