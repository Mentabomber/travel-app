/**
 * @type {import("express-validator").Schema}
 */
export const email = {
  in: ["body"],
  isEmail: {
    errorMessage: "The entered email is not valid",
  },
  notEmpty: {
    options: {
      ignore_whitespace: true,
    },
    errorMessage: "Email is required",
  },
};
export const password = {
  in: ["body"],
  notEmpty: {
    options: {
      ignore_whitespace: true,
    },
    errorMessage: "Password is required",
  },
};
