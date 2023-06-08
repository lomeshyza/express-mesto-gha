const router = require('express').Router();
const { getCards, deleteCardById, createCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:id', deleteCardById);

router.post('/', createCard);

router.put('/:id/likes', likeCard);

router.delete('/:id/likes', dislikeCard);

module.exports = router;
