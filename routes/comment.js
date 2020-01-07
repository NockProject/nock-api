const  express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const safeDelComm = require('../middleware/safeDelComment');


router.get('/', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth,commentCtrl.getOneComment);
router.delete('/:id', auth, safeDelComm);
router.put('/:id', auth, commentCtrl.updateComment);

module.exports = router;
