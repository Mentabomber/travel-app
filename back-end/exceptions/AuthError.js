class AuthError extends Error {
  constructor(message) {
    super(message);
    this.status = "401";
  }
}

export default AuthError;
