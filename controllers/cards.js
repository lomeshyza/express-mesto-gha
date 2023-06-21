const Card = require('../models/card');

const statusCreated = 201;

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      console.log(`card.owner: ${card.owner}`);
      console.log(`req.user._id: ${req.user._id}`);
      console.log(`Эта ошибка card: ${card._id}`);
      if (!card) {
        throw new Error('Not found');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Error('Incorrect data');
      } else {
        console.log(`Эта ошибка card: ${card._id}`);
        return Card.findByIdAndRemove(card._id)
          .then(() => res.send({ message: 'Card deleted' }));
      }
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(statusCreated).send(card))
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error('Not found');
      } else {
        res.send({ message: 'Like added' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .then((card) => {
    if (!card) {
      throw new Error('Not found');
    } else {
      res.send({ message: 'Like deleted' });
    }
  })
  .catch((err) => {
    next(err);
  });

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
