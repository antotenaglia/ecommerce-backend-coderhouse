import Router from "koa-router";
import { cartController } from "../controllers/cart.controller.js";

const router = new Router({
    prefix: "/cart"
});

router.get("/", cartController.getCart);
router.post("/", cartController.postCart);
router.get("/purchase", cartController.getCartPurchase);

export const cartRouter = router;