import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';


import Layout from './components/layout/Layout';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage';
import AdminPage from './pages/AdminPage';
import BookUploadPage from './pages/BookUploadPage';
import UnauthorizedPage from './pages/UnauthorizedPage';


import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/books/new" 
              element={
                <ProtectedRoute requireAdmin>
                  <BookUploadPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
