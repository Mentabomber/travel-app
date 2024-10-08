import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { matchedData } from "express-validator";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import AuthError from "../exceptions/AuthError.js";

async function register(req, res) {
  const sanitizedData = matchedData(req);
  // devo criptare la password in ingresso prima di salvarla nel db
  sanitizedData.password = await hash(sanitizedData.password, 10);

  // salvataggio nel db
  const user = await prisma.user.create({
    data: {
      ...sanitizedData,
    },
    select: {
      id: true,
      email: true,
      name: true,
      surname: true,
    },
  });

  // genero il token JWT
  const token = sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  delete user.password;

  res.json({ user, token });
}

async function login(req, res, next) {
  // Recuperare i dati inseriti dall'utente
  const { email, password } = req.body;

  // controllare che ci sia un utente con quella email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AuthError("Utente non trovato"));
  }

  // controllare che la password sia corretta
  const passMatch = await compare(password, user.password);

  if (!passMatch) {
    return next(new AuthError("Password errata"));
  }

  // generare il token JWT
  const token = sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // ritornare il token ed i dati dell'utente

  // rimuovo la password dall'oggetto user
  delete user.password;

  res.json({ user, token });
}

async function me(req, res, next) {
  // Recuperare i dati inseriti dall'utente
  const { email } = req.user;
  console.log(req.user, "user");

  // controllare che ci sia un utente con quella email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AuthError("Utente non trovato"));
  }

  // rimuovo la password dall'oggetto user
  delete user.password;

  res.json({ user });
}

async function logout(req, res) {
  res.json({ message: "Logout effettuato con successo" });
}
async function showEmails(req, res) {
  try {
    const data = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export default {
  register,
  login,
  me,
  logout,
  showEmails,
};
