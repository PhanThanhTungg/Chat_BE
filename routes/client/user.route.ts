import { Router } from "express";

import * as controller from "../../controllers/user.controller";
const router = Router();

router.post("/register", controller.register);

export default router;
