const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

/**
 * GET /api/books?page=1&limit=5&search=&genre=&sort=
 */
exports.listBooks = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(100, parseInt(req.query.limit || '5'));
    const skip = (page - 1) * limit;
    const { search, genre, sort } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre) filter.genre = genre;

    // count + list
    const total = await Book.countDocuments(filter);
    let query = Book.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    if (sort === 'year_asc') query = query.sort({ year: 1 });
    else if (sort === 'year_desc') query = query.sort({ year: -1 });

    const books = await query.lean();
    res.json({ page, totalPages: Math.ceil(total / limit), total, books });
  } catch (err) { next(err); }
};

exports.getBookDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book id' });

    const book = await Book.findById(id).populate('addedBy', 'name email').lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // fetch reviews + average rating via aggregation
    const reviews = await Review.find({ bookId: id }).populate('userId', 'name').sort({ createdAt: -1 }).lean();

    let avgRating = null;
    if (reviews.length > 0) {
      avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length);
      avgRating = Math.round(avgRating * 10) / 10; // one decimal
    }

    res.json({ book, reviews, averageRating: avgRating, reviewCount: reviews.length });
  } catch (err) { next(err); }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, year } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and author required' });
    const book = await Book.create({ title, author, description, genre, year, addedBy: req.user._id });
    res.status(201).json(book);
  } catch (err) { next(err); }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    const allowed = ['title','author','description','genre','year'];
    allowed.forEach(f => { if (req.body[f] !== undefined) book[f] = req.body[f]; });
    await book.save();
    res.json(book);
  } catch (err) { next(err); }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.addedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden" });

    // Delete reviews
    await Review.deleteMany({ bookId: id });

    // Delete book
    await Book.findByIdAndDelete(id);

    res.json({ message: "Book deleted" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
