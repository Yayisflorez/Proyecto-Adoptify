import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { I18nProvider } from "./context/I18nContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import Animals from "./pages/animals/Animals";
import AnimalProfile from "./pages/animals/AnimalProfile";
import ShelterAnimals from "./pages/animals/ShelterAnimals";
import Shelters from "./pages/shelters/Shelters";
import ShelterDetails from "./pages/shelters/ShelterDetails";
import Store from "./pages/marketplace/Store";
import ProductProfile from "./pages/marketplace/ProductProfile";
import Cart from "./pages/marketplace/Cart";
import Forum from "./pages/community/Forum";
import UserProfile from "./pages/user/UserProfile";
import AdoptionHistory from "./pages/user/AdoptionHistory";
import Settings from "./pages/user/Settings";
import Favorites from "./pages/user/Favorites";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Authenticated Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/animals" element={<ProtectedRoute><Animals /></ProtectedRoute>} />
          <Route path="/animal/:id" element={<ProtectedRoute><AnimalProfile /></ProtectedRoute>} />
          <Route path="/shelters" element={<ProtectedRoute><Shelters /></ProtectedRoute>} />
          <Route path="/shelter/:id" element={<ShelterDetails />} />
          <Route path="/shelter/:id/animals" element={<ProtectedRoute><ShelterAnimals /></ProtectedRoute>} />
          <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          <Route path="/shelter-store/:shelterId" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductProfile /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/adoption-history" element={<ProtectedRoute><AdoptionHistory /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          {/* Fallback route redirection */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Router>
                <AppContent />
              </Router>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
