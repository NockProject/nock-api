const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);
router.get('/:id',userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', userCtrl.updateUser);

module.exports = router;
