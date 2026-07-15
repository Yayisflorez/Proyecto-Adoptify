import React, { useState } from "react";
import { ClipboardList, Search, Filter, Calendar, Clock, User, Dog, Cat, ChevronDown, Eye, MessageSquare, CheckCircle, XCircle, AlertCircle, ArrowUp, ChevronRight, Phone, Mail, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShelterRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Datos de ejemplo de solicitudes
  const [requests, setRequests] = useState([
    { id: 1, user: "Ana López", email: "ana@email.com", phone: "+57 300 111 2233", pet: "Max", petType: "Perro", status: "pendiente", date: "14 Jul 2026", time: "10:30 AM", message: "Hola, me encantaría adoptar a Max. Tengo experiencia con perros grandes y un jardín amplio donde puede correr.", location: "Bogotá", hasFamily: true, hasExperience: true },
    { id: 2, user: "Carlos Ruiz", email: "carlos@email.com", phone: "+57 310 444 5566", pet: "Luna", petType: "Gato", status: "en revisión", date: "13 Jul 2026", time: "3:45 PM", message: "Estoy interesado en adoptar a Luna. Vivo en apartamento pero es suficientemente amplio para un gato.", location: "Medellín", hasFamily: false, hasExperience: true },
    { id: 3, user: "María Fernández", email: "maria@email.com", phone: "+57 320 777 8899", pet: "Rocky", petType: "Perro", status: "contactado", date: "12 Jul 2026", time: "9:15 AM", message: "Quiero darle un hogar a Rocky. Soy veterinaria y tengo mucha experiencia con perros de raza grande.", location: "Cali", hasFamily: true, hasExperience: true },
    { id: 4, user: "Pedro Martínez", email: "pedro@email.com", phone: "+57 301 222 3344", pet: "Mimi", petType: "Gato", status: "finalizada", date: "10 Jul 2026", time: "2:00 PM", message: "Adopté a Mimi y está feliz en su nuevo hogar. Muchas gracias por todo.", location: "Bogotá", hasFamily: true, hasExperience: false },
    { id: 5, user: "Laura Gómez", email: "laura@email.com", phone: "+57 315 666 7788", pet: "Thor", petType: "Perro", status: "cerrada", date: "8 Jul 2026", time: "11:30 AM", message: "Lamento informar que ya no puedo adoptar a Thor debido a un cambio de situación laboral.", location: "Barranquilla", hasFamily: false, hasExperience: false },
    { id: 6, user: "Roberto Sánchez", email: "roberto@email.com", phone: "+57 311 888 9900", pet: "Thor", petType: "Perro", status: "pendiente", date: "15 Jul 2026", time: "8:00 AM", message: "Estoy muy interesado en adoptar a Thor. Tengo casa con jardín y otro perro para que tenga compañía.", location: "Bogotá", hasFamily: true, hasExperience: true },
  ]);

  const statuses = ["todas", "pendiente", "en revisión", "contactado", "finalizada", "cerrada"];

  const getStatusConfig = (status) => {
    const config = {
      "pendiente": { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400", icon: Clock, bg: "bg-yellow-50 dark:bg-yellow-500/5" },
      "en revisión": { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: AlertCircle, bg: "bg-blue-50 dark:bg-blue-500/5" },
      "contactado": { color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400", icon: MessageSquare, bg: "bg-purple-50 dark:bg-purple-500/5" },
      "cerrada": { color: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400", icon: XCircle, bg: "bg-gray-50 dark:bg-gray-500/5" },
      "finalizada": { color: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400", icon: Heart, bg: "bg-green-50 dark:bg-green-500/5" },
    };
    return config[status] || config["pendiente"];
  };

  const getStatusIcon = (status) => {
    const c = getStatusConfig(status);
    const Icon = c.icon;
    return <Icon className={`w-4 h-4 ${c.color.split(' ')[1]}`} />;
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.user.toLowerCase().includes(searchTerm.toLowerCase()) || req.pet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todas" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const openDetail = (req) => {
    setSelectedRequest(req);
    setShowDetailModal(true);
  };

  const StatusBadge = ({ status }) => {
    const c = getStatusConfig(status);
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${c.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 rounded-full text-sm font-medium mb-3">
              <ClipboardList className="w-4 h-4" />
              <span>Solicitudes de Adopción</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-display">Solicitudes</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mt-1">Revisa y gestiona las solicitudes de adopción recibidas</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-display">{requests.length}</p>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Total solicitudes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {statuses.filter(s => s !== "todas").map((status) => {
            const count = requests.filter(r => r.status === status).length;
            const c = getStatusConfig(status);
            const Icon = c.icon;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`${c.bg} ${statusFilter === status ? `ring-2 ring-offset-2 dark:ring-offset-dark-bg ${c.color.split(' ')[0].replace('bg-', 'ring-')}` : ''} rounded-xl p-3 text-center transition-all hover:scale-105`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1 ${c.color.split(' ')[1]}`} />
                <p className={`text-lg font-bold font-display ${c.color.split(' ')[1]}`}>{count}</p>
                <p className={`text-xs font-medium ${c.color.split(' ')[1]}`}>{status}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Buscar por usuario o mascota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
              <option value="todas">Todos los estados</option>
              {statuses.filter(s => s !== "todas").map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Requests List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList className="w-16 h-16 text-gray-300 dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No hay solicitudes</h3>
            <p className="text-gray-500 dark:text-dark-text-secondary">No se encontraron solicitudes con los filtros actuales</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => {
              const c = getStatusConfig(req.status);
              const Icon = c.icon;
              return (
                <div key={req.id} className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-dark-border">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white font-bold shrink-0">
                        {req.user.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{req.user}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{req.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pet Info */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-dark-bg/50 rounded-xl shrink-0">
                      {req.petType === "Perro" ? <Dog className="w-4 h-4 text-emerald-500" /> : <Cat className="w-4 h-4 text-teal-500" />}
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{req.pet}</span>
                    </div>

                    {/* Status */}
                    <div className="shrink-0">
                      <StatusBadge status={req.status} />
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary shrink-0">
                      <Calendar className="w-4 h-4" />
                      <span>{req.date}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openDetail(req)} className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        Ver
                      </button>
                      <div className="relative group">
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-dark-bg/50 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-all flex items-center gap-1.5">
                          <ChevronDown className="w-4 h-4" />
                          Estado
                        </button>
                        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1">
                          {statuses.filter(s => s !== "todas" && s !== req.status).map((s) => {
                            const sc = getStatusConfig(s);
                            const SIcon = sc.icon;
                            return (
                              <button key={s} onClick={() => updateStatus(req.id, s)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                                <SIcon className={`w-4 h-4 ${sc.color.split(' ')[1]}`} />
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => { setShowDetailModal(false); setSelectedRequest(null); }}>
          <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-content" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-dark-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedRequest.user.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">{selectedRequest.user}</h2>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Solicitud #{selectedRequest.id}</p>
                  </div>
                </div>
                <StatusBadge status={selectedRequest.status} />
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg/50">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Email</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg/50">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.phone}</p>
                  </div>
                </div>
              </div>

              {/* Pet & Date Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl">
                  {selectedRequest.petType === "Perro" ? <Dog className="w-5 h-5 text-emerald-500" /> : <Cat className="w-5 h-5 text-teal-500" />}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Mascota solicitada</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.pet}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-dark-bg/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Fecha</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.date} - {selectedRequest.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-dark-bg/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">Ubicación</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedRequest.location}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mensaje del solicitante</h3>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg/50 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedRequest.message}
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex gap-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${selectedRequest.hasFamily ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400'}`}>
                  {selectedRequest.hasFamily ? '✓' : '✗'} Tiene familia
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${selectedRequest.hasExperience ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400'}`}>
                  {selectedRequest.hasExperience ? '✓' : '✗'} Experiencia previa
                </span>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-100 dark:border-dark-border pt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cambiar estado</h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.filter(s => s !== "todas" && s !== selectedRequest.status).map((s) => {
                    const sc = getStatusConfig(s);
                    const SIcon = sc.icon;
                    return (
                      <button key={s} onClick={() => { updateStatus(selectedRequest.id, s); }}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${sc.color} hover:scale-105`}>
                        <SIcon className="w-4 h-4" />
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-dark-border flex justify-end">
              <button onClick={() => { setShowDetailModal(false); setSelectedRequest(null); }}
                className="px-6 py-2.5 text-gray-600 dark:text-gray-400 font-medium rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-all">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
