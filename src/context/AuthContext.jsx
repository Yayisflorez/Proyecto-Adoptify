import React, { createContext, useContext, useState, useEffect } from "react";
import { SUPER_ADMIN } from "../data/admin/mockData";
import { STORE_CREDENTIALS, mockStoreData } from "../data/store/mockStoreData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedFavorites = localStorage.getItem("favorites");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    window.location.href = "/";
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // --- Admin Login ---
  const adminLogin = (email, password) => {
    if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      const adminData = {
        ...SUPER_ADMIN,
        ultimoAcceso: new Date().toISOString(),
      };
      setUser(adminData);
      localStorage.setItem("user", JSON.stringify(adminData));
      return { success: true, user: adminData };
    }
    return { success: false, error: "Credenciales incorrectas" };
  };

  // --- Store (Tienda Aliada) Login ---
  const storeLogin = (email, password) => {
    if (email === STORE_CREDENTIALS.email && password === STORE_CREDENTIALS.password) {
      const storeData = {
        ...mockStoreData,
        ultimoAcceso: new Date().toISOString(),
      };
      setUser(storeData);
      localStorage.setItem("user", JSON.stringify(storeData));
      return { success: true, user: storeData };
    }
    return { success: false, error: "Credenciales incorrectas" };
  };

  const isAdmin = () => {
    return user?.rol === "administrador_principal" || user?.rol === "administrador";
  };

  const isStore = () => {
    return user?.rol === "tienda_aliada";
  };

  const addFavorite = (animal) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, animal];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorite = (animalId) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.id !== animalId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (animalId) => {
    return favorites.some((fav) => fav.id === animalId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, favorites, adminLogin, storeLogin, isAdmin, isStore, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
