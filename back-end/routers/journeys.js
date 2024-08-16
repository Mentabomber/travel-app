import { Router } from "express";
const router = Router();
import { mkdirSync } from "fs";
//controllers
import { store, show, index, update, destroy } from "../controllers/journeys";
//middlewares
import authHandlerMiddleware from "../middlewares/authHandler";
import userIdHandlerMiddleware from "../middlewares/userIdHandler";
import authRoleHandlerMiddleware from "../middlewares/authRoleHandler";
import notFound from "../middlewares/routeNotFound";
//validators
import { checkSchema } from "express-validator";
import { checkValidity } from "../middlewares/schemaValidator";
import journeyInput from "../validations/photoInput";

import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: (req, file, cb) => {
    const path = `storage/uploads/${req.user.name}/`;
    mkdirSync(path, { recursive: true }); // It creates the directory if it doesn't exist
    cb(null, path);
  },
  filename: (req, file, cb) => {
    console.log(file, "file");
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // Nome del file
  },
});

router.post(
  "/",
  authHandlerMiddleware,
  authRoleHandlerMiddleware(["admin"]),
  multer({ storage: storage }).single("image"),
  checkSchema(journeyInput),
  checkValidity,
  store
);

router.get("/:id", show);

router.get("/", index);

router.put(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  authRoleHandlerMiddleware(["admin"]),
  multer({ storage: storage }).single("image"),
  checkSchema(photoInput),
  checkValidity,
  update
);

router.put(
  "/published/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  authRoleHandlerMiddleware([, "admin"]),
  multer({ storage: storage }).single("image"),
  // checkSchema(journeyInput),
  checkValidity,
  updatePublishedState
);

router.delete(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  authRoleHandlerMiddleware(["admin"]),
  destroy
);

export default router;
