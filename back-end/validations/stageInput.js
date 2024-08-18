/**
 * @type {import("express-validator").Schema}
 */
export const title = {
  in: ["body"],
  notEmpty: {
    options: {
      ignore_whitespace: true,
    },
    errorMessage: "Title is required",
  },
  isLength: {
    options: {
      min: 1,
    },
    errorMessage: "Title has to contain at least 1 character",
  },
};

export const date = {
  in: ["body"],
  notEmpty: {
    options: {
      ignore_whitespace: true,
    },
    errorMessage: "Date is required",
  },
  isISO8601: {
    errorMessage: "Date must be in a valid ISO 8601 format",
  },
  custom: {
    options: (value) => {
      const now = new Date();
      const date = new Date(value);

      // Check if the date is in the past
      if (date < now) {
        throw new Error("Date must be in the future and cannot be in the past");
      }

      // Additional validation can be added here if needed
      // For example, checking that the date is not too far in the future
      // if (date > someMaxFutureDate) {
      //   throw new Error("Date is too far in the future");
      // }

      return true;
    },
  },
};
export const lat = {
  in: ["body"],
  isFloat: {
    options: {
      min: -90,
      max: 90,
    },
    errorMessage: "Latitude must be a number between -90 and 90",
  },
  toFloat: true, // Convert the value to a float
};

export const lng = {
  in: ["body"],
  isFloat: {
    options: {
      min: -180,
      max: 180,
    },
    errorMessage: "Longitude must be a number between -180 and 180",
  },
  toFloat: true, // Convert the value to a float
};
