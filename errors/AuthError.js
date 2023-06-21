class AuthError extends Error {
  constructor(message) {
    console.log(message);
    super(message);
    this.message = 'Unauthorized';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
