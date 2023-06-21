const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
    console.log(payload);
  } catch (err) {
    next(err);
    console.log(`Код ошибки: ${err}`);
  }
  req.user = payload;

  next();
};
module.exports = auth;
