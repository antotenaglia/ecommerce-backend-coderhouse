import { Router } from "express";
import { registerController } from "../controllers/register.controller.js";
import uploadFileMiddleware from "../lib/multer.lib.js";

const router = Router();

router
    .route("/")
    .get(registerController.getRegister)
    .post(uploadFileMiddleware.single("photo"), registerController.postRegister);


router
    .route("/fail")
    .get(registerController.getRegisterFailure);

export const registerRouter = router;