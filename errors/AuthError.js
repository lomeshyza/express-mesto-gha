const { authError } = require('../utils/errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = authError;
  }
}

module.exports = AuthError;
