import { validationResult, checkSchema, matchedData } from "express-validator";

function checkValidity(req, res, next) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(422).json(validation.array());
  }

  req.validatedData = matchedData(req);
  next();
}

/**
 * Metodo che ritorna un array di middleware per la validazione dello schema
 * @param {*} schema
 * @returns
 */
export default function (schema) {
  return [
    // middleware che controlla lo schema
    checkSchema(schema),
    // middleware che controlla se ci sono errori di validazione
    checkValidity,
  ];
}

const _checkValidity = checkValidity;
export { _checkValidity as checkValidity };
