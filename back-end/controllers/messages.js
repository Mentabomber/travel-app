import { PrismaClient } from "@prisma/client";
import { ValidationError } from "../exceptions/ValidationError";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

async function send(req, res) {
  const inputData = req.body;
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return next(
      new ValidationError("Check the input data", validation.array())
    );
  }
  const newStage = await prisma.stage.create({
    data: {
      title: inputData.title,
      description: inputData.description,
      date: inputData.date,
      lat: inputData.lat,
      lng: inputData.lng,
    },
  });

  return res.json(newStage);
}

async function show(req, res) {
  const { id } = req.params;

  try {
    // Fetch the stage by ID
    const showStage = await prisma.stage.findUnique({
      where: {
        id: parseInt(id), // Ensure ID is an integer
      },
    });

    if (!showStage) {
      return res.status(404).json({ error: "Stage not found" });
    }

    return res.json(showStage);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the stage" });
  }
}
async function showAllMessages(req, res) {
  try {
    const { journeyId } = req.params;

    // Validate journeyId
    if (!journeyId) {
      return res.status(400).json({ error: "Journey ID is required" });
    }

    // Fetch all stages that belong to the provided journeyId
    const allJourneyStages = await prisma.stage.findMany({
      where: {
        journeyId: parseInt(journeyId), // Ensure it's a valid integer
      },
    });

    // Check if stages exist for the journey
    if (allJourneyStages.length === 0) {
      return res
        .status(404)
        .json({ message: "No stages found for this journey" });
    }

    return res.json(allJourneyStages);
  } catch (error) {
    // Handle unexpected errors
    console.error(error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ error: "An error occurred while fetching stages" });
  }
}
async function modify(req, res, next) {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return next(
      new ValidationError("Check the input data", validation.array())
    );
  }

  const id = parseInt(req.params.id);
  const inputData = req.body;

  try {
    // Check if the stage exists
    const stage = await prisma.stage.findUnique({
      where: { id: id },
    });

    if (!stage) {
      return res.status(404).json({ error: "Stage not found" });
    }

    // Update the stage
    const updatedStage = await prisma.stage.update({
      where: { id: id },
      data: {
        title: inputData.title,
        description: inputData.description,
        date: inputData.date,
        lat: inputData.lat,
        lng: inputData.lng,
      },
    });

    return res.json(updatedStage);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the stage" });
  }
}
async function destroy(req, res) {
  const stageToDelete = req.params;
  console.log(stageToDelete);
  try {
    const deleteStage = await prisma.stage.delete({
      where: {
        id: parseInt(stageToDelete.id),
      },
    });

    return res.json(deleteStage);
  } catch (error) {
    res.status(404).send("Stage not found");
  }
}

export default {
  send,
  show,
  showAllMessages,
  modify,
  destroy,
};
