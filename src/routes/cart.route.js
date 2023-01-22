import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.route("/")
    .get(cartController.getAllCarts)
    .post(cartController.createCart)

router.route("/:_id")
    .get(cartController.getCartById)
    .put(cartController.updateCartById)
    .delete(cartController.deleteCartById)

export const cartRouter = router;