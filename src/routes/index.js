import { Router } from "express";
import { cartRouter } from "./cart.route.js";
import { chatRouter } from "./chat.route.js";
import { configRouter } from "./config.route.js";
import { indexRouter } from "./index.route.js";
import { loginRouter } from "./login.route.js";
import { logoutRouter } from "./logout.route.js";
import { productRouter } from "./products.route.js";
import { registerRouter } from "./register.route.js";
import { orderRouter } from "./order.route.js";
import { warningRouter } from "./warning.route.js";

const router = Router();

router.use("/cart", cartRouter);
router.use("/chat", chatRouter);
router.use("/config", configRouter);
router.use("/index", indexRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/products", productRouter);
router.use("/register", registerRouter);
router.use("/order", orderRouter);
router.use("/", warningRouter);

export default router;