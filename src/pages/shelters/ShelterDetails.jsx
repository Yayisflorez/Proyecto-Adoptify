import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Heart, Clock, PawPrint, CheckCircle } from "lucide-react";

export default function ShelterDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

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
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/shelters"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-gray-600 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-6 flex-1">
              {/* Logo */}
              <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
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
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-md">
                    <Phone className="w-5 h-5" />
                    Contactar
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
                      isFavorite
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                    Favorito
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-shadow">
                <PawPrint className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shelter.availablePets}</p>
                <p className="text-sm text-gray-600">Disponibles</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-shadow">
                <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{shelter.adoptionsThisMonth}</p>
                <p className="text-sm text-gray-600">Adopciones/mes</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-shadow">
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${shelter.vaccinated ? "text-green-500" : "text-gray-400"}`} />
                <p className={`text-lg font-bold ${shelter.vaccinated ? "text-green-600" : "text-gray-400"}`}>Sí</p>
                <p className="text-sm text-gray-600">Vacunados</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-shadow">
                <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${shelter.sterilized ? "text-green-500" : "text-gray-400"}`} />
                <p className={`text-lg font-bold ${shelter.sterilized ? "text-green-600" : "text-gray-400"}`}>Sí</p>
                <p className="text-sm text-gray-600">Esterilizados</p>
              </div>
            </div>

            {/* Hours Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-500" />
                Horario de atención
              </h3>
              <p className="text-xl font-semibold text-gray-900">{shelter.hours}</p>
              <p className="text-sm text-gray-600 mt-1">Lunes a Sábado</p>
            </div>

            {/* Pets for Adoption Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-display">Mascotas en adopción</h2>
                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{shelter.pets.length} disponibles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shelter.pets.map((pet) => (
                  <div key={pet.id} className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-xl p-4 hover:shadow-md transition-all group">
                    <div className="w-full h-32 bg-white rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PawPrint className="w-12 h-12 text-rose-300" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                      <span className="text-sm text-gray-600">{pet.age}</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-lg hover:from-rose-600 hover:to-amber-600 transition-all">
                      Adoptar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Rating, Contact, Location, Gallery */}
          <div className="space-y-6">
            {/* User Rating Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        (hoverRating || userRating) >= star
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {userRating > 0 ? `Tu calificación: ${userRating} estrella${userRating !== 1 ? 's' : ''}` : 'Haz clic en las estrellas para calificar'}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Información de contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Phone className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold text-gray-900">{shelter.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Mail className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900 text-sm">{shelter.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-rose-100 rounded-lg">
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
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                    Instagram
                  </button>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-display">Ubicación</h2>
              <div className="w-full h-48 bg-gradient-to-br from-rose-100 to-amber-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-rose-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">{shelter.address}</p>
                </div>
              </div>
            </div>

            {/* Photo Gallery Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-rose-500" />
                Galería de fotos
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {shelter.gallery.map((photo) => (
                  <div key={photo.id} className="aspect-square bg-gradient-to-br from-rose-100 to-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                    {photo.image ? (
                      <img src={photo.image} alt={`Foto ${photo.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PawPrint className="w-8 h-8 text-rose-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
