class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Password is incorrect';
    this.statusCode = 403;
  }
}
module.exports = IncorrectDataError;
