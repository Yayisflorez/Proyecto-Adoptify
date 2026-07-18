import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
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
    // Force light mode on logout
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    window.location.href = "/";
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
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
    <AuthContext.Provider value={{ user, login, logout, register, loading, favorites, addFavorite, removeFavorite, isFavorite }}>
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
