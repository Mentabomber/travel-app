import AuthError from "../exceptions/AuthError.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 * @param {*} next
 */
export default (req, res, next) => {
  // leggere il Bearer Token dal header della richiesta
  // Stringa che inizia con Bearer seguita da uno spazio e poi il token
  const bearer = req.headers.authorization;
  // controllo il bearer
  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new AuthError("Bearer token mancante o malformato");
  }

  // estraggo il token
  const token = bearer.split(" ")[1];

  const user = verify(token, process.env.JWT_ACCESS_SECRET);

  // passare i dati dell'utente alla req in modo che possiamo accedervi nei controller
  req["user"] = user;

  next();
};
