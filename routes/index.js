const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { notFound } = require('../utils/errors');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res) => {
  res.status(notFound).send({ message: 'Page not found' });
});

module.exports = router;
