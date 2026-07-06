import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Save, X, PawPrint, Heart, Settings, LogOut, Shield } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  
  const [user, setUser] = useState({
    name: "María García",
    email: "maria.garcia@email.com",
    phone: "+57 300 123 4567",
    location: "Bogotá, Colombia",
    bio: "Amante de los animales desde siempre. Tengo 2 perros y 1 gato adoptados. Me encanta ayudar en refugios cuando puedo.",
    joinDate: "Enero 2024",
    avatar: null
  });

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const userStats = [
    { label: "Mascotas adoptadas", value: "3", icon: PawPrint, color: "from-rose-500 to-rose-600" },
    { label: "Favoritos", value: "12", icon: Heart, color: "from-amber-500 to-amber-600" },
    { label: "Miembro desde", value: user.joinDate, icon: Calendar, color: "from-rose-500 to-amber-500" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 font-display">
            Mi Perfil
          </h1>
          <p className="text-xl text-gray-600">
            Gestiona tu información y preferencias
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-rose-500 to-amber-500" />
          
          {/* Avatar Section */}
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-rose-400" />
                  )}
                </div>
                <button
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="ml-40 pt-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-display">{user.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 font-display">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Información Personal</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                <input
                  type="text"
                  value={editedUser.location}
                  onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                <textarea
                  rows="4"
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nombre completo</p>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Correo electrónico</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-semibold text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ubicación</p>
                  <p className="font-semibold text-gray-900">{user.location}</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Biografía</p>
                <p className="text-gray-900">{user.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/adoption-history" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-rose-600">Historial de Adopciones</p>
                <p className="text-sm text-gray-600">Ver el estado de tus solicitudes</p>
              </div>
            </Link>
            <Link to="/favorites" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-rose-600">Favoritos</p>
                <p className="text-sm text-gray-600">Mascotas guardadas</p>
              </div>
            </Link>
            <Link to="/settings" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-rose-600">Configuración</p>
                <p className="text-sm text-gray-600">Ajustes de la cuenta</p>
              </div>
            </Link>
            <Link to="/settings" className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-rose-600">Privacidad</p>
                <p className="text-sm text-gray-600">Gestionar tu privacidad</p>
              </div>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link to="/login" className="flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-all group">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-red-600">Cerrar Sesión</p>
                <p className="text-sm text-gray-600">Salir de tu cuenta</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-display">Cambiar Avatar</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-rose-400" />
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Arrastra una imagen o haz clic para seleccionar</p>
                <input type="file" className="hidden" accept="image/*" />
                <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
                  Seleccionar imagen
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
                  <Save className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
