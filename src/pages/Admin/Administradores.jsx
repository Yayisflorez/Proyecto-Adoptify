import React, { useState } from "react";
import { Shield, ShieldCheck, UserPlus, X, AlertTriangle } from "lucide-react";
import Badge from "../../components/admin/Badge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { mockAdministradores, SUPER_ADMIN } from "../../data/admin/mockData";

const initialPermisos = {
  usuarios: false, refugios: false, mascotas: false, marketplace: false,
  pedidos: false, foro: false, reportes: false, pqrs: false,
  estadisticas: false, administradores: false, configuracion: false,
};

const permisosLabels = {
  usuarios: "Usuarios", refugios: "Refugios", mascotas: "Mascotas",
  marketplace: "Marketplace", pedidos: "Pedidos", foro: "Foro",
  reportes: "Reportes", pqrs: "PQRS", estadisticas: "Estadísticas",
  administradores: "Administradores", configuracion: "Configuración",
};

export default function AdminAdministradores() {
  const [admins, setAdmins] = useState(mockAdministradores);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalType, setModalType] = useState(null); // 'create', 'edit', 'status', 'view'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ nombre: "", email: "", password: "" });
  const [editingPermisos, setEditingPermisos] = useState({ ...initialPermisos });

  const adminsActivos = admins.filter((a) => a.estado === "activo");

  const handleCreate = () => {
    if (adminsActivos.length >= 4) {
      setShowLimitModal(true);
      return;
    }
    setNewAdmin({ nombre: "", email: "", password: "" });
    setEditingPermisos({ ...initialPermisos });
    setShowCreateModal(true);
  };

  const confirmCreate = () => {
    const admin = {
      id: `admin-${Date.now()}`,
      nombre: newAdmin.nombre,
      email: newAdmin.email,
      password: newAdmin.password,
      rol: "administrador",
      avatar: null,
      estado: "activo",
      fechaCreacion: new Date().toISOString(),
      ultimoAcceso: null,
      permisos: { ...editingPermisos },
    };
    setAdmins((prev) => [...prev, admin]);
    setShowCreateModal(false);
  };

  const handleEditPermisos = (admin) => {
    setSelectedAdmin(admin);
    setEditingPermisos({ ...admin.permisos });
    setModalType("edit");
    setShowCreateModal(true); // Reuse same modal
  };

  const confirmEditPermisos = () => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === selectedAdmin.id ? { ...a, permisos: { ...editingPermisos } } : a
      )
    );
    setSelectedAdmin(null);
    setShowCreateModal(false);
  };

  const handleToggleEstado = (admin) => {
    setSelectedAdmin(admin);
    setModalType("status");
  };

  const confirmToggleEstado = () => {
    const newEstado = selectedAdmin.estado === "activo" ? "suspendido" : "activo";
    setAdmins((prev) =>
      prev.map((a) => (a.id === selectedAdmin.id ? { ...a, estado: newEstado } : a))
    );
    setSelectedAdmin(null);
    setModalType(null);
  };

  const isSuperAdmin = (admin) => admin.rol === "administrador_principal";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Administradores</h1>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
            Gestiona los administradores de la plataforma
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-500 rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all duration-200 shadow-sm"
        >
          <UserPlus size={16} />
          Nuevo Admin
        </button>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary font-medium">Total administradores</p>
          <p className="text-xl font-bold text-gray-900 dark:text-dark-text mt-1">{admins.length}</p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary font-medium">Activos</p>
          <p className="text-xl font-bold text-emerald-500 mt-1">{adminsActivos.length} / 4</p>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm">
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary font-medium">Suspendidos / Inactivos</p>
          <p className="text-xl font-bold text-red-500 mt-1">{admins.filter(a => a.estado !== "activo").length}</p>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                  isSuperAdmin(admin)
                    ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    : "bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-500/10 dark:to-amber-500/10 text-rose-600 dark:text-rose-400"
                }`}>
                  {admin.nombre[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-dark-text">{admin.nombre}</p>
                  <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{admin.email}</p>
                </div>
              </div>
              <Badge estado={admin.rol} />
            </div>

            <div className="space-y-1.5 text-xs text-gray-500 dark:text-dark-text-secondary mb-4">
              <p>📅 Creado: {new Date(admin.fechaCreacion).toLocaleDateString("es-CO")}</p>
              <p>🕐 Último acceso: {admin.ultimoAcceso ? new Date(admin.ultimoAcceso).toLocaleDateString("es-CO", { hour: "2-digit", minute: "2-digit" }) : "Nunca"}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">Estado:</span>
                <Badge estado={admin.estado} />
              </div>
            </div>

            {/* Permisos chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {Object.entries(admin.permisos).map(([key, val]) =>
                val ? (
                  <span key={key} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-md">
                    <ShieldCheck size={10} /> {permisosLabels[key]}
                  </span>
                ) : null
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-dark-border">
              <button
                onClick={() => { setSelectedAdmin(admin); setModalType("view"); }}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 dark:text-dark-text-secondary bg-gray-50 dark:bg-dark-border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Ver perfil
              </button>
              {!isSuperAdmin(admin) && (
                <>
                  <button
                    onClick={() => handleEditPermisos(admin)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-500/10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    Permisos
                  </button>
                  <button
                    onClick={() => handleToggleEstado(admin)}
                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                      admin.estado === "activo"
                        ? "text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20"
                        : "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                    }`}
                  >
                    {admin.estado === "activo" ? "Suspender" : "Reactivar"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal crear/editar admin */}
      <ConfirmModal
        isOpen={showCreateModal && modalType !== "status"}
        onClose={() => { setShowCreateModal(false); setSelectedAdmin(null); setModalType(null); }}
        onConfirm={modalType === "edit" ? confirmEditPermisos : confirmCreate}
        titulo={modalType === "edit" ? `Permisos: ${selectedAdmin?.nombre}` : "Nuevo Administrador"}
        descripcion={
          modalType === "edit" ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Configura los permisos para <strong>{selectedAdmin?.nombre}</strong>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(permisosLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center justify-between px-3 py-2.5 bg-gray-50 dark:bg-dark-border rounded-xl cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 dark:text-dark-text">{label}</span>
                    <div
                      onClick={() => setEditingPermisos((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer ${
                        editingPermisos[key] ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        editingPermisos[key] ? "translate-x-5" : ""
                      }`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre completo"
                value={newAdmin.nombre}
                onChange={(e) => setNewAdmin((p) => ({ ...p, nombre: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin((p) => ({ ...p, password: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              <div>
                <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-2">Permisos iniciales:</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(permisosLabels).map(([key, label]) => (
                    <label key={key} className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-dark-border rounded-xl cursor-pointer">
                      <span className="text-xs font-medium text-gray-700 dark:text-dark-text">{label}</span>
                      <div
                        onClick={() => setEditingPermisos((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative w-9 h-4.5 rounded-full transition-colors duration-200 cursor-pointer ${
                          editingPermisos[key] ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          editingPermisos[key] ? "translate-x-[18px]" : ""
                        }`} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        confirmText={modalType === "edit" ? "Guardar permisos" : "Crear administrador"}
        variant={modalType === "edit" ? "default" : "success"}
      />

      {/* Modal cambiar estado */}
      <ConfirmModal
        isOpen={modalType === "status"}
        onClose={() => { setSelectedAdmin(null); setModalType(null); }}
        onConfirm={confirmToggleEstado}
        titulo={selectedAdmin?.estado === "activo" ? "Suspender Administrador" : "Reactivar Administrador"}
        descripcion={
          selectedAdmin?.estado === "activo"
            ? `¿Estás seguro de suspender a "${selectedAdmin?.nombre}"? No podrá acceder al panel hasta que sea reactivado.`
            : `¿Estás seguro de reactivar a "${selectedAdmin?.nombre}"? Podrá acceder nuevamente al panel.`
        }
        variant={selectedAdmin?.estado === "activo" ? "danger" : "success"}
        confirmText={selectedAdmin?.estado === "activo" ? "Suspender" : "Reactivar"}
      />

      {/* Modal límite de admins */}
      <ConfirmModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onConfirm={() => setShowLimitModal(false)}
        titulo="Límite de Administradores"
        descripcion="Ya hay 4 administradores activos. Para agregar uno nuevo, primero debes suspender o inactivar uno de los existentes."
        variant="warning"
        confirmText="Entendido"
        icon={AlertTriangle}
      />
    </div>
  );
}
