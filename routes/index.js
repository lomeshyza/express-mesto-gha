const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { notFound } = require('../utils/errors');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(notFound).send({ message: 'Page not found' });
});

module.exports = router;
