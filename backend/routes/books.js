const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/bookController');

router.get('/', bookCtrl.listBooks); // public, paginated
router.post('/', auth, bookCtrl.createBook); // protected
router.get('/:id', bookCtrl.getBookDetails);
router.put('/:id', auth, bookCtrl.updateBook); // only creator
router.delete('/:id', auth, bookCtrl.deleteBook); // only creator

module.exports = router;
