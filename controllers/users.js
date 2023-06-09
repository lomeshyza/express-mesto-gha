const User = require('../models/user');
const { badRequest, notFound, internalServerError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({
      message: 'Internal Server Error',
    }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.send(user);
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
        });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)

    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('user validation failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
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
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
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
    .then((user) => {
      if (!user) {
        res.status(notFound).send({
          message: 'User not found',
        });
      } else {
        res.send(user);
      }
    })
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateProfile,
};
