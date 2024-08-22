/**
 * @type {import("express-validator").Schema}
 */

export const loginValidationSchema = {
  email: {
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
  },
  password: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Password is required",
    },
  },
};

export default loginValidationSchema;
