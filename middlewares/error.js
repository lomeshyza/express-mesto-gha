// const { NotFoundError } = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
/*
class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Password is incorrect';
    this.statusCode = 403;
  }
}; */
/* class ServerError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Internal Server Errorrrrr';
    this.statusCode = 500;
  }
} */
const errorHandler = (err, req, res, next) => {
  let error;
  /*  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    }); */
  if (err.statusCode === 400) {
    console.log(err.statusCode);
    error = new BadRequestError(err);
  } else if (err.message === 'User not found') {
    error = new NotFoundError(err);
  } else if (err.code === 11000) {
    error = new ConflictError(err);
  } else {
    error = new ServerError(err);
  }
  res.status(error.statusCode).send({ message: error.message });

  next();
};

module.exports = errorHandler;
