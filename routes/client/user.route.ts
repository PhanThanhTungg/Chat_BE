import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";
import * as validation from "../../validations/client/user.validation";

const router = Router();

router.post("/register", validation.registerValidation, controller.register);
router.get("/login",validation.loginValidation, controller.login)

export default router;
