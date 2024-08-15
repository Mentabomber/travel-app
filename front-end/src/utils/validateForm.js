import { useState } from "react";

export function validateForm(content) {
  const [validationErrors, setValidationErrors] = useState("");
  let isValid = true;
  const newValidationErrors = {};
  if (content === "journey") {
    // Title Validation
    if (!formData.title) {
      newValidationErrors.title = "Title is required";
      isValid = false;
    }
    // Description Validation
    if (!formData.description) {
      newValidationErrors.description = "Description is required";
      isValid = false;
    }
    // Image Validation
    if (!formData.image) {
      newValidationErrors.image = "Image is required";
      isValid = false;
    }

    // Stage Validation
    if (formData.stages.length === 0) {
      newValidationErrors.stage = "At least 2 stages must be added.";
      isValid = false;
    }
  }
  // Title Validation
  if (!formData.title) {
    newValidationErrors.title = "Title is required";
    isValid = false;
  }
  // Description Validation
  if (!formData.description) {
    newValidationErrors.description = "Description is required";
    isValid = false;
  }

  setValidationErrors(newValidationErrors);
  return isValid;
}
