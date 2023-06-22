const internalServerError = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = internalServerError, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === internalServerError
        ? 'Internal Server Error'
        : message,
    });
  next();
};

module.exports = errorHandler;
