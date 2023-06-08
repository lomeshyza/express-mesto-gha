const User = require('../models/user');
const { badRequest, notFound, internalServerError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Validation failed'))
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('ObjectId failed')) {
        res.status(badRequest).send({
          message: 'Bad request',
        });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)

    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('user validation failed')) {
        res.status(badRequest).send({ message: `${err.message}` });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};
const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Validation failed'))
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad Request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Validation failed'))
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad Request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
};
