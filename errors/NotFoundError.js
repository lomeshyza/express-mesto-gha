class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Not found';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
