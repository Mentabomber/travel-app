import AuthError from "../exceptions/AuthError";

/**
 * Middleware che controlla il ruolo dell'utente
 * @param {string[]} allowedRoles - Array di ruoli consentiti
 * @returns {function} Middleware
 */
export default function (allowedRoles) {
  return function (req, res, next) {
    // Check if the user's role is present among those allowed.
    if (!allowedRoles.includes(req.user.role)) {
      throw new AuthError("You don't have the permit to access this data");
    }

    next();
  };
}
