const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const regex = /^(https?:\/\/)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;
router.get('/', getCards);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCardById,
);

router.post(
  '/',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().pattern(regex),
      })
      .unknown(true),
  }),
  createCard,
);

router.put(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard,
);

router.delete(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
