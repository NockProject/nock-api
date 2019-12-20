const  express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth,commentCtrl.getOneComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.updateComment);

module.exports = router;
