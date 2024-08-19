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
 * Method that returns an array of middleware for schema validation
 * @param {*} schema
 * @returns
 */
export default function (schema) {
  return [
    // Middleware that validates the schema
    checkSchema(schema),
    // "Middleware that checks for validation errors
    checkValidity,
  ];
}

const _checkValidity = checkValidity;
export { _checkValidity as checkValidity };
