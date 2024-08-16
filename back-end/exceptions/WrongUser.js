class WrongUser extends Error {
  constructor(message, errors) {
    super(message);

    this.status = 403;
    this.errors = errors;
  }
}

export default WrongUser;
