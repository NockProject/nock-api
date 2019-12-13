const  express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.put('/:id', stuffCtrl.updateThing);
router.get('/:id', stuffCtrl.getOneThing);
router.get('/', stuffCtrl.getAllThings);

module.exports = router;

