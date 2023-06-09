const Card = require('../models/card');
const {
  badRequest,
  notFound,
  internalServerError,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(internalServerError).send({
      message: 'Internal Server Error',
    }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(notFound).send({
          message: 'Card not found',
        });
      } else {
        res.send({ message: 'Card deleted' });
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

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message.includes('card validation failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(notFound).send({ message: 'Card not found' });
      } else {
        res.send({ message: 'Like added' });
      }
    })
    .catch((err) => {
      if (err.message.includes('ObjectId failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res.status(internalServerError).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .then((card) => {
    if (!card) {
      res.status(notFound).send({ message: 'Card not found' });
    } else {
      res.send({ message: 'Like deleted' });
    }
  })
  .catch((err) => {
    if (err.message.includes('ObjectId failed')) {
      res.status(badRequest).send({ message: 'Bad request' });
    } else {
      res.status(internalServerError).send({
        message: 'Internal Server Error',
      });
    }
  });
module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
