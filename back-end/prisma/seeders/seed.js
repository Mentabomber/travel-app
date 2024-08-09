const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function main() {
  const hashedPswd = await bcrypt.hash("Password123!", 10);
  console.log(hashedPswd, "pswd");

  // Creation of a journey first
  const journey = await prisma.journey.create({
    data: {
      title: "Viaggio a Lignano Sabbiadoro",
      description:
        "Viaggio da Trieste a Lignano, con prima tappa a Monfalcone seconda Udine e ultima a Lignano",
      published: true,
      image: "lignano.jpg",
      duration: 2,
    },
  });
  const firstStage = await prisma.stage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Monfalcone",
      description: "Viaggio verso Monfalcone dopo ci fermeremo a pranzo",
      date: new Date("2024-09-29T12:48:00.000Z"),
      lat: 45.8096479,
      lng: 13.5328548,
      journeyId: journey.id,
    },
  });
  const secondStage = await prisma.stage.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Udine",
      description:
        "Immersione nel centro di Udine tra musei e parti della 'città vecchia'",
      date: new Date("2024-09-29T14:48:00.000Z"),
      lat: 46.0637,
      lng: 13.24458,
      journeyId: journey.id,
    },
  });
  const thirdStage = await prisma.stage.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Lignano",
      description:
        "Fine del nostro viaggio verso Lignano dove ci godremo la spiaggia tra i pini",
      date: new Date("2024-09-30T14:48:00.000Z"),
      lat: 45.6759,
      lng: 13.11727,
      journeyId: journey.id,
    },
  });

  // admin user creation
  const admin = await prisma.user.upsert({
    where: { email: "simcictilen@gmail.com" },
    update: {},
    create: {
      email: "simcictilen@gmail.com",
      name: "Tilen",
      surname: "Simcic",
      journeis: {
        create: {
          journey: {
            connect: { id: journey.id },
          },
          assignedAt: new Date(),
          assignedBy: "admin",
        },
      },
      isAdmin: true,
      password: hashedPswd,
    },
  });
  const token = jsonwebtoken.sign(admin, process.env.JWT_SECRET, {
    expiresIn: "1000h",
  });
  console.log({ admin, token });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
