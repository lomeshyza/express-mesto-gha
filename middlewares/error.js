const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');
const IncorrectDataError = require('../errors/IncorrectDataError');

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.message === 'Validation failed') {
    error = new BadRequestError(err);
  } else if (err.message === 'Not found') {
    error = new NotFoundError(err);
  } else if (err.code === 11000) {
    error = new ConflictError(err);
  } else if (err.message === 'jwt must be provided') {
    error = new AuthError(err);
  } else if (err.message === 'Incorrect data') {
    error = new IncorrectDataError(err);
  } else {
    error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });

  next();
};

module.exports = errorHandler;
