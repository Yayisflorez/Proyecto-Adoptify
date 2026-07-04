import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PawPrint, Heart, User, Mail, Lock, ArrowRight, Users, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import loginDog from "../assets/loginDog.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("adopter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!terms) {
      setError("Debes aceptar los Términos de Servicio y la Política de Privacidad.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert(`¡Registro exitoso como ${role === "adopter" ? "Adoptante" : "Refugio/Fundación"}!`);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-rose-100 via-rose-50 to-amber-100 animate-gradient flex items-center justify-center p-4 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full blur-3xl animate-float-1" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full blur-3xl animate-float-2" />
        <div className="absolute bottom-32 left-40 w-44 h-44 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full blur-3xl animate-float-3" />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full blur-3xl animate-float-4" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full blur-2xl animate-float-5" />
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full blur-2xl animate-float-6" />
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver al inicio</span>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Adoptify Logo"
                className="w-60 h-auto"
              />
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-display mb-2">
                Crea tu cuenta
              </h2>
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                  Inicia sesión
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-600 text-center font-medium">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  {role === "adopter" ? "Nombre Completo" : "Nombre de la Fundación"}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder={role === "adopter" ? "Juan Pérez" : "Fundación Patitas de Amor"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                    Confirmar
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600 leading-normal">
                  Acepto los{" "}
                  <a href="#" className="font-semibold text-rose-600 hover:underline">
                    Términos
                  </a>{" "}
                  y{" "}
                  <a href="#" className="font-semibold text-rose-600 hover:underline">
                    Privacidad
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Crear Cuenta
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel - Image with Gradient Border */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-8 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl translate-x-20 translate-y-20" />

          {/* Image Container with Gradient Border */}
          <div className="relative z-10 w-full max-w-sm">
            <div className="relative p-2 bg-gradient-to-br from-rose-500 via-rose-400 to-amber-500 rounded-3xl shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden bg-white">
                <img
                  src={loginDog}
                  alt="Adoptify - Conectando corazones con patitas"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex justify-center gap-4 mt-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-400 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <PawPrint className="w-6 h-6" />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <Heart className="w-6 h-6" />
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
