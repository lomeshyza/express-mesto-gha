class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.message = 'This email is already registered';
    this.statusCode = 409;
  }
}
module.exports = ConflictError;
