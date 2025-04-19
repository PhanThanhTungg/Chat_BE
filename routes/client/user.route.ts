import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";
import { registerValidation } from "../../validations/client/user.validation";

const router = Router();

router.post("/register", registerValidation, controller.register);

export default router;
