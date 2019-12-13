const  express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.post('/',postCtrl.createPost);
router.delete('/:id',postCtrl.deletePost);
router.put('/:id', postCtrl.updatePost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPosts);

module.exports = router;









