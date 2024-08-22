import { Router } from "express";
const router = Router();

//controllers
import authControllers from "../controllers/auth.js";

//middlewares
import { checkSchema } from "express-validator";
import { checkValidity } from "../middlewares/schemaValidator.js";
import userRegister from "../validations/userRegister.js";
import userLogin from "../validations/userLogin.js";
import authHandler from "../middlewares/authHandler.js";

router.post(
  "/register",
  checkSchema(userRegister),
  checkValidity,
  authControllers.register
);
router.post(
  "/login",
  checkSchema(userLogin),
  checkValidity,
  authControllers.login
);

router.get("/me", authHandler, authControllers.me);
router.get("/showEmails", authControllers.showEmails);
export default router;
