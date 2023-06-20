class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'User not found';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
