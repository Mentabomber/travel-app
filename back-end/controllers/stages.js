import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function store(req, res) {
  const inputData = req.body;

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

async function showAllJourneyStages(req, res) {
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
async function update(req, res) {
  const validation = validationResult(req);
  // isEmpty si riferisce all'array degli errori di validazione.
  // Se NON è vuoto, vuol dire che ci sono errori
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
      const categoriesList = await prisma.category.findMany();

      datiInIngresso.image = image.filename;
      const photo = await prisma.photo.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!photo) {
        throw new Error("Not found");
      }
      // Get the IDs of categories to disconnect

      const categoryIdsToDisconnect = categoriesList
        .filter((cat) => !datiInIngresso.categories.includes(cat.id.toString()))
        .map((cat) => ({ id: cat.id }));

      const updatePhoto = await prisma.photo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: datiInIngresso.title,
          image: image.path.replace(/^storage\\/, ""),
          description: datiInIngresso.description,
          published: datiInIngresso.published,
          categories: {
            connect: datiInIngresso.categories.split(",").map((idCategory) => ({
              id: parseInt(idCategory),
            })),
            disconnect: categoryIdsToDisconnect, // Disconnect categories not found in datiInIngresso.categories
          },
        },
        include: {
          categories: true,
          user: true,
        },
      });

      if (photo.image) {
        fs.unlinkSync("storage/" + photo.image);
        console.log("Immagine precedente eliminata:", photo.image);
      }
      return res.json(updatePhoto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  } else {
    const categoriesList = await prisma.category.findMany();

    const photo = await prisma.photo.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!photo) {
      throw new Error("Not found");
    }
    // Get the IDs of categories to disconnect
    const categoryIdsToDisconnect = categoriesList
      .filter((cat) => !datiInIngresso.categories.includes(cat.id.toString()))
      .map((cat) => ({ id: cat.id }));

    const updatePhoto = await prisma.photo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: datiInIngresso.title,
        description: datiInIngresso.description,
        published: datiInIngresso.published,
        categories: {
          connect: datiInIngresso.categories.split(",").map((idCategory) => ({
            id: parseInt(idCategory),
          })),
          disconnect: categoryIdsToDisconnect, // Disconnect categories not found in datiInIngresso.categories
        },
      },
      include: {
        categories: true,
        user: true,
      },
    });
    return res.json(updatePhoto);
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
  store,
  showAllJourneyStages,
  destroy,
};
