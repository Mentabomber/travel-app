import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import ValidationError from "../exceptions/ValidationError.js";
import { validationResult } from "express-validator";
import { unlinkSync } from "fs";

async function store(req, res, next) {
  const validation = validationResult(req);
  const image = req.file; // Data of the uploaded image
  console.log(req, "req");

  // isEmpty is refering to the array of the validation errors
  // If its not empty, it means there are errors
  if (!validation.isEmpty()) {
    return next(
      new ValidationError("Controllare i dati inseriti", validation.array())
    );
  }
  let datiInIngresso = req.validatedData;
  console.log(datiInIngresso, "dati ingresso");
  if (datiInIngresso.published === "true") {
    datiInIngresso.published = true;
  } else {
    datiInIngresso.published = false;
  }
  const user = req.user;
  const query = {
    title: datiInIngresso.title,
    description: datiInIngresso.description,
    published: datiInIngresso.published,
    duration: datiInIngresso.duration,
    image: image.path.replace(/^storage\\/, ""),
  };

  if (datiInIngresso.stages) {
    query.stages = {
      connect: datiInIngresso.stages.split(",").map((idStage) => ({
        id: +idStage,
      })),
    };
  }

  if (user) {
    query.user = {
      connect: {
        id: parseInt(user.id),
      },
    };
  }

  const newJourney = await prisma.journey.create({
    data: query,
    include: {
      stages: true,
      user: true,
    },
  });

  return res.json(newJourney);
}

async function show(req, res) {
  const showInputData = req.params;
  try {
    const showJourney = await prisma.journey.findUnique({
      where: {
        id: parseInt(showInputData.id),
      },
      include: {
        stages: {
          select: {
            id: true,
            title: true,
            description: true,
            date: true,
            lat: true,
            lng: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            surname: true,
          },
        },
      },
    });
    return res.json(showJourney);
  } catch (error) {
    console.log(error);
  }
}

async function index(req, res) {
  try {
    const filters = req.query.filter;
    const page = req.query.page || 1;
    const perPage = 20;

    const queryFilter = {};

    if (filters && filters.includes("title eq")) {
      const titleFilter = filters.split("title eq ")[1];
      queryFilter.title = {
        contains: titleFilter,
      };
    }

    if (filters && filters.includes("description eq")) {
      const descriptionFilter = filters.split("description eq ")[1];
      queryFilter.description = {
        contains: descriptionFilter,
      };
    }

    if (filters && filters.includes("published eq")) {
      const publishedFilter = filters.split("published eq ")[1];
      queryFilter.published = {
        equals: publishedFilter === "true" || publishedFilter === "1",
      };
    }
    //filter for journey's search with userId
    const userId = req.query.userId;
    if (userId) {
      queryFilter.userId = {
        equals: parseInt(userId),
      };
    }
    console.log(userId, "userId", req.query.userId, "req-id");
    const total = await prisma.journey.count({ where: queryFilter });

    const data = await prisma.journey.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      where: queryFilter,
      include: {
        stage: {
          select: {
            id: true,
            type: true,
            description: true,
            date: true,
            lat: true,
            lng: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            surname: true,
          },
        },
      },
    });

    res.json({ data, page, perPage, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function update(req, res) {
  const validation = validationResult(req);
  // isEmpty is refering to the array of the validation errors
  // If its not empty, it means there are errors
  if (!validation.isEmpty()) {
    return next(
      new ValidationError("Controllare i dati inseriti", validation.array())
    );
  }
  const id = req.params.id;

  let datiInIngresso = req.validatedData;
  console.log(datiInIngresso, "dati ingresso");
  if (datiInIngresso.published === "true") {
    datiInIngresso.published = true;
  } else {
    datiInIngresso.published = false;
  }
  if (req.file) {
    let image = req.file;
    console.log(image, "image");
    try {
      const stagesList = await prisma.stage.findMany();

      datiInIngresso.image = image.filename;
      const journey = await prisma.journey.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!journey) {
        throw new Error("Not found");
      }
      // Get the IDs of categories to disconnect

      const stageIdsToDisconnect = stagesList
        .filter((stage) => !datiInIngresso.stages.includes(stage.id.toString()))
        .map((stage) => ({ id: stage.id }));

      const updateJourney = await prisma.journey.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: datiInIngresso.title,
          image: image.path.replace(/^storage\\/, ""),
          description: datiInIngresso.description,
          published: datiInIngresso.published,
          duration: datiInIngresso.duration,
          stages: {
            connect: datiInIngresso.stages.split(",").map((idStage) => ({
              id: parseInt(idStage),
            })),
            disconnect: stageIdsToDisconnect, // Disconnect stagess not found in datiInIngresso.stages
          },
        },
        include: {
          stages: true,
          user: true,
        },
      });

      if (journey.image) {
        unlinkSync("storage/" + journey.image);
        console.log("Previous image deleted:", journey.image);
      }
      return res.json(updateJourney);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  } else {
    const stagesList = await prisma.stage.findMany();

    const journey = await prisma.journey.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!journey) {
      throw new Error("Journey not found");
    }
    // Get the IDs of stages to disconnect
    const stageIdsToDisconnect = stagesList
      .filter((stage) => !datiInIngresso.stages.includes(stage.id.toString()))
      .map((stage) => ({ id: stage.id }));

    const updateJourney = await prisma.journey.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: datiInIngresso.title,
        description: datiInIngresso.description,
        published: datiInIngresso.published,
        duration: datiInIngresso.duration,
        stages: {
          connect: datiInIngresso.stages.split(",").map((idStage) => ({
            id: parseInt(idStage),
          })),
          disconnect: stageIdsToDisconnect, // Disconnect stages not found in datiInIngresso.stages
        },
      },
      include: {
        stages: true,
        user: true,
      },
    });
    return res.json(updateJourney);
  }
}

async function destroy(req, res) {
  const journeyToDelete = req.params;
  console.log(journeyToDelete);
  try {
    const deleteJourney = await prisma.journey.delete({
      where: {
        id: parseInt(journeyToDelete.id),
      },
      select: {
        image: true,
      },
    });
    if (deleteJourney.image) {
      unlinkSync("storage/" + deleteJourney.image);
      console.log("Image deleted:", deleteJourney.image);
    }
    return res.json(deleteJourney);
  } catch (error) {
    res.status(404).send("not found");
  }
}

export default {
  store,
  show,
  index,
  update,
  destroy,
};
