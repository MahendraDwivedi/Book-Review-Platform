import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { BookOpen, Edit, Save } from "lucide-react";

export default function AddEditBook() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        if (res.data.book.addedBy._id !== user.id) {
          alert("You are not allowed to edit this book");
          navigate("/");
        } else {
          setForm(res.data.book);
        }
      } catch (err) {
        alert("Book not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    if (user) loadBook();
  }, [id, user, navigate]);

  if (!user) return <p className="text-center p-8">Please log in to edit a book.</p>;
  if (loading) return <p className="text-center p-8">Loading...</p>;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/books/${id}`, form);
      navigate(`/books/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Edit size={28} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
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
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Save size={18} /> {saving ? "Saving..." : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
