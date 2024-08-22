import { Router } from "express";
const router = Router();

//controllers
import stagesController from "../controllers/stages.js";

//middlewares
import authHandlerMiddleware from "../middlewares/authHandler.js";
import journeyRoleHandler from "../middlewares/journeyRoleHandler.js";

//validators

import { checkValidity } from "../middlewares/schemaValidator.js";
import validateStage from "../validations/stageInput.js";

router.post(
  "/",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  validateStage,
  checkValidity,
  stagesController.store
);

router.get("/:id", stagesController.show);

router.get("/", stagesController.showAllJourneyStages);

router.put(
  "/:id",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  validateStage,
  checkValidity,
  stagesController.update
);

router.delete(
  "/:id",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  stagesController.destroy
);

export default router;
