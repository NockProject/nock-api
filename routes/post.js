const  express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const safeDelPost = require('../middleware/safeDelPost');


router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth,postCtrl.getOnePost);
router.delete('/:id', auth, safeDelPost, postCtrl.deletePost);
router.put('/:id', auth, postCtrl.updatePost);

router.get('/filter/type/:type', auth, postCtrl.getAllPostsByType);
router.get('/comments/:id', auth, postCtrl.getPostsWithComment);

module.exports = router;
