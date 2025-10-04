# 📚 Book Review Platform

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to **sign up, log in, add books, and review books**. Includes pagination, user profiles, and review management.

---

## 🏗️ Features

- User Authentication (Sign Up, Login) with **JWT**
- Add, Edit, Delete Books (only creator can modify)
- View all books with **pagination** (5 books per page)
- Add, Edit, Delete Reviews (users can only modify their own)
- Display average rating per book
- Profile page with user's added books and reviews
- Responsive design using **Tailwind CSS**
- Optional features: Search, Filter by genre, Sort by published year or rating

---

## 🖥️ Frontend

- React + React Router
- Context API for authentication
- Axios for API requests
- Tailwind CSS for styling

### Pages

1. **Signup** – `/signup`
2. **Login** – `/login`
3. **Book List (Home)** – `/`
4. **Book Details** – `/books/:id`
5. **Add/Edit Book** – `/books/add` or `/edit-book/:id`
6. **Profile** – `/profile`

---

## ⚙️ Backend

- Node.js + Express
- MongoDB Atlas
- Mongoose schemas: User, Book, Review
- Authentication middleware using JWT
- CRUD APIs for books and reviews

---

## 📝 Setup Instructions

### Prerequisites

- Node.js v16+
- npm or yarn
- MongoDB Atlas or local MongoDB

### Backend Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `backend`:
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```
API will run at `http://localhost:5000`.

### Frontend Setup

1. Go to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `frontend` (optional):
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend server:
```bash
npm start
```
App will run at `http://localhost:3000`.

---

## 📡 API Documentation

### Auth Routes

- **POST `/auth/signup`**
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "user": { "_id": "...", "name": "...", "email": "..." },
      "token": "JWT_TOKEN"
    }
    ```

- **POST `/auth/login`**
  - Request body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "user": { "_id": "...", "name": "...", "email": "..." },
      "token": "JWT_TOKEN"
    }
    ```

### Book Routes

- **GET `/books?page=1&limit=5`**
  - Fetch paginated books.
  - Response:
    ```json
    {
      "books": [...],
      "totalPages": 3
    }
    ```

- **POST `/books`** (protected)
  - Request body:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Fiction",
      "year": 2023,
      "description": "Book description"
    }
    ```
  - Response: created book object.

- **GET `/books/:id`**
  - Fetch book details with reviews and average rating.

- **PUT `/books/:id`** (protected, owner only)
  - Update book info.

- **DELETE `/books/:id`** (protected, owner only)
  - Delete book and its reviews.

### Review Routes

- **POST `/reviews`** (protected)
  - Request body:
    ```json
    {
      "bookId": "<book-id>",
      "rating": 4,
      "reviewText": "Amazing book!"
    }
    ```
  - Response: created review.

- **PUT `/reviews/:id`** (protected, owner only)
  - Update review.

- **DELETE `/reviews/:id`** (protected, owner only)
  - Delete review.

---

## ⚡ Notes

- **Authentication**: Include JWT in `Authorization` header as `Bearer <token>` for protected routes.
- **Pagination**: Default 5 books per page, configurable via query params `page` and `limit`.
- **Frontend**: Uses Context API to store authenticated user and token.

