const { notFound } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}

module.exports = NotFoundError;
