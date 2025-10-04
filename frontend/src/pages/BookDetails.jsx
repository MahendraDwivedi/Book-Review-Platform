import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  BookOpen,
  User,
  Calendar,
  Tag,
  Star,
  Loader2,
  Trash,
  Edit,
  MessageSquare,
} from "lucide-react";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/books/${id}`);
      
      setBook(res.data.book);
      setReviews(res.data.reviews);
      setAvg(res.data.averageRating);
    } catch (err) {
      console.error("Failed to load book:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {    
    load();
    console.log(reviews);
    
    
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return nav("/login");
    try {
      await api.post(`/reviews/${id}`, { rating, reviewText: text });
      setText("");
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  const deleteBook = async () => {
    if (!user || user.id !== book.addedBy._id)
      return alert("Only creator can delete.");
    if (!confirm("Delete book?")) return;
    try {
      await api.delete(`/books/${id}`);
      nav("/");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : !book ? (
          <p className="text-center text-gray-600">Book not found</p>
        ) : (
          <>
            {/* Book Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-7 h-7 text-indigo-600" />
                    {book.title}
                  </h1>
                  <p className="text-lg text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" /> {book.author}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    {book.genre && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4 text-indigo-500" /> {book.genre}
                      </span>
                    )}
                    {book.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-indigo-500" />{" "}
                        {book.year}
                      </span>
                    )}
                  </div>
                  {book.description && (
                    <p className="mt-4 text-gray-700 leading-relaxed">
                      {book.description}
                    </p>
                  )}
                  <p className="mt-4 font-medium text-indigo-700">
                    ⭐ Average rating: {avg ?? "No ratings yet"}
                  </p>
                </div>

                {user && user.id === book.addedBy._id && (
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-book/${book._id}`}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
                    >
                      <Edit size={16} /> Edit
                    </Link>
                    <button
                      onClick={deleteBook}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((rv) => (
                    <div
                      key={rv._id}
                      className="border-b border-gray-200 pb-4 last:border-none"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">
                          {rv.userId?.name || "User"}
                        </p>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < rv.rating ? "fill-amber-500" : "fill-gray-200"
                              }
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {rv.rating}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-1">{rv.reviewText}</p>
                      {user && user.id === rv.userId?._id && (
                        <button
                          onClick={async () => {
                            if (confirm("Delete review?")) {
                                console.log(rv._id);
                                
                              await api.delete(`/reviews/review/${rv._id}`);
                              load();
                            }
                          }}
                          className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash size={14} /> Delete Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add / Update Your Review
              </h3>
              {user ? (
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Write your review..."
                      rows={4}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <p className="text-gray-500">
                  Please{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    log in
                  </Link>{" "}
                  to add a review.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
