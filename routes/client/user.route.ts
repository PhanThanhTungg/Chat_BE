import { Router } from "express";

import * as controller from "../../controllers/client/user.controller";
import * as validation from "../../validations/client/user.validation";

const router = Router();

router.post("/register", validation.registerValidation, controller.register);
router.post("/login",validation.loginValidation, controller.login);
router.post("/logout", controller.logout);
router.post("/refreshToken", controller.refreshToken);


export default router;
