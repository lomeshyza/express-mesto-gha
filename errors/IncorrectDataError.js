class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Incorrect data';
    this.statusCode = 403;
  }
}
module.exports = IncorrectDataError;
