import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, PawPrint, Heart, User, Mail, Lock, ArrowRight, Users, Eye, EyeOff, CheckCircle, XCircle, Phone, FileText } from "lucide-react";
import logo from "../assets/logo.png";
import loginDog from "../assets/loginDog.jpg";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState("adopter");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);
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

  // Validar documento (solo números)
  const validateDocumentNumber = (number) => {
    return /^\d+$/.test(number) && number.length >= 10;
  };

  // Validar teléfono
  const validatePhone = (phone) => {
    return /^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''));
  };

  // Validar espacios (no al inicio/final, no dobles)
  const validateSpaces = (value) => {
    return value === value.trim() && !/\s{2,}/.test(value);
  };

  // Validar si email ya está registrado (simulado)
  const isEmailRegistered = (email) => {
    const registeredEmails = localStorage.getItem("registeredEmails");
    const emails = registeredEmails ? JSON.parse(registeredEmails) : [];
    return emails.includes(email.toLowerCase());
  };

  // Validar campo individual
  const validateField = (field, value) => {
    let error = "";
    
    switch (field) {
      case "firstName":
        if (!value.trim()) {
          error = "El nombre es obligatorio";
        } else if (!validateSpaces(value)) {
          error = "No se permiten espacios al inicio/final ni espacios dobles";
        }
        break;
      case "lastName":
        if (!value.trim()) {
          error = "Los apellidos son obligatorios";
        } else if (!validateSpaces(value)) {
          error = "No se permiten espacios al inicio/final ni espacios dobles";
        }
        break;
      case "documentType":
        if (!value) {
          error = "El tipo de documento es obligatorio";
        }
        break;
      case "documentNumber":
        if (!value.trim()) {
          error = "El número de documento es obligatorio";
        } else if (!validateDocumentNumber(value)) {
          error = "Debe contener solo números y mínimo 10 dígitos";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "El teléfono es obligatorio";
        } else if (!validatePhone(value)) {
          error = "Formato inválido (ej: 300 123 4567)";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "El correo es obligatorio";
        } else if (!validateEmail(value)) {
          error = "Formato de correo inválido";
        } else if (isEmailRegistered(value)) {
          error = "Este correo ya está registrado";
        } else if (!validateSpaces(value)) {
          error = "No se permiten espacios al inicio/final ni espacios dobles";
        }
        break;
      case "password":
        if (!value) {
          error = "La contraseña es obligatoria";
        } else if (!validatePassword(value)) {
          error = "Debe tener mayúscula, minúscula, número y carácter especial";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Confirmar contraseña es obligatorio";
        } else if (value !== password) {
          error = "Las contraseñas no coinciden";
        }
        break;
      case "terms":
        if (!value) {
          error = "Debes aceptar los términos y condiciones";
        }
        break;
    }
    
    return error;
  };

  // Manejar cambio de campo con validación
  const handleFieldChange = (field, value) => {
    const setter = {
      firstName: setFirstName,
      lastName: setLastName,
      documentType: setDocumentType,
      documentNumber: setDocumentNumber,
      phone: setPhone,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
      terms: setTerms
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
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      documentType: validateField("documentType", documentType),
      documentNumber: validateField("documentNumber", documentNumber),
      phone: validateField("phone", phone),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmPassword: validateField("confirmPassword", confirmPassword),
      terms: validateField("terms", terms)
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

    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Guardar email como registrado
      const registeredEmails = localStorage.getItem("registeredEmails");
      const emails = registeredEmails ? JSON.parse(registeredEmails) : [];
      emails.push(email.toLowerCase());
      localStorage.setItem("registeredEmails", JSON.stringify(emails));
      
      // Redirigir a login después de mostrar éxito
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

      {/* Success Message */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-display">¡Cuenta creada exitosamente!</h3>
            <p className="text-gray-600 mb-4">Redirigiendo al inicio de sesión...</p>
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
        
        {/* Left Panel - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-4">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Adoptify Logo"
                className="w-48 h-auto"
              />
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-display mb-2">
                Crea tu cuenta
              </h2>
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                  Inicia sesión
                </Link>
              </p>
            </div>

            {/* Form Container with Scroll */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-gray-100 space-y-3">
                {/* Document Type and Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="documentType" className="text-sm font-semibold text-gray-700">
                      Tipo de Documento
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                      <select
                        id="documentType"
                        value={documentType}
                        onChange={(e) => handleFieldChange("documentType", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 ${
                          errors.documentType ? 'border-red-500 focus:ring-red-500' : documentType && !errors.documentType ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PP">Pasaporte</option>
                      </select>
                      {errors.documentType ? (
                        <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                      ) : documentType ? (
                        <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                      ) : null}
                    </div>
                    {errors.documentType && <p className="text-xs text-red-600">{errors.documentType}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="documentNumber" className="text-sm font-semibold text-gray-700">
                      Número de Documento
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                      <input
                        id="documentNumber"
                        type="text"
                        placeholder="123456789"
                        value={documentNumber}
                        onChange={(e) => handleFieldChange("documentNumber", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                          errors.documentNumber ? 'border-red-500 focus:ring-red-500' : documentNumber && !errors.documentNumber ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      />
                      {errors.documentNumber ? (
                        <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                      ) : documentNumber ? (
                        <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                      ) : null}
                    </div>
                    {errors.documentNumber && <p className="text-xs text-red-600">{errors.documentNumber}</p>}
                  </div>
                </div>

                {/* Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                      Nombres
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Juan"
                        value={firstName}
                        onChange={(e) => handleFieldChange("firstName", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                          errors.firstName ? 'border-red-500 focus:ring-red-500' : firstName && !errors.firstName ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      />
                      {errors.firstName ? (
                        <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                      ) : firstName ? (
                        <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                      ) : null}
                    </div>
                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                      Apellidos
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Pérez"
                        value={lastName}
                        onChange={(e) => handleFieldChange("lastName", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                          errors.lastName ? 'border-red-500 focus:ring-red-500' : lastName && !errors.lastName ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      />
                      {errors.lastName ? (
                        <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                      ) : lastName ? (
                        <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                      ) : null}
                    </div>
                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="300 123 4567"
                      value={phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : phone && !errors.phone ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                      }`}
                    />
                    {errors.phone ? (
                      <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                    ) : phone ? (
                      <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                    ) : null}
                  </div>
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
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
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : email && !errors.email ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                      }`}
                    />
                    {errors.email ? (
                      <XCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-red-500" />
                    ) : email ? (
                      <CheckCircle className="absolute right-3 top-3.5 h-4.5 w-4.5 text-green-500" />
                    ) : null}
                  </div>
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        onChange={(e) => handleFieldChange("password", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                          errors.password ? 'border-red-500 focus:ring-red-500' : password && !errors.password ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
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
                        onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 ${
                          errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : confirmPassword && !errors.confirmPassword ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 focus:ring-rose-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => handleFieldChange("terms", e.target.checked)}
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
                {errors.terms && <p className="text-xs text-red-600">{errors.terms}</p>}
              </div>

              {/* Submit Button - Outside scroll */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
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
