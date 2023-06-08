const Card = require('../models/card');
const { badRequest, notFound, internalServerError } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res
      .status(internalServerError)
      .send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then(() => {
      res.status(200).send({ message: 'Card deleted' });
    })
    .catch((err) => {
      if (err.message.includes('Not found')) {
        res.status(notFound).send({ message: 'Card not found' });
      } else {
        res
          .status(internalServerError)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
};

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res
          .status(internalServerError)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
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
    .orFail(() => new Error('Validation failed'))
    .then(() => res.status(200).send({ message: 'Like added' }))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(badRequest).send({ message: 'Bad request' });
      } else {
        res
          .status(internalServerError)
          .send({
            message: 'Internal Server Error',
            err: err.message,
            stack: err.stack,
          });
      }
    });
  console.log('Like card');
};

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .orFail(() => new Error('Validation failed'))
  .then(() => res.status(200).send({ message: 'Like deleted' }))
  .catch((err) => {
    if (err.message.includes('Validation failed')) {
      res.status(badRequest).send({ message: 'Bad request' });
    } else {
      res
        .status(internalServerError)
        .send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
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
