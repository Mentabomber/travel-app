import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
export const registerValidationSchema = {
  name: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Name is required",
    },
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  surname: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "Surname is required",
    },
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: "Surname must be at least 3 characters long",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email given is not valid",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
    custom: {
      // "value" is the value of the email. It is automatically passed by express-validator.
      options: async (value) => {
        // I check if there is a user in the database with the same email.
        const alreadyExists = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });

        // If alreadyExists has a value, it means the email already exists.
        if (alreadyExists) {
          return Promise.reject("Email given is already in use");
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    errorMessage:
      "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, a number, and a special character.",
  },
};

// const validateRegister = checkSchema(registerValidationSchema);

export default registerValidationSchema;
