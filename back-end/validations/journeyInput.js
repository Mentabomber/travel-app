import { checkSchema } from "express-validator";

/**
 * @type {import("express-validator").Schema}
 */
export const journeyValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "The title is required",
    },
    isLength: {
      options: { min: 1 },
      errorMessage: "The title must be at least 1 character long",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "The description is required",
    },
    isLength: {
      options: { min: 1, max: 250 },
      errorMessage: "Description must be between 1 and 250 characters",
    },
  },
  image: {
    custom: {
      options: (value, { req }) => {
        // Check if an image is provided
        if (!req.file) {
          // If it's a PUT request, allow it to proceed without an image
          if (req.method === "PUT") {
            return true;
          }
          // For other methods, image is required
          throw new Error("The image is required");
        }

        // Check the file type
        const supportedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!supportedTypes.includes(req.file.mimetype)) {
          throw new Error("Unsupported image format");
        }

        // Check the file size (5 MB max)
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (req.file.size > maxSizeInBytes) {
          throw new Error("The image must be less than 5 MB");
        }

        // If all checks pass, return true
        return true;
      },
    },
    optional: { options: { nullable: true } }, // Makes the image optional
  },
  published: {
    isBoolean: {
      errorMessage: "Published must be a boolean",
    },
    optional: { options: { nullable: true } }, // Published is optional
  },
};

const validateJourney = checkSchema(journeyValidationSchema);
export default validateJourney;
