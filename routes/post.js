const  express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/type/:type', auth, postCtrl.getAllPostsByType);
router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth,postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id', auth, postCtrl.updatePost);

module.exports = router;
