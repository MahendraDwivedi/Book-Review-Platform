import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AddBook from './pages/AddBook';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<BookList/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/books/:id" element={<BookDetails/>} />
          <Route path="/books/add" element={<ProtectedRoute><AddBook/></ProtectedRoute>} />
          <Route path="/edit-book/:id" element={<ProtectedRoute><AddEditBook/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
