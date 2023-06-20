class ServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Internal Server Error';
    this.statusCode = 500;
  }
}

module.exports = ServerError;
