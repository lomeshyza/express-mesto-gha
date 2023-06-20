class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.message = 'This email is already registered';
    this.statusCode = 409;
  }
}
module.exports = ConflictError;
