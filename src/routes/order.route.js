import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

router
    .route("/")
    .get(orderController.getOrder);

export const orderRouter = router;