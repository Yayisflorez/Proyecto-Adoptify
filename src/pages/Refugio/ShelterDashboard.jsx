import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Users, Heart, ClipboardList, MessageSquare, TrendingUp, Calendar, Clock, ChevronRight, ArrowUp, Building2, Dog, Cat, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ShelterDashboard() {
  const { user } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: PawPrint, label: "Mascotas Registradas", value: "24", color: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-500/10", textColor: "text-rose-600 dark:text-rose-400" },
    { icon: Users, label: "Solicitudes Recibidas", value: "18", color: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-500/10", textColor: "text-amber-600 dark:text-amber-400" },
    { icon: Heart, label: "Adopciones Exitosas", value: "12", color: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-500/10", textColor: "text-rose-600 dark:text-rose-400" },
    { icon: ClipboardList, label: "Solicitudes Pendientes", value: "6", color: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-500/10", textColor: "text-amber-600 dark:text-amber-400" },
  ];

  const recentRequests = [
    { id: 1, user: "Ana López", pet: "Max", type: "Perro", status: "pendiente", date: "14 Jul 2026", time: "10:30 AM" },
    { id: 2, user: "Carlos Ruiz", pet: "Luna", type: "Gato", status: "en revisión", date: "13 Jul 2026", time: "3:45 PM" },
    { id: 3, user: "María Fernández", pet: "Rocky", type: "Perro", status: "contactado", date: "12 Jul 2026", time: "9:15 AM" },
    { id: 4, user: "Pedro Martínez", pet: "Mimi", type: "Gato", status: "finalizada", date: "10 Jul 2026", time: "2:00 PM" },
    { id: 5, user: "Laura Gómez", pet: "Thor", type: "Perro", status: "cerrada", date: "8 Jul 2026", time: "11:30 AM" },
  ];

  const getStatusBadge = (status) => {
    const config = {
      "pendiente": { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400", icon: Clock },
      "en revisión": { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: AlertCircle },
      "contactado": { color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400", icon: CheckCircle2 },
      "cerrada": { color: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400", icon: XCircle },
      "finalizada": { color: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400", icon: Heart },
    };
    const c = config[status] || config["pendiente"];
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-12 bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-rose-950/20 dark:via-dark-bg dark:to-amber-950/20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl animate-float-1" />
          <div className="absolute top-40 right-32 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl animate-float-2" />
          <div className="absolute bottom-32 left-40 w-44 h-44 bg-rose-300/20 rounded-full blur-3xl animate-float-3" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 rounded-full text-sm font-medium mb-4">
                <Building2 className="w-4 h-4" />
                <span>Panel de Administración</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 font-display">
                ¡Bienvenido, {user?.name?.split(" ")[0] || "Refugio"}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary max-w-2xl">
                Gestiona tus mascotas, revisa solicitudes de adopción y mantén actualizada la información de tu refugio.
              </p>
            </div>
            <Link
              to="/refugio/mascotas"
              className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 dark:shadow-rose-500/20 hover:shadow-xl hover:shadow-rose-300 dark:hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105 shrink-0"
            >
              <PawPrint className="w-5 h-5 mr-2" />
              Registrar Mascota
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-dark-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <span className={`text-2xl font-bold ${stat.textColor} font-display`}>{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary">{stat.label}</p>
                  <div className="mt-3 w-full bg-gray-100 dark:bg-dark-border rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`} style={{ width: `${Math.min(100, parseInt(stat.value) * 4)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Requests */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white dark:bg-dark-card rounded-3xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-rose-500" />
                Solicitudes Recientes
              </h2>
              <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Últimas solicitudes de adopción recibidas</p>
            </div>
            <Link
              to="/refugio/solicitudes"
              className="text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-dark-bg/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Usuario</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Mascota</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Estado</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Fecha</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                {recentRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          {req.user.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{req.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {req.type === "Perro" ? <Dog className="w-4 h-4 text-rose-500" /> : <Cat className="w-4 h-4 text-amber-500" />}
                        <span className="text-sm text-gray-700 dark:text-gray-300">{req.pet}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(req.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-secondary">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{req.date}</span>
                        <Clock className="w-3.5 h-3.5 ml-1" />
                        <span>{req.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/refugio/solicitudes`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                      >
                        Gestionar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pet Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              Resumen de Mascotas
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-500/10 dark:to-amber-500/10">
                <div className="flex items-center gap-3">
                  <Dog className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Perros</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">14</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-500/10 dark:to-rose-500/10">
                <div className="flex items-center gap-3">
                  <Cat className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gatos</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">10</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-bg/50">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Adoptados</span>
                </div>
                <span className="font-bold text-rose-500">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              Próximas Actividades
            </h3>
            <div className="space-y-3">
              {[
                { icon: ClipboardList, title: "Revisar solicitud de Ana López", time: "Hoy - 10:30 AM", color: "text-amber-500" },
                { icon: Heart, title: "Seguimiento adopción de Rocky", time: "Mañana - 2:00 PM", color: "text-rose-500" },
                { icon: PawPrint, title: "Registrar nueva mascota", time: "17 Jul - 9:00 AM", color: "text-rose-500" },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-border flex items-center justify-center shrink-0 ${activity.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
