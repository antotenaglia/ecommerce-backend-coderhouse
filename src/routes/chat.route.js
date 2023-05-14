import { Router } from "express";
import { chatController } from "../controllers/chat.controller.js";
import isAdmin from "../middleware/admin.mddleware.js";

const router = Router();

router
    .route("/")
    .get(chatController.getChat)
    .post(chatController.postChat);

router
    .route("/admin")
    .get(isAdmin, chatController.getChatSummary);

router
    .route("/:username")
    .get(chatController.getChatByUsername);


export const chatRouter = router;