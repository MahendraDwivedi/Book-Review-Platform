// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios"; // ✅ your API instance
// import {
//   BookOpen,
//   User,
//   Tag,
//   Calendar,
//   FileText,
//   Loader2,
//   X,
// } from "lucide-react";

// export default function AddBook() {
//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     description: "",
//     genre: "",
//     year: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.title.trim() || !form.author.trim()) {
//       alert("Title and Author are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         title: form.title.trim(),
//         author: form.author.trim(),
//         description: form.description.trim(),
//         genre: form.genre.trim(),
//         year: form.year ? Number(form.year) : undefined,
//       };

//       const res = await api.post("/books", payload);

//       // ✅ navigate to newly created book page
//       navigate(`/books/${res.data._id}`);
//     } catch (err) {
//       console.error("Add book error:", err);
//       alert(err.response?.data?.message || "Failed to add book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
//             <BookOpen className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h2>
//           <p className="text-gray-600">
//             Share your favorite book with the community
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                 <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
//                 Book Title <span className="text-red-500 ml-1">*</span>
//               </label>
//               <input
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 placeholder="Enter book title"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
//                 required
//               />
//             </div>

//             {/* Author */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                 <User className="w-4 h-4 mr-2 text-indigo-600" />
//                 Author <span className="text-red-500 ml-1">*</span>
//               </label>
//               <input
//                 name="author"
//                 value={form.author}
//                 onChange={handleChange}
//                 placeholder="Enter author name"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
//                 required
//               />
//             </div>

//             {/* Genre + Year */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <Tag className="w-4 h-4 mr-2 text-indigo-600" />
//                   Genre
//                 </label>
//                 <input
//                   name="genre"
//                   value={form.genre}
//                   onChange={handleChange}
//                   placeholder="e.g., Fiction, Mystery"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                   <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
//                   Published Year
//                 </label>
//                 <input
//                   name="year"
//                   value={form.year}
//                   onChange={handleChange}
//                   type="number"
//                   placeholder="e.g., 2024"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
//                 <FileText className="w-4 h-4 mr-2 text-indigo-600" />
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Write a brief description of the book..."
//                 rows={5}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all shadow-lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <BookOpen className="w-5 h-5 mr-2" />
//                     Add Book
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center"
//               >
//                 <X className="w-5 h-5 mr-2" />
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           Fields marked with <span className="text-red-500">*</span> are required
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { BookOpen, Save } from "lucide-react";

export default function AddBook() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-center p-8">Please log in to add a book.</p>;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/books", form);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={28} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            placeholder="Book Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            required
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Saving..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
