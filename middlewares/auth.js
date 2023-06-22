const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new ForbiddenError('Authorization required'));
  }
  req.user = payload;

  next();
};
module.exports = auth;
