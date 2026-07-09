import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Heart, Clock, PawPrint, CheckCircle, Store, Eye, X } from "lucide-react";

export default function ShelterDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data - in a real app this would come from an API
  const shelter = {
    id: id || 1,
    name: "Hogar de huellas",
    location: "Ibagué - Tolima",
    verified: true,
    rating: 4.8,
    totalRatings: 127,
    logo: null,
    description: "Dedicados al rescate y rehabilitación de animales en situación de calle. Trabajamos con amor y dedicación para encontrar hogares responsables para cada una de nuestras mascotas.",
    availablePets: 152,
    adoptionsThisMonth: 24,
    vaccinated: true,
    sterilized: true,
    hours: "8:00 am - 5:00 pm",
    phone: "+57 300 123 4567",
    email: "hogarDeHuellas@gmail.com",
    address: "Ibagué - Tolima",
    gallery: [
      { id: 1, image: null },
      { id: 2, image: null },
      { id: 3, image: null },
      { id: 4, image: null },
      { id: 5, image: null },
      { id: 6, image: null }
    ],
    pets: [
      { id: 1, name: "Max", age: "7 meses", image: null },
      { id: 2, name: "Leo", age: "4 meses", image: null },
      { id: 3, name: "Layla", age: "24 meses", image: null },
      { id: 4, name: "Rio", age: "12 meses", image: null }
    ]
  };

  if (!shelter) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <p>Refugio no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative floating background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-rose-200/20 rounded-full blur-3xl animate-float-1" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl animate-float-2" />
        <div className="absolute bottom-32 left-40 w-44 h-44 bg-rose-300/15 rounded-full blur-3xl animate-float-3" />
        <div className="absolute bottom-60 right-60 w-36 h-36 bg-amber-300/15 rounded-full blur-3xl animate-float-4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to="/shelters"
          className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-gray-600 hover:text-rose-500 transition-all duration-300 hover:scale-105 ${
            isVisible ? "animate-fade-in-left" : "opacity-0"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        {/* Header Section */}
        <div className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 hover-lift ${
          isVisible ? "animate-fade-in-down" : "opacity-0"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-6 flex-1">
              {/* Logo */}
              <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105">
                {shelter.logo ? (
                  <img src={shelter.logo} alt={shelter.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <PawPrint className="w-12 h-12 text-rose-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">{shelter.name}</h1>
                  {shelter.verified && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Verificado
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span className="text-lg">{shelter.location}</span>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{shelter.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                    <Phone className="w-5 h-5" />
                    Contactar
                  </button>
                  <Link
                    to={`/shelter-store/${shelter.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-dark-card text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500 dark:border-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Store className="w-5 h-5" />
                    Ver Tienda
                  </Link>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isFavorite
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white animate-heartbeat" : ""} transition-all`} />
                    Favorito
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{shelter.rating}</p>
                <p className="text-xs text-gray-600">{shelter.totalRatings} calificaciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Stats & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Section */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <PawPrint className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shelter.availablePets}</p>
                <p className="text-sm text-gray-600">Disponibles</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shelter.adoptionsThisMonth}</p>
                <p className="text-sm text-gray-600">Adopciones/mes</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${shelter.vaccinated ? "text-green-500" : "text-gray-400"}`} />
                <p className={`text-lg font-bold ${shelter.vaccinated ? "text-green-600" : "text-gray-400"}`}>Sí</p>
                <p className="text-sm text-gray-600">Vacunados</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${shelter.sterilized ? "text-green-500" : "text-gray-400"}`} />
                <p className={`text-lg font-bold ${shelter.sterilized ? "text-green-600" : "text-gray-400"}`}>Sí</p>
                <p className="text-sm text-gray-600">Esterilizados</p>
              </div>
            </div>

            {/* Hours Section */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-500 animate-pulse-soft" />
                Horario de atención
              </h3>
              <p className="text-xl font-semibold text-gray-900">{shelter.hours}</p>
              <p className="text-sm text-gray-600 mt-1">Lunes a Sábado</p>
            </div>

            {/* User Rating Section - Moved to left column after hours */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
              isVisible ? "animate-fade-in-up animation-delay-250" : "opacity-0"
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-rose-500" />
                Califica este refugio
              </h3>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-all duration-200 hover:scale-125 active:scale-90"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || userRating) >= star
                          ? "text-amber-500 fill-amber-500 drop-shadow-sm"
                          : "text-gray-300 hover:text-amber-300"
                      } transition-all duration-200`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {userRating > 0 ? `Tu calificación: ${userRating} estrella${userRating !== 1 ? 's' : ''}` : 'Haz clic en las estrellas para calificar'}
              </p>
            </div>

            {/* Pets for Adoption Section */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
              isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-display">Mascotas en adopción</h2>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{shelter.pets.length} disponibles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shelter.pets.map((pet, index) => (
                  <div
                    key={pet.id}
                    className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group hover-lift"
                    style={{ animationDelay: `${350 + index * 100}ms` }}
                  >
                    <div className="w-full h-32 bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden img-zoom-container">
                      <div className="zoom-content w-full h-full flex items-center justify-center">
                        <PawPrint className="w-12 h-12 text-rose-300 group-hover:text-rose-400 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                      <span className="text-sm text-gray-600">{pet.age}</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-lg hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95">
                      Adoptar
                    </button>
                  </div>
                ))}
              </div>

              {/* "Ver más mascotas" button */}
              <div className="mt-6 text-center">
                <Link
                  to={`/shelter/${shelter.id}/animals`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
                >
                  <Eye className="w-5 h-5 group-hover:animate-wiggle" />
                  Ver más mascotas
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Contact, Gallery */}
          <div className="space-y-6">
            {/* Contact Information - Moved up */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
              isVisible ? "animate-fade-in-right animation-delay-100" : "opacity-0"
            }`}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Información de contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-rose-50 transition-colors duration-300 group">
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold text-gray-900">{shelter.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-rose-50 transition-colors duration-300 group">
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 text-sm">{shelter.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-rose-50 transition-colors duration-300 group">
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-semibold text-gray-900">{shelter.address}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Síguenos en redes</p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95">
                    Facebook
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 active:scale-95">
                    Instagram
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Gallery Section - Moved up, smaller photos */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
              isVisible ? "animate-fade-in-right animation-delay-200" : "opacity-0"
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-rose-500" />
                Galería de fotos
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {shelter.gallery.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="aspect-[4/3] bg-gradient-to-br from-rose-100 to-amber-100 rounded-lg overflow-hidden group cursor-pointer relative hover:shadow-md transition-all duration-300"
                  >
                    {photo.image ? (
                      <img src={photo.image} alt={`Foto ${photo.id}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-hover:bg-rose-200">
                        <PawPrint className="w-5 h-5 text-rose-300 group-hover:text-rose-500 group-hover:scale-125 transition-all duration-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-medium bg-black/40 px-1.5 py-0.5 rounded-full">
                        Ver
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section - Full width below the grid */}
        <div className={`bg-white rounded-2xl shadow-lg p-6 hover-lift ${
          isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"
        }`}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-display flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            Ubicación
          </h2>
          <div className="w-full h-72 sm:h-96 bg-gradient-to-br from-rose-100 to-amber-100 rounded-xl flex items-center justify-center overflow-hidden relative group">
            {/* Decorative map pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-rose-300 rounded-full" />
              <div className="absolute bottom-10 right-20 w-48 h-48 border-2 border-amber-300 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-rose-400 rounded-full" />
            </div>
            <div className="text-center relative z-10 group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold text-gray-900">{shelter.address}</p>
              <p className="text-sm text-gray-600 mt-1">Haz clic para ver en Google Maps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 gallery-modal-backdrop animate-modal-overlay"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-96 sm:h-[500px] bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
              {selectedPhoto.image ? (
                <img
                  src={selectedPhoto.image}
                  alt={`Foto ${selectedPhoto.id}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <PawPrint className="w-24 h-24 text-rose-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Foto {selectedPhoto.id}</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">
                Galería de {shelter.name}
              </p>
              <div className="flex gap-2">
                {shelter.gallery.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedPhoto.id === photo.id
                        ? "border-rose-500 scale-110"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                      <PawPrint className="w-4 h-4 text-rose-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
