const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
      console.log(err.statusCode);
    });
};

const getCurrentUser = (req, res, next) => {
  console.log(req.user._id);
  console.log(req.params.id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error('Validation failed'));
      } else {
        next(err);
      }
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error('Validation failed'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(String(password), 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          next(err);
          console.log(`Эта ошибка: ${err}`);
          console.log(`Код ошибки: ${err.code}`);
        });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  console.log(req.body.name);
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then(
      (user) => {
        if (!user) {
          throw new Error('jwt must be provided');
        } else {
          bcrypt.compare(String(password), user.password)
            .then((isValidUser) => {
              if (isValidUser) {
                // создать jwt
                const jwt = jsonWebToken.sign({
                  _id: user._id,
                }, 'SECRET');
                // прикрепить jwt
                res.cookie('jwt', jwt, {
                  maxAge: 360000,
                  httpOnly: true,
                  sameSite: true,
                });
                res.send({ data: user.toJSON() });
              } else {
                res.status(403).send({ message: 'Password is incorrect' });
              }
            });
        }
      },
    )
    .catch((err) => {
      next(err);
      console.log(`Эта ошибка: ${err}`);
      console.log(`Код ошибки: ${err.code}`);
    });
};

/* const login = (req, res) => {
  User.findOne(
    /* req.user._id,
    { email: req.body.email },
    /* { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'Login or password is incorrect',
        });
      } else {
        bcrypt.compare(req.body.password, user.password);
      }
    })
    .then((matched) => {
      if (!matched) {
        res.status(notFound).send({
          message: 'Login or password is incorrect',
        });
      } else {
        res.send({ message: 'Password is correct' });
      }
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });

   .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad Request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
        });
      }
    });
};
*/

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
  login,
};
