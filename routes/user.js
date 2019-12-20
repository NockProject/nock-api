const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/populate/:id', userCtrl.getUserWithPosts);
router.get('/populate_comment/:id', userCtrl.getUserWithComments);
router.delete('/:id',auth, userCtrl.deleteUser);
router.get('/:id',auth, userCtrl.getOneUser);
router.get('/', auth,userCtrl.getAllUsers);
router.put('/:id', auth, userCtrl.updateUser);

module.exports = router;
