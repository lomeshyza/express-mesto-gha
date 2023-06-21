class IncorrectDataError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Incorrect data';
    this.statusCode = 403;
  }
}
module.exports = IncorrectDataError;
