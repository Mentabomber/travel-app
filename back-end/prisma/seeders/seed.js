const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function main() {
  const hashedPswd = await bcrypt.hash("Password123!", 10);
  console.log(hashedPswd, "pswd");
  // creazione categorie di base

  const monfalconeStage = await prisma.stage.upsert({
    where: { title: "Monfalcone" },
    update: {},
    create: {
      title: "Monfalcone",
      description: "Viaggio verso Monfalcone dopo ci fermeremo a pranzo",
      date: new Date("2024-09-30T12:48:00.000Z"),
      lat: 45.8096479,
      lng: 13.5328548,
    },
  });
  const udineStage = await prisma.category.upsert({
    where: { title: "Udine" },
    update: {},
    create: {
      title: "Udine",
      description:
        "Immersione nel centro di Udine tra musei e parti della 'città vecchia'",
      date: new Date("2024-09-30T14:48:00.000Z"),
      lat: 46.0637,
      lng: 13.24458,
    },
  });
  const lignanoStage = await prisma.category.upsert({
    where: { title: "Lignano" },
    update: {},
    create: {
      title: "Lignano",
      description:
        "Fine del nostro viaggio verso Lignano dove ci godremo la spiaggia tra i pini",
      date: new Date("2024-09-31T14:48:00.000Z"),
      lat: 45.6759,
      lng: 13.11727,
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
      journey: {
        create: [
          {
            title: "Viaggio a Lignano Sabbiadoro",
            description:
              "Viaggio da Trieste a Lignano, con prima tappa a Monfalcone seconda Udine e ultima a Lignano",
            published: true,
            image: "lignano.jpg",
            stages: {
              create: [monfalconeStage, udineStage, lignanoStage],
            },
          },
        ],
      },
      role: "admin",
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
