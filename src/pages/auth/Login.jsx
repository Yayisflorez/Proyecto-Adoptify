import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PawPrint, Heart, Users, Eye, EyeOff, CheckCircle, XCircle, Building2 } from "lucide-react";
import logo from "../../assets/logo.png";
import loginDog from "../../assets/loginDog.jpg";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validar formato de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar contraseña (mayúscula, minúscula, número, especial)
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  };

  // Validar campo individual
  const validateField = (field, value) => {
    let error = "";
    
    switch (field) {
      case "email":
        if (!value.trim()) {
          error = "El correo es obligatorio";
        } else if (!validateEmail(value)) {
          error = "Formato de correo inválido";
        }
        break;
      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (!validatePassword(value)) {
          error = "Debe tener mayúscula, minúscula, número y carácter especial";
        }
        break;
    }
    
    return error;
  };

  // Manejar cambio de campo con validación
  const handleFieldChange = (field, value) => {
    const setter = {
      email: setEmail,
      password: setPassword
    }[field];
    
    setter(value);
    
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Validar todos los campos
  const validateAll = () => {
    const newErrors = {
      email: validateField("email", email),
      password: validateField("password", password)
    };
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // ========================================================
      // VERIFICACIÓN DE ROL REFUGIO (SIN BASE DE DATOS AÚN)
      // Se valida con credenciales hardcodeadas mientras se integra
      // la base de datos real.
      // ========================================================
      const isShelterEmail = email === "pruebaRefugio@gmail.com";
      const isShelterPassword = password === "RefugiosVistas123#";
      const isShelter = isShelterEmail && isShelterPassword;

      let userData;

      if (isShelter) {
        // Datos para rol refugio
        userData = {
          name: "Refugio Patitas Felices",
          email: email,
          role: "refugio", // Rol refugio para identificar el tipo de usuario
          phone: "+57 301 987 6543",
          location: "Bogotá, Colombia",
          description: "Somos un refugio dedicado a rescatar y encontrar hogares amorosos para perros y gatos en situación de calle.",
          address: "Cra 45 # 67-89, Bogotá",
          socialMedia: {
            facebook: "patitasfelices",
            instagram: "@patitasfelices_refugio"
          },
          // Configuración del refugio: la tienda se activa manualmente desde configuración
          settings: {
            storeEnabled: false
          }
        };
      } else {
        // Datos para rol usuario normal
        userData = {
          name: "María García",
          email: email,
          role: "usuario", // Rol usuario normal
          phone: "+57 300 123 4567",
          location: "Bogotá, Colombia"
        };
      }

      login(userData);

      // Redirigir según el rol después de mostrar éxito
      setTimeout(() => {
        if (isShelter) {
          navigate("/refugio/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    }, 1200);
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

      {/* Success Message */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">¡Inicio de sesión exitoso!</h3>
            <p className="text-gray-600 mb-4">Redirigiendo al dashboard...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-2 rounded-full animate-[loading_2s_ease-in-out]" />
            </div>
          </div>
        </div>
      )}

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
        
        {/* Left Panel - Image with Gradient Border */}
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
                <Building2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
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
                Iniciar sesión
              </h2>
              <p className="text-sm text-gray-600">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={`w-full px-4 py-3 pr-10 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : email && !errors.email ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                    }`}
                  />
                  {errors.email ? (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  ) : email ? (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  ) : null}
                </div>
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700 block">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password ? (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  ) : password ? (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  ) : null}
                </div>
                {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <a href="#" className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Iniciar sesión"
                )}
              </button>

              {/* Register link */}
              <div className="text-center text-sm text-gray-600 pt-2">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                  Regístrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
