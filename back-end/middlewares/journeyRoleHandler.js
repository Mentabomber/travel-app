import AuthError from "../exceptions/AuthError";

/**
 * Middleware that checks the type of user
 * @param {string[]} allowedRoles - Array of types of users allowed
 * @returns {function} Middleware
 */
export default function (allowedRoles) {
  return function (req, res, next) {
    // Check if the user's type is present among those allowed.
    if (!allowedRoles.includes(req.journeysOnUsers.userType)) {
      throw new AuthError("You don't have the permit to access this data");
    }

    next();
  };
}
