import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, CheckCircle, XCircle, AlertCircle, MapPin, Calendar, Phone, MessageCircle } from "lucide-react";

export default function AdoptionHistory() {
  const adoptions = [
    { id: 1, name: "Max", breed: "Golden Retriever", shelter: "Refugio 'Hogar de huellas'", status: "approved", date: "15 Ene 2024", phone: "+57 300 123 4567" },
    { id: 2, name: "Luna", breed: "Siamés", shelter: "Refugio 'Patitas de amor'", status: "pending", date: "20 Feb 2024", phone: "+57 300 234 5678" },
    { id: 3, name: "Rocky", breed: "Bulldog", shelter: "Fundación 'Amigo fiel'", status: "rejected", date: "10 Dic 2023", phone: "+57 300 345 6789" }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      approved: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", border: "border-green-200", label: "Aprobada" },
      pending: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", label: "En revisión" },
      rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", label: "Rechazada" }
    };
    return styles[status];
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Historial de Adopciones</h1>
        <p className="text-xl text-gray-600 mb-8">Seguimiento de tus solicitudes</p>

        <div className="space-y-6">
          {adoptions.map((adoption) => {
            const style = getStatusStyle(adoption.status);
            const Icon = style.icon;
            return (
              <div key={adoption.id} className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${style.border}`}>
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PawPrint className="w-12 h-12 text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 font-display">{adoption.name}</h3>
                        <p className="text-gray-600">{adoption.breed}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 ${style.bg} rounded-lg`}>
                        <Icon className={`w-4 h-4 ${style.color}`} />
                        <span className={`text-sm font-semibold ${style.color}`}>{style.label}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{adoption.shelter}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{adoption.date}</span>
                    </div>
                    <div className="flex gap-2">
                      {adoption.status === "approved" && (
                        <>
                          <a href={`https://wa.me/${adoption.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600">WhatsApp</a>
                          <Link to={`/animal/${adoption.id}`} className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-lg">Ver perfil</Link>
                        </>
                      )}
                      {adoption.status === "rejected" && (
                        <Link to="/animals" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-lg">Buscar otra</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
