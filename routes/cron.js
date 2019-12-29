const  express = require('express');
const router = express.Router();

const cronCtrl = require('../controllers/cron');
const auth = require('../middleware/auth');

router.get('/posts', auth, cronCtrl.moderatePost);
router.get('/posts/:query', auth, cronCtrl.postsQuery);

module.exports = router;
