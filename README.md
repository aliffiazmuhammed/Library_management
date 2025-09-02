# Library_management
# 📚 Library Management System  

A full-stack **Library Management System** built with **NodeJS** for the backend and **ReactJS** for the frontend.  
The project demonstrates **Role-Based Access Control (RBAC)**, user authentication, book management, and a clean responsive UI for library operations.  

---

## 🚀 Live Demo  
🔗 [Library Management System](https://library-management-fbud.vercel.app/)  

---

## 📂 Repository  
🔗 [GitHub Repository](https://github.com/aliffiazmuhammed/Library_management.git)  

---

## 👥 Login Credentials  

You can use the following test accounts:  

- **Admin**:  
  - Email: `admin@library.com`  
  - Password: `admin123`  

- **Librarian**:  
  - Email: `librarian@library.com`  
  - Password: `admin123`  

- **Member/User**:  
  - Email: `user@library.com`  
  - Password: `alif@123`  

---

## 🛠️ Tech Stack  

- **Frontend:** ReactJS, Tailwind CSS, React Router, Context API  
- **Backend:** NodeJS  
- **Database:** MongoDB 
- **Deployment:** Vercel (Frontend), NodeJS (Backend)  
- **Version Control:** Git & GitHub  

---

## 📌 Features  

### 🔐 Authentication & RBAC  
- Secure **JWT-based authentication** (register, login, logout).  
- Role-Based Access Control:  
  - **Admin**: Full access to users, books, reports.  
  - **Librarian**: Manage books (add/edit/delete/issue).  
  - **Member**: Search, filter, issue, and return books.  

### 📖 Book Management  
- Add, edit, delete, and view books.  
- Book details include Title, Author, Genre, Publication Date, Availability Status.  

### 📦 Book Issuance  
- Users can issue and return books.  
- Track due dates and user-book mapping.  

### 🔍 Search & Filter  
- Search by **title** or **author**.  
- Filter by **genre** and **availability**.  

### 💻 Frontend (ReactJS)  
- Responsive UI with clean design.  
- State management with **Context API**.  
- Smooth navigation using **React Router**.  

### 🌐 API (NodeJS Framework)  
- RESTful API endpoints for all operations.  
- Proper error handling & validation.  

---

## 📑 Project Modules  

1. **Authentication Module**  
   - Register, login, logout with role handling.  

2. **Book Management Module**  
   - CRUD operations for books.  

3. **Issuance Module**  
   - Issue and return book tracking.  

4. **Search & Filter Module**  
   - Search by keywords, filter by status/genre.  

5. **User Management (Admin only)**  
   - Add, edit, delete users and view activity.  

---
