import { Router } from "express";

import * as controller from "../../controllers/client/conversation.controller";

const router = Router();

router.get("/:typeConversation/:id", controller.getMessage);

export default router;
