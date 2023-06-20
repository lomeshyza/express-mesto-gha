const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/me/avatar', updateAvatar);

router.patch('/me', updateProfile);

// router.post('/signup', createUser);

module.exports = router;
