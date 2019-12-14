const  express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.post('/', auth, stuffCtrl.createThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.put('/:id', auth, stuffCtrl.updateThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;

