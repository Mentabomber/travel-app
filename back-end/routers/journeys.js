import { Router } from "express";
const router = Router();
import { mkdirSync } from "fs";
//controllers
import journeysController from "../controllers/journeys.js";
//middlewares
import authHandlerMiddleware from "../middlewares/authHandler.js";
import userIdHandlerMiddleware from "../middlewares/userIdHandler.js";
import journeyRoleHandler from "../middlewares/journeyRoleHandler.js";
import authRoleHandlerMiddleware from "../middlewares/authRoleHandler.js";
import notFound from "../middlewares/routeNotFound.js";
//validators

import { checkValidity } from "../middlewares/schemaValidator.js";
import validateJourney from "../validations/journeyInput.js";

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
  journeysController.store
);

router.get("/:id", journeysController.show);

router.get("/", journeysController.index);

router.put(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  journeyRoleHandler("organizer"),
  multer({ storage: storage }).single("image"),
  validateJourney,
  checkValidity,
  journeysController.update
);

router.delete(
  "/:id",
  authHandlerMiddleware,
  userIdHandlerMiddleware,
  journeyRoleHandler("organizer"),
  journeysController.destroy
);

export default router;
