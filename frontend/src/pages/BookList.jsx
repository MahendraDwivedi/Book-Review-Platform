// // // src/pages/BookList.jsx
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import api from "../api/axios";
// // import {
// //   BookOpen,
// //   User,
// //   ChevronLeft,
// //   ChevronRight,
// //   Library,
// //   Eye,
// // } from "lucide-react";

// // function BookList() {
// //   const [books, setBooks] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchBooks = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await api.get(`/books?page=${page}`);
// //         setBooks(res.data.books || []);
// //         setTotalPages(res.data.totalPages || 1);
// //       } catch (err) {
// //         console.error("Error fetching books:", err.response?.data || err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBooks();
// //   }, [page]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex items-center gap-3 mb-2">
// //             <Library size={32} className="text-violet-600" />
// //             <h1 className="text-4xl font-bold text-gray-900">Book Library</h1>
// //           </div>
// //           <p className="text-gray-600 ml-11">
// //             Discover and explore our collection
// //           </p>
// //         </div>

// //         {/* Books Grid */}
// //         {loading ? (
// //           <p className="text-center text-gray-600">Loading books...</p>
// //         ) : books.length === 0 ? (
// //           <div className="bg-white rounded-xl shadow-md p-12 text-center">
// //             <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
// //             <h3 className="text-xl font-semibold text-gray-600 mb-2">
// //               No books found
// //             </h3>
// //             <p className="text-gray-500">Start adding books to your library</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //             {books.map((book) => (
// //               <div
// //                 key={book._id}
// //                 className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
// //               >
// //                 <div className="p-6">
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className="p-3 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg">
// //                       <BookOpen size={24} className="text-white" />
// //                     </div>
// //                     <Link
// //                       to={`/books/${book._id}`}
// //                       className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
// //                     >
// //                       <Eye size={20} />
// //                     </Link>
// //                   </div>

// //                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
// //                     {book.title}
// //                   </h3>

// //                   <div className="flex items-center gap-2 text-gray-600">
// //                     <User size={16} />
// //                     <span className="text-sm">{book.author}</span>
// //                   </div>
// //                 </div>

// //                 <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Pagination */}
// //         {books.length > 0 && (
// //           <div className="bg-white rounded-xl shadow-md p-6">
// //             <div className="flex items-center justify-between">
// //               <button
// //                 disabled={page === 1}
// //                 onClick={() => setPage(page - 1)}
// //                 className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
// //               >
// //                 <ChevronLeft size={20} />
// //                 Previous
// //               </button>

// //               <div className="flex items-center gap-4">
// //                 <span className="text-gray-600">
// //                   Page <span className="font-bold text-gray-900">{page}</span> of{" "}
// //                   <span className="font-bold text-gray-900">{totalPages}</span>
// //                 </span>

// //                 {/* Page Numbers */}
// //                 <div className="hidden sm:flex gap-2">
// //                   {[...Array(totalPages)].map((_, i) => {
// //                     const pageNum = i + 1;
// //                     return (
// //                       <button
// //                         key={pageNum}
// //                         onClick={() => setPage(pageNum)}
// //                         className={`w-10 h-10 rounded-lg font-semibold transition-all ${
// //                           page === pageNum
// //                             ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
// //                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                         }`}
// //                       >
// //                         {pageNum}
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               <button
// //                 disabled={page === totalPages}
// //                 onClick={() => setPage(page + 1)}
// //                 className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
// //               >
// //                 Next
// //                 <ChevronRight size={20} />
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default BookList;


// // src/pages/BookList.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import {
//   BookOpen,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   Library,
//   Eye,
// } from "lucide-react";

// function BookList() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [genreFilter, setGenreFilter] = useState("");
//   const [sortBy, setSortBy] = useState(""); // 'year' or 'rating'

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/books?page=${page}&limit=100`); // fetch all for client filtering
//         setBooks(res.data.books || []);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching books:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [page]);

//   // Apply search, filter, sort
//   useEffect(() => {
//     let temp = [...books];

//     if (search) {
//       temp = temp.filter(
//         (b) =>
//           b.title.toLowerCase().includes(search.toLowerCase()) ||
//           b.author.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (genreFilter) {
//       temp = temp.filter((b) => b.genre === genreFilter);
//     }

//     if (sortBy === "year") {
//       temp.sort((a, b) => b.year - a.year);
//     } else if (sortBy === "rating") {
//       temp.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
//     }

//     setFilteredBooks(temp);
//   }, [books, search, genreFilter, sortBy]);

//   const genres = Array.from(new Set(books.map((b) => b.genre).filter(Boolean)));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <Library size={32} className="text-violet-600" />
//             <h1 className="text-4xl font-bold text-gray-900">Book Library</h1>
//           </div>
//           <p className="text-gray-600 ml-11">
//             Discover and explore our collection
//           </p>
//         </div>

//         {/* Search & Filter */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by title or author..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
//           />
//           <select
//             value={genreFilter}
//             onChange={(e) => setGenreFilter(e.target.value)}
//             className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
//           >
//             <option value="">All Genres</option>
//             {genres.map((g) => (
//               <option key={g} value={g}>
//                 {g}
//               </option>
//             ))}
//           </select>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
//           >
//             <option value="">Sort By</option>
//             <option value="year">Published Year</option>
//             <option value="rating">Average Rating</option>
//           </select>
//         </div>

//         {/* Books Grid */}
//         {loading ? (
//           <p className="text-center text-gray-600">Loading books...</p>
//         ) : filteredBooks.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-600 mb-2">
//               No books found
//             </h3>
//             <p className="text-gray-500">Try changing your search or filter</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {filteredBooks.map((book) => (
//               <div
//                 key={book._id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="p-3 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg">
//                       <BookOpen size={24} className="text-white" />
//                     </div>
//                     <Link
//                       to={`/books/${book._id}`}
//                       className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
//                     >
//                       <Eye size={20} />
//                     </Link>
//                   </div>

//                   <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
//                     {book.title}
//                   </h3>

//                   <div className="flex items-center gap-2 text-gray-600">
//                     <User size={16} />
//                     <span className="text-sm">{book.author}</span>
//                   </div>
//                   {book.year && (
//                     <p className="text-sm text-gray-500 mt-1">Year: {book.year}</p>
//                   )}
//                   {book.averageRating != null && (
//                     <p className="text-sm text-gray-500">
//                       ⭐ Rating: {book.averageRating.toFixed(1)}
//                     </p>
//                   )}
//                 </div>

//                 <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredBooks.length > 0 && (
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
//               >
//                 <ChevronLeft size={20} />
//                 Previous
//               </button>

//               <div className="flex items-center gap-4">
//                 <span className="text-gray-600">
//                   Page <span className="font-bold text-gray-900">{page}</span> of{" "}
//                   <span className="font-bold text-gray-900">{totalPages}</span>
//                 </span>

//                 <div className="hidden sm:flex gap-2">
//                   {[...Array(totalPages)].map((_, i) => {
//                     const pageNum = i + 1;
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setPage(pageNum)}
//                         className={`w-10 h-10 rounded-lg font-semibold transition-all ${
//                           page === pageNum
//                             ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
//               >
//                 Next
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BookList;




// src/pages/BookList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight,
  Library,
  Eye,
} from "lucide-react";

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortBy, setSortBy] = useState(""); // 'year' or 'rating'

  const BOOKS_PER_PAGE = 5; // default pagination

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // fetch all books once, client-side pagination
        const res = await api.get("/books?limit=1000");
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Apply search, filter, sort
  const filteredBooks = books
    .filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter((b) => (genreFilter ? b.genre === genreFilter : true))
    .sort((a, b) => {
      if (sortBy === "year") return (b.year || 0) - (a.year || 0);
      if (sortBy === "rating") return (b.averageRating || 0) - (a.averageRating || 0);
      return 0;
    });

  // Calculate total pages
  const totalPageCount = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);

  // Paginate books
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * BOOKS_PER_PAGE,
    page * BOOKS_PER_PAGE
  );

  const genres = Array.from(new Set(books.map((b) => b.genre).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Library size={32} className="text-violet-600" />
            <h1 className="text-4xl font-bold text-gray-900">Book Library</h1>
          </div>
          <p className="text-gray-600 ml-11">
            Discover and explore our collection
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
          />
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Sort By</option>
            <option value="year">Published Year</option>
            <option value="rating">Average Rating</option>
          </select>
        </div>

        {/* Books Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading books...</p>
        ) : paginatedBooks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">Try changing your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <Link
                      to={`/books/${book._id}`}
                      className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} />
                    <span className="text-sm">{book.author}</span>
                  </div>
                  {book.year && (
                    <p className="text-sm text-gray-500 mt-1">Year: {book.year}</p>
                  )}
                  {book.averageRating != null && (
                    <p className="text-sm text-gray-500">
                      ⭐ Rating: {book.averageRating.toFixed(1)}
                    </p>
                  )}
                </div>

                <div className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedBooks.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Page <span className="font-bold text-gray-900">{page}</span> of{" "}
                  <span className="font-bold text-gray-900">{totalPageCount}</span>
                </span>
              </div>

              <button
                disabled={page === totalPageCount}
                onClick={() => setPage(page + 1)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-semibold hover:from-violet-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;
