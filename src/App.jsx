import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { I18nProvider } from "./context/I18nContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ========================================================
// IMPORTACIONES DE VISTAS DE USUARIO
// Ubicadas en src/pages/Usuario/
// ========================================================
import Dashboard from "./pages/Usuario/Dashboard";
import UserProfile from "./pages/Usuario/UserProfile";
import AdoptionHistory from "./pages/Usuario/AdoptionHistory";
import Settings from "./pages/Usuario/Settings";
import Favorites from "./pages/Usuario/Favorites";

// ========================================================
// IMPORTACIONES DE VISTAS DE REFUGIO
// Ubicadas en src/pages/Refugio/
// ========================================================
import ShelterDashboard from "./pages/Refugio/ShelterDashboard";
import ShelterPets from "./pages/Refugio/ShelterPets";
import ShelterRequests from "./pages/Refugio/ShelterRequests";
import ShelterSettings from "./pages/Refugio/ShelterSettings";
import ShelterForum from "./pages/Refugio/ShelterForum";
import ShelterProfile from "./pages/Refugio/ShelterProfile";
import ShelterAdoptionHistory from "./pages/Refugio/ShelterAdoptionHistory";
import ShelterStore from "./pages/Refugio/ShelterStore";

// Otras importaciones existentes
import Animals from "./pages/animals/Animals";
import AnimalProfile from "./pages/animals/AnimalProfile";
import ShelterAnimals from "./pages/animals/ShelterAnimals";
import Shelters from "./pages/shelters/Shelters";
import ShelterDetails from "./pages/shelters/ShelterDetails";
import Store from "./pages/marketplace/Store";
import ProductProfile from "./pages/marketplace/ProductProfile";
import Cart from "./pages/marketplace/Cart";
import StoreProfile from "./pages/marketplace/StoreProfile";
import Forum from "./pages/community/Forum";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================================================ */}
          {/* RUTAS DE USUARIO (src/pages/Usuario/)            */}
          {/* ================================================ */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/adoption-history" element={<ProtectedRoute><AdoptionHistory /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* ================================================ */}
          {/* RUTAS DE REFUGIO (src/pages/Refugio/)            */}
          {/* ================================================ */}
          <Route path="/refugio/dashboard" element={<ProtectedRoute><ShelterDashboard /></ProtectedRoute>} />
          <Route path="/refugio/mascotas" element={<ProtectedRoute><ShelterPets /></ProtectedRoute>} />
          <Route path="/refugio/solicitudes" element={<ProtectedRoute><ShelterRequests /></ProtectedRoute>} />
          <Route path="/refugio/configuracion" element={<ProtectedRoute><ShelterSettings /></ProtectedRoute>} />
          <Route path="/refugio/foro" element={<ProtectedRoute><ShelterForum /></ProtectedRoute>} />
          <Route path="/refugio/perfil" element={<ProtectedRoute><ShelterProfile /></ProtectedRoute>} />
          <Route path="/refugio/historial" element={<ProtectedRoute><ShelterAdoptionHistory /></ProtectedRoute>} />
          <Route path="/refugio/tienda" element={<ProtectedRoute><ShelterStore /></ProtectedRoute>} />

          {/* Rutas existentes */}
          <Route path="/animals" element={<ProtectedRoute><Animals /></ProtectedRoute>} />
          <Route path="/animal/:id" element={<ProtectedRoute><AnimalProfile /></ProtectedRoute>} />
          <Route path="/shelters" element={<ProtectedRoute><Shelters /></ProtectedRoute>} />
          <Route path="/shelter/:id" element={<ShelterDetails />} />
          <Route path="/shelter/:id/animals" element={<ProtectedRoute><ShelterAnimals /></ProtectedRoute>} />
          <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          <Route path="/shelter-store/:shelterId" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          <Route path="/store-profile/:storeId" element={<ProtectedRoute><StoreProfile /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductProfile /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />

          {/* Fallback route */}
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
