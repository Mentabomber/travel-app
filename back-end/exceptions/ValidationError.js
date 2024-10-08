class ValidationError extends Error {
  constructor(message, errors) {
    super(message);

    this.status = 400;
    this.errors = errors;
  }
}

export default ValidationError;
