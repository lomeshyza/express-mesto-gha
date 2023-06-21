class AuthError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Unauthorized';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
