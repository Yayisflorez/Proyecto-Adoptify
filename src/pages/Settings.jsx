import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Shield, Eye, EyeOff, Globe, Moon, Sun, Save, ChevronRight, LogOut, Trash2, HelpCircle, Mail } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    adoptionUpdates: true,
    forumReplies: false,
    newAnimals: true
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showAdoptionHistory: false,
    allowMessages: true
  });

  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState("light");

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const togglePrivacy = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 font-display">
            Configuración
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tus preferencias y opciones de la cuenta
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Notificaciones</h3>
              <p className="text-sm text-gray-600">Controla cómo y cuándo recibes notificaciones</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: "email", label: "Notificaciones por correo", icon: Mail },
              { key: "push", label: "Notificaciones push", icon: Bell },
              { key: "adoptionUpdates", label: "Actualizaciones de adopción", icon: Bell },
              { key: "forumReplies", label: "Respuestas en el foro", icon: Bell },
              { key: "newAnimals", label: "Nuevas mascotas disponibles", icon: Bell }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    notifications[item.key] ? "bg-gradient-to-r from-rose-500 to-amber-500" : "bg-gray-300"
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notifications[item.key] ? "translate-x-6" : "translate-x-1"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Privacidad</h3>
              <p className="text-sm text-gray-600">Controla quién puede ver tu información</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: "showProfile", label: "Mostrar perfil público", icon: Eye },
              { key: "showAdoptionHistory", label: "Mostrar historial de adopciones", icon: Eye },
              { key: "allowMessages", label: "Permitir mensajes de otros usuarios", icon: Mail }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <button
                  onClick={() => togglePrivacy(item.key)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    privacy[item.key] ? "bg-gradient-to-r from-rose-500 to-amber-500" : "bg-gray-300"
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    privacy[item.key] ? "translate-x-6" : "translate-x-1"
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-display">Apariencia</h3>
              <p className="text-sm text-gray-600">Personaliza tu experiencia</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Idioma</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Tema</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-xl transition-all ${
                    theme === "light" ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-xl transition-all ${
                    theme === "dark" ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Acciones de Cuenta</h3>

          <div className="space-y-3">
            <Link to="/profile" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900 group-hover:text-rose-600">Cambiar contraseña</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
            </Link>

            <Link to="/profile" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900 group-hover:text-rose-600">Cambiar correo electrónico</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
            </Link>

            <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all group">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-600">Eliminar cuenta</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Ayuda y Soporte</h3>

          <div className="space-y-3">
            <Link to="#" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900 group-hover:text-rose-600">Centro de ayuda</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
            </Link>

            <Link to="#" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900 group-hover:text-rose-600">Contactar soporte</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Link to="/login" className="flex items-center justify-center gap-3 w-full p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all group">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-600">Cerrar Sesión</span>
          </Link>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg">
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
