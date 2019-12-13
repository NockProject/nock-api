const  express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/type/:type', postCtrl.getAllPostsByType);
router.post('/',postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.delete('/:id',postCtrl.deletePost);
router.put('/:id', postCtrl.updatePost);

module.exports = router;









