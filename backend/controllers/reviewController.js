const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { rating, reviewText } = req.body;
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: 'Invalid rating' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Upsert style: if user already reviewed, update instead of creating duplicate
    const existing = await Review.findOne({ bookId, userId: req.user._id });
    if (existing) {
      existing.rating = rating;
      existing.reviewText = reviewText;
      await existing.save();
      return res.json(existing);
    }

    const review = await Review.create({ bookId, userId: req.user._id, rating, reviewText });
    res.status(201).json(review);
  } catch (err) { next(err); }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params; // review id
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    const { rating, reviewText } = req.body;
    if (rating) review.rating = rating;
    if (reviewText !== undefined) review.reviewText = reviewText;
    await review.save();
    res.json(review);
  } catch (err) { next(err); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Forbidden' });

    await review.deleteOne(); // <-- updated
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};

