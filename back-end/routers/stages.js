import { Router } from "express";
const router = Router();

//controllers
import {
  store,
  showAllJourneyStages,
  update,
  destroy,
} from "../controllers/stages";

//middlewares
import authHandlerMiddleware from "../middlewares/authHandler";
import journeyRoleHandler from "../middlewares/journeyRoleHandler";

//validators

import { checkValidity } from "../middlewares/schemaValidator";
import { validateStage } from "../validations/stageInput";

router.post(
  "/",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  validateStage,
  checkValidity,
  store
);

router.get("/:id", show);

router.get("/", showAllJourneyStages);

router.put(
  "/:id",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  validateStage,
  checkValidity,
  update
);

router.delete(
  "/:id",
  authHandlerMiddleware,
  journeyRoleHandler("organizer"),
  destroy
);

export default router;
