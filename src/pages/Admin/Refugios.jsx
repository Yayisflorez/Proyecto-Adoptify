import React, { useState } from "react";
import { Check, X, Eye, Pause, Play, AlertCircle, FileText, UserX, RotateCcw } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import Badge from "../../components/admin/Badge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { mockRefugios } from "../../data/admin/mockData";

export default function AdminRefugios() {
  const [refugios, setRefugios] = useState(mockRefugios);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRefugio, setSelectedRefugio] = useState(null);
  const [modalConfig, setModalConfig] = useState({ titulo: "", descripcion: "", variant: "default", confirmText: "", action: null, icon: null });

  const handleAction = (refugio, accion) => {
    setSelectedRefugio(refugio);
    const configs = {
      approve: {
        titulo: "Aprobar Refugio",
        descripcion: `¿Estás seguro de aprobar el refugio "${refugio.nombre}"? Podrá publicar mascotas y productos.`,
        variant: "success",
        confirmText: "Aprobar",
        icon: Check,
      },
      reject: {
        titulo: "Rechazar Refugio",
        descripcion: `¿Estás seguro de rechazar el refugio "${refugio.nombre}"? Se notificará al solicitante.`,
        variant: "danger",
        confirmText: "Rechazar",
        icon: X,
      },
      suspend: {
        titulo: "Suspender Refugio",
        descripcion: `¿Estás seguro de suspender "${refugio.nombre}"? No podrá operar en la plataforma.`,
        variant: "danger",
        confirmText: "Suspender",
        icon: Pause,
      },
      activate: {
        titulo: "Reactivar Refugio",
        descripcion: `¿Estás seguro de reactivar "${refugio.nombre}"? Podrá operar nuevamente.`,
        variant: "success",
        confirmText: "Reactivar",
        icon: Play,
      },
    };
    setModalConfig({ ...configs[accion], action: accion });
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedRefugio || !modalConfig.action) return;
    const newState = {
      approve: "activo",
      reject: "rechazado",
      suspend: "suspendido",
      activate: "activo",
    }[modalConfig.action];

    setRefugios((prev) =>
      prev.map((r) => (r.id === selectedRefugio.id ? { ...r, estado: newState } : r))
    );
    setModalOpen(false);
    setSelectedRefugio(null);
  };

  const columnas = [
    { key: "nombre", titulo: "Refugio", tipo: "avatar", nombreAvatar: (f) => f.nombre, ordenable: true },
    { key: "email", titulo: "Email", ordenable: true },
    { key: "ciudad", titulo: "Ciudad", ordenable: true },
    { key: "estado", titulo: "Estado", tipo: "badge", ordenable: true },
    { key: "mascotas", titulo: "Mascotas", ordenable: true, className: "text-center" },
    { key: "calificacion", titulo: "Calif.", ordenable: true, className: "text-center",
      acceso: (f) => f.calificacion > 0 ? f.calificacion.toFixed(1) : "—",
    },
    { key: "fechaRegistro", titulo: "Registro", tipo: "fecha", ordenable: true },
    {
      key: "acciones",
      titulo: "Acciones",
      tipo: "render",
      ordenable: false,
      className: "text-right",
      render: (_, fila) => (
        <div className="flex items-center justify-end gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Ver perfil">
            <Eye size={15} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors" title="Documentos">
            <FileText size={15} />
          </button>
          {fila.estado === "pendiente" && (
            <>
              <button onClick={(e) => { e.stopPropagation(); handleAction(fila, "approve"); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors" title="Aprobar">
                <Check size={15} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleAction(fila, "reject"); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Rechazar">
                <X size={15} />
              </button>
            </>
          )}
          {(fila.estado === "activo" || fila.estado === "suspendido") && (
            <button
              onClick={(e) => { e.stopPropagation(); handleAction(fila, fila.estado === "suspendido" ? "activate" : "suspend"); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              title={fila.estado === "suspendido" ? "Reactivar" : "Suspender"}
            >
              {fila.estado === "suspendido" ? <Play size={15} /> : <Pause size={15} />}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Gestión de Refugios</h1>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
          Administra, aprueba y supervisa los refugios registrados
        </p>
      </div>

      <DataTable
        columnas={columnas}
        datos={refugios}
        placeholder="Buscar refugios..."
        emptyMessage="No se encontraron refugios"
      />

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        titulo={modalConfig.titulo}
        descripcion={modalConfig.descripcion}
        variant={modalConfig.variant}
        confirmText={modalConfig.confirmText}
        icon={modalConfig.icon}
      />
    </div>
  );
}
