class BadRequestError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Bad request';
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
