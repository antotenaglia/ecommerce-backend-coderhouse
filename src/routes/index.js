import Router from "koa-router";
import { cartRouter } from "./cart.route.js";
import { indexRouter } from "./index.route.js";
import { loginRouter } from "./login.route.js";
import { logoutRouter } from "./logout.route.js";
import { productRouter } from "./products.route.js";
import { registerRouter } from "./register.route.js";
//import { warningRouter } from "./warning.route.js";

const router = new Router({
    prefix: "/api",
  });
  
router.use(cartRouter.routes());
router.use(indexRouter.routes());
router.use(loginRouter.routes());
router.use(logoutRouter.routes());
router.use(productRouter.routes());
router.use(registerRouter.routes());
//router.use(warningRouter.routes());

export default router;