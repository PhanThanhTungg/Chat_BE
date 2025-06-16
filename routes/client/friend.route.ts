import { Router } from "express";

import * as controller from "../../controllers/client/friend.controller";

const router = Router();

router.get("/getListUser", controller.getListUser);

export default router;
