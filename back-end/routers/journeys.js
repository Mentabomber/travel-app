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

import { checkValidity } from "../middlewares/schemaValidator";
import { validateJourney } from "../validations/journeyInput";

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
  multer({ storage: storage }).single("image"),
  validateJourney,
  checkValidity,
  store
);

router.get("/:id", show);

router.get("/", index);

router.put(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  journeyRoleHandler("organizer"),
  multer({ storage: storage }).single("image"),
  validateJourney,
  checkValidity,
  update
);

router.delete(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  journeyRoleHandler("organizer"),
  destroy
);

export default router;
