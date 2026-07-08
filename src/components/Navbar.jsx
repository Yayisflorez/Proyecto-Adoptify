import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Sparkles, User, ChevronDown, LogOut, PawPrint, ShoppingBag, MessageSquare, Home as HomeIcon, Settings, Bell, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;
  const isAuthenticated = !!user;

  const handleScroll = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ['forum', 'how-it-works', 'animals', 'store'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const isSectionActive = (section) => activeSection === section;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Adoptify Logo"
              className="h-16 w-auto transition-transform group-hover:scale-120"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isActive("/dashboard") ? "text-rose-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  Inicio
                </Link>
                <Link
                  to="/animals"
                  className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isActive("/animals") ? "text-rose-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  <PawPrint className="w-4 h-4" />
                  Animales
                </Link>
                <Link
                  to="/shelters"
                  className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isActive("/shelters") ? "text-rose-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  Refugios
                </Link>
                <Link
                  to="/store"
                  className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isActive("/store") ? "text-rose-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Tienda
                </Link>
                <Link
                  to="/forum"
                  className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isActive("/forum") ? "text-rose-500 font-semibold" : "text-gray-600"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Foro
                </Link>
              </>
            ) : (
              <>
                {isHomePage ? (
                  <button
                    onClick={scrollToTop}
                    className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                      isActive("/") ? "text-rose-500 font-semibold" : "text-gray-600"
                    }`}
                  >
                    Inicio
                  </button>
                ) : (
                  <Link
                    to="/"
                    className={`text-sm font-medium transition-colors hover:text-rose-500 flex items-center gap-1 ${
                      isActive("/") ? "text-rose-500 font-semibold" : "text-gray-600"
                    }`}
                  >
                    Inicio
                  </Link>
                )}
                {isHomePage ? (
                  <>
                    <button
                      onClick={() => handleScroll('how-it-works')}
                      className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                        isSectionActive('how-it-works') ? "text-rose-500 font-semibold" : "text-gray-600"
                      }`}
                    >
                      Cómo funciona
                    </button>
                    <button
                      onClick={() => handleScroll('animals')}
                      className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                        isSectionActive('animals') ? "text-rose-500 font-semibold" : "text-gray-600"
                      }`}
                    >
                      Animales
                    </button>
                    <button
                      onClick={() => handleScroll('store')}
                      className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                        isSectionActive('store') ? "text-rose-500 font-semibold" : "text-gray-600"
                      }`}
                    >
                      Tienda
                    </button>
                    <button
                      onClick={() => handleScroll('forum')}
                      className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                        isSectionActive('forum') ? "text-rose-500 font-semibold" : "text-gray-600"
                      }`}
                    >
                      Foro
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/#how-it-works"
                      className="text-sm font-medium transition-colors hover:text-rose-500 text-gray-600"
                    >
                      Cómo funciona
                    </Link>
                    <Link
                      to="/#animals"
                      className="text-sm font-medium transition-colors hover:text-rose-500 text-gray-600"
                    >
                      Animales
                    </Link>
                    <Link
                      to="/#store"
                      className="text-sm font-medium transition-colors hover:text-rose-500 text-gray-600"
                    >
                      Tienda
                    </Link>
                    <Link
                      to="/#forum"
                      className="text-sm font-medium transition-colors hover:text-rose-500 text-gray-600"
                    >
                      Foro
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>

                {/* Cart */}
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Mi Cuenta</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name || "Usuario"}</p>
                        <p className="text-sm text-gray-600">{user?.email || ""}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Mi Perfil</span>
                      </Link>
                      <Link
                        to="/adoption-history"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <PawPrint className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Historial de Adopciones</span>
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Mis Favoritos</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Configuración</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-rose-600 ${
                    isActive("/login") ? "text-rose-600 font-semibold" : "text-gray-600"
                  }`}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-xl group bg-gradient-to-br from-rose-500 to-amber-500 group-hover:from-rose-500 group-hover:to-amber-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-rose-200 transition-all duration-300 shadow-md shadow-rose-100"
                >
                  <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-transparent rounded-xl flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    Registrarse
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
          isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 space-y-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                  isActive("/dashboard") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                Inicio
              </Link>
              <Link
                to="/animals"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                  isActive("/animals") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <PawPrint className="w-4 h-4" />
                Animales
              </Link>
              <Link
                to="/shelters"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                  isActive("/shelters") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                Refugios
              </Link>
              <Link
                to="/store"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                  isActive("/store") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Tienda
              </Link>
              <Link
                to="/forum"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                  isActive("/forum") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Foro
              </Link>
              <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <button className="relative p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                  </button>
                  <Link to="/cart" onClick={() => setIsOpen(false)} className="relative p-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </Link>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </Link>
                <Link
                  to="/adoption-history"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 rounded-lg"
                >
                  <PawPrint className="w-4 h-4" />
                  Historial de Adopciones
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 rounded-lg"
                >
                  <Heart className="w-4 h-4" />
                  Mis Favoritos
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 rounded-lg"
                >
                  <Settings className="w-4 h-4" />
                  Configuración
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <>
              {isHomePage ? (
                <button
                  onClick={scrollToTop}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                    isActive("/") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  }`}
                >
                  Inicio
                </button>
              ) : (
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive("/") ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  }`}
                >
                  Inicio
                </Link>
              )}
              {isHomePage ? (
                <>
                  <button
                    onClick={() => handleScroll('how-it-works')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                      isSectionActive('how-it-works') ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                    }`}
                  >
                    Cómo funciona
                  </button>
                  <button
                    onClick={() => handleScroll('animals')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                      isSectionActive('animals') ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                    }`}
                  >
                    Animales
                  </button>
                  <button
                    onClick={() => handleScroll('store')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                      isSectionActive('store') ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                    }`}
                  >
                    Tienda
                  </button>
                  <button
                    onClick={() => handleScroll('forum')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                      isSectionActive('forum') ? "bg-rose-50 text-rose-500" : "text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                    }`}
                  >
                    Foro
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/#how-it-works"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Cómo funciona
                  </Link>
                  <Link
                    to="/#animals"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Animales
                  </Link>
                  <Link
                    to="/#store"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Tienda
                  </Link>
                  <Link
                    to="/#forum"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500"
                  >
                    Foro
                  </Link>
                </>
              )}
              <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-rose-500 rounded-lg"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 rounded-lg shadow-sm"
                >
                  Registrarse
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
