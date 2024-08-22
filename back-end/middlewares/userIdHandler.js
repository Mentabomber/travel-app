import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import WrongUser from "../exceptions/WrongUser.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 * @param {*} next
 */
export default async (req, res, next) => {
  const bearer = req.headers.authorization;

  const token = bearer.split(" ")[1];
  const user = verify(token, process.env.JWT_SECRET);
  const showInputData = req.params;

  const showJourney = await prisma.journey.findUnique({
    where: {
      id: parseInt(showInputData.id),
    },
    include: {
      stages: {
        select: {
          title: true,
          description: true,
          date: true,
        },
      },
      user: true,
    },
  });
  if (!showJourney) {
    throw new Error("Journey not found");
  }

  // Continue to the next middleware or route handler
  next();
};
