const { forbidden } = require('../utils/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbidden;
  }
}
module.exports = ForbiddenError;
