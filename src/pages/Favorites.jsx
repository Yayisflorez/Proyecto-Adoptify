import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Heart, MapPin, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useAuth();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/animals" className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-600 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a animales
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-display">
            Mis Favoritos
          </h1>
          <p className="text-xl text-gray-600">
            {favorites.length === 0 
              ? "Aún no has guardado ninguna mascota en tus favoritos" 
              : `Tienes ${favorites.length} mascota${favorites.length !== 1 ? 's' : ''} en favoritos`
            }
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin favoritos</h3>
            <p className="text-gray-600 mb-4">Explora nuestra sección de animales y guarda tus favoritos</p>
            <Link
              to="/animals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
            >
              <PawPrint className="w-5 h-5" />
              Explorar Animales
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((animal) => (
              <div key={animal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center">
                    <PawPrint className="w-20 h-20 text-rose-400" />
                  </div>
                  <button
                    onClick={() => removeFavorite(animal.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-red-50 transition-all"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {animal.type}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {animal.age}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 font-display">{animal.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{animal.breed}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {animal.shelter}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded-lg">{animal.size}</span>
                      <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg">{animal.gender}</span>
                    </div>
                    <Link 
                      to={`/animal/${animal.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-full hover:from-rose-600 hover:to-amber-600 transition-all"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
