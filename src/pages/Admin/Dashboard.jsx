import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Building2, PawPrint, Heart, Store, ShoppingCart,
  Flag, HelpCircle, Shield, Activity,
} from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import Badge from "../../components/admin/Badge";
import {
  mockDashboardStats,
  mockGraficas,
  mockRefugios,
  mockReportes,
  mockPQRS,
  mockAuditoria,
} from "../../data/admin/mockData";

function MiniChart({ data, color = "rose" }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-0.5 h-12">
      {data.map((valor, i) => {
        const altura = ((valor - min) / range) * 100;
        return (
          <div
            key={i}
            style={{ height: `${Math.max(altura, 5)}%` }}
            className={`flex-1 rounded-sm transition-all duration-300 ${
              color === "rose"
                ? "bg-rose-200 dark:bg-rose-500/30"
                : color === "amber"
                ? "bg-amber-200 dark:bg-amber-500/30"
                : color === "emerald"
                ? "bg-emerald-200 dark:bg-emerald-500/30"
                : "bg-blue-200 dark:bg-blue-500/30"
            }`}
          />
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { usuariosRegistrados, refugiosRegistrados, mascotasPublicadas, mascotasAdoptadas, productosPublicados, pedidosActivos, reportesPendientes, pqrsPendientes, administradoresActivos } = mockDashboardStats;

  const statCards = [
    { titulo: "Usuarios Registrados", valor: usuariosRegistrados.total, icono: Users, color: "rose", incremento: usuariosRegistrados.incremento, onClick: () => navigate("/admin/usuarios") },
    { titulo: "Refugios Registrados", valor: refugiosRegistrados.total, icono: Building2, color: "emerald", incremento: refugiosRegistrados.incremento, onClick: () => navigate("/admin/refugios") },
    { titulo: "Mascotas Publicadas", valor: mascotasPublicadas.total, icono: PawPrint, color: "amber", incremento: mascotasPublicadas.incremento, onClick: () => navigate("/admin/mascotas") },
    { titulo: "Mascotas Adoptadas", valor: mascotasAdoptadas.total, icono: Heart, color: "rose", incremento: mascotasAdoptadas.incremento },
    { titulo: "Productos Publicados", valor: productosPublicados.total, icono: Store, color: "blue", incremento: productosPublicados.incremento, onClick: () => navigate("/admin/marketplace") },
    { titulo: "Pedidos Activos", valor: pedidosActivos.total, icono: ShoppingCart, color: "violet", incremento: pedidosActivos.incremento, onClick: () => navigate("/admin/pedidos") },
    { titulo: "Reportes Pendientes", valor: reportesPendientes.total, icono: Flag, color: "orange", incremento: reportesPendientes.incremento, onClick: () => navigate("/admin/reportes") },
    { titulo: "PQRS Pendientes", valor: pqrsPendientes.total, icono: HelpCircle, color: "cyan", incremento: pqrsPendientes.incremento, onClick: () => navigate("/admin/pqrs") },
    { titulo: "Administradores Activos", valor: administradoresActivos.total, icono: Shield, color: "teal", incremento: administradoresActivos.incremento, onClick: () => navigate("/admin/administradores") },
  ];

  const ultimosRefugios = mockRefugios.slice(0, 4);
  const ultimosReportes = mockReportes.filter((r) => r.estado === "pendiente").slice(0, 3);
  const ultimasPQRS = mockPQRS.filter((p) => p.estado === "pendiente" || p.estado === "en_proceso").slice(0, 3);
  const actividadReciente = mockAuditoria.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
          Panel de Administración
        </h1>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
          Visualiza y gestiona todos los aspectos de Adoptify
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usuarios registrados */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Usuarios Registrados</h3>
            <span className="text-xs text-gray-400">Últimos 7 meses</span>
          </div>
          <MiniChart data={mockGraficas.usuariosRegistrados.data} color="rose" />
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-dark-text-secondary">
            <span>Ene</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Adopciones */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Adopciones</h3>
            <span className="text-xs text-gray-400">Últimos 7 meses</span>
          </div>
          <MiniChart data={mockGraficas.adopciones.data} color="emerald" />
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-dark-text-secondary">
            <span>Ene</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Actividad del Foro */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Actividad del Foro</h3>
            <span className="text-xs text-gray-400">Últimos 7 meses</span>
          </div>
          <MiniChart data={mockGraficas.foroActividad.publicaciones} color="amber" />
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-dark-text-secondary">
            <span>Ene</span>
            <span>Jul</span>
          </div>
        </div>
      </div>

      {/* Tablas de actividad reciente */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Últimos Refugios */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Últimos Refugios Registrados</h3>
            <button
              onClick={() => navigate("/admin/refugios")}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Ver todos
            </button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border">
            {ultimosRefugios.map((ref) => (
              <div key={ref.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/refugios")}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {ref.nombre[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{ref.nombre}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{ref.ciudad}</p>
                  </div>
                </div>
                <Badge estado={ref.estado} />
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Reciente (Auditoría) */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Actividad Reciente</h3>
            <button
              onClick={() => navigate("/admin/auditoria")}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Ver todo
            </button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border">
            {actividadReciente.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-dark-border flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                    {act.adminNombre[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{act.accion}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{act.adminNombre} · {act.modulo}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-dark-text-secondary flex-shrink-0 ml-2">
                  {new Date(act.fecha).toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reportes Pendientes y PQRS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Reportes Pendientes */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">Reportes Pendientes</h3>
            <button
              onClick={() => navigate("/admin/reportes")}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Ver todos
            </button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border">
            {ultimosReportes.map((rep) => (
              <div key={rep.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/reportes")}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Flag size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{rep.entidadNombre}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{rep.motivo} · {rep.modulo}</p>
                  </div>
                </div>
                <Badge estado={rep.estado} />
              </div>
            ))}
            {ultimosReportes.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-400">No hay reportes pendientes</div>
            )}
          </div>
        </div>

        {/* PQRS Pendientes */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text">PQRS Pendientes</h3>
            <button
              onClick={() => navigate("/admin/pqrs")}
              className="text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Ver todas
            </button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-dark-border">
            {ultimasPQRS.map((pqrs) => (
              <div key={pqrs.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/pqrs")}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <HelpCircle size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{pqrs.asunto}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{pqrs.remitente} · {pqrs.tipo}</p>
                  </div>
                </div>
                <Badge estado={pqrs.estado} />
              </div>
            ))}
            {ultimasPQRS.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-400">No hay PQRS pendientes</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
