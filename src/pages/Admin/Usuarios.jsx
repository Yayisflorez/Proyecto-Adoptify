import React, { useState } from "react";
import { Eye, UserX, RotateCcw, History, MessageSquare, FileText, Lock, Search } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import Badge from "../../components/admin/Badge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { mockUsuarios } from "../../data/admin/mockData";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const handleAction = (usuario, accion) => {
    setSelectedUser(usuario);
    setModalAction(accion);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, estado: modalAction === "suspend" ? "suspendido" : "activo" }
          : u
      )
    );
    setModalOpen(false);
    setSelectedUser(null);
    setModalAction(null);
  };

  const columnas = [
    { key: "nombre", titulo: "Usuario", tipo: "avatar", nombreAvatar: (f) => f.nombre, ordenable: true },
    { key: "email", titulo: "Email", ordenable: true },
    { key: "ciudad", titulo: "Ciudad", ordenable: true },
    { key: "estado", titulo: "Estado", tipo: "badge", ordenable: true },
    { key: "mascotasAdoptadas", titulo: "Adoptadas", ordenable: true, className: "text-center" },
    { key: "fechaRegistro", titulo: "Registro", tipo: "fecha", ordenable: true },
    {
      key: "acciones",
      titulo: "Acciones",
      tipo: "render",
      ordenable: false,
      className: "text-right",
      render: (_, fila) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setViewUser(fila); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
            title="Ver perfil"
          >
            <Eye size={15} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleAction(fila, fila.estado === "suspendido" ? "activate" : "suspend"); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            title={fila.estado === "suspendido" ? "Reactivar" : "Suspender"}
          >
            {fila.estado === "suspendido" ? <RotateCcw size={15} /> : <UserX size={15} />}
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
            title="Restablecer contraseña"
          >
            <Lock size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Gestión de Usuarios</h1>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
          Administra todos los usuarios registrados en la plataforma
        </p>
      </div>

      <DataTable
        columnas={columnas}
        datos={usuarios}
        placeholder="Buscar usuarios..."
        emptyMessage="No se encontraron usuarios"
      />

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        titulo={modalAction === "suspend" ? "Suspender Usuario" : "Reactivar Usuario"}
        descripcion={
          modalAction === "suspend"
            ? `¿Estás seguro de suspender a "${selectedUser?.nombre}"? El usuario no podrá acceder a la plataforma hasta que sea reactivado.`
            : `¿Estás seguro de reactivar a "${selectedUser?.nombre}"? El usuario podrá acceder nuevamente a la plataforma.`
        }
        variant={modalAction === "suspend" ? "danger" : "success"}
        confirmText={modalAction === "suspend" ? "Suspender" : "Reactivar"}
        icon={modalAction === "suspend" ? UserX : RotateCcw}
      />

      {/* Modal de perfil de usuario */}
      {viewUser && (
        <ConfirmModal
          isOpen={!!viewUser}
          onClose={() => setViewUser(null)}
          onConfirm={() => setViewUser(null)}
          titulo="Perfil de Usuario"
          descripcion={
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center text-lg font-bold text-rose-600">
                  {viewUser.nombre[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{viewUser.nombre}</p>
                  <p className="text-sm text-gray-500">{viewUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-medium">{viewUser.telefono}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Ciudad</p>
                  <p className="font-medium">{viewUser.ciudad}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Mascotas adoptadas</p>
                  <p className="font-medium">{viewUser.mascotasAdoptadas}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Estado</p>
                  <Badge estado={viewUser.estado} />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <History size={14} /> Historial
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <FileText size={14} /> Publicaciones
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <MessageSquare size={14} /> Comentarios
                </button>
              </div>
            </div>
          }
          confirmText="Cerrar"
          variant="default"
        />
      )}
    </div>
  );
}
