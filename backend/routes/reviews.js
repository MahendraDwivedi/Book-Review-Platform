const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewCtrl = require('../controllers/reviewController');

router.post('/:bookId', auth, reviewCtrl.addReview); // add or update user's review for book
router.put('/review/:id', auth, reviewCtrl.updateReview); // edit review by id
router.delete('/review/:id', auth, reviewCtrl.deleteReview);

module.exports = router;
