// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import api from '../api/axios';
// import { Link } from 'react-router-dom';

// export default function Profile(){
//   const { user } = useContext(AuthContext);
//   const [books, setBooks] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   useEffect(()=>{
//     if (!user) return;
//     const load = async () => {
//       const bRes = await api.get(`/books?page=1&limit=100&addedBy=${user.id}`);
//       // backend doesn't accept addedBy; quick alternative: filter client-side
//       const all = await api.get('/books?page=1&limit=100');
//       setBooks(all.data.books.filter(b => b.addedBy === user.id || b.addedBy?._id === user.id));
//       const r = await api.get('/reviews/mine').catch(()=>({data:[]})); // optional endpoint
//       setReviews(r.data || []);
//     };
//     load();
//   }, [user]);

//   return (
//     <div className="p-4">
//       <h2>{user?.name}'s Profile</h2>
//       <h3>Your books</h3>
//       <ul>{books.map(b => <li key={b._id}><Link to={`/books/${b._id}`}>{b.title}</Link></li>)}</ul>
//     </div>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import {
  User,
  BookOpen,
  MessageSquare,
  Star,
  Calendar,
  Eye,
  Edit,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        // Fetch all books and filter client-side by user
        const all = await api.get("/books?page=1&limit=100");
        setBooks(
          all.data.books.filter(
            (b) => b.addedBy === user.id || b.addedBy?._id === user.id
          )
        );

        // Fetch reviews (optional endpoint)
      
      } catch (err) {
        console.error("Profile load failed:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User size={48} className="text-emerald-600" />
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
                  <p className="text-emerald-100">{user?.email}</p>
                  <div className="flex items-center gap-6 mt-4">
                    <div>
                      <div className="text-2xl font-bold">{books.length}</div>
                      <div className="text-sm text-emerald-100">
                        Books Added
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{reviews.length}</div>
                      <div className="text-sm text-emerald-100">
                        Reviews Written
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white font-semibold">
                <Edit size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Your Books Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <BookOpen size={28} className="text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Books</h2>
              <span className="ml-auto text-sm text-gray-500">
                {books.length} total
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen
                size={64}
                className="mx-auto text-gray-300 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No books yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your library by adding your first book
              </p>
              <Link
                to="/books/add"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
              >
                Add Your First Book
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {books.map((b) => (
                <Link
                  to={`/books/${b._id}`}
                  key={b._id}
                  className="p-5 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {b.genre && (
                      <span className="text-emerald-600 font-medium">
                        {b.genre}
                      </span>
                    )}
                    {b.year && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{b.year}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Your Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <MessageSquare size={28} className="text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Reviews</h2>
              <span className="ml-auto text-sm text-gray-500">
                {reviews.length} total
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare
                size={64}
                className="mx-auto text-gray-300 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500">
                Share your thoughts on books you've read
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reviews.map((rv) => (
                <div
                  key={rv._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {rv.bookTitle}
                      </h3>
                      <div className="flex items-center gap-2">
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
                        </div>
                        <span className="text-sm text-gray-600">
                          {rv.rating}/5
                        </span>
                      </div>
                    </div>
                    {rv.createdAt && (
                      <span className="text-sm text-gray-500">
                        {new Date(rv.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {rv.reviewText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
