class BadRequestError extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.message = 'Bad request';
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
