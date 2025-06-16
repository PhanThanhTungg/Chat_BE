import { Router } from "express";

import * as controller from "../../controllers/client/friend.controller";

const router = Router();

router.post("/getListUser/:input", controller.getListUser);

export default router;
