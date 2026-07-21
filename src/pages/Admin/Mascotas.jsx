import React, { useState } from "react";
import { Eye, EyeOff, RotateCcw, Flag } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import Badge from "../../components/admin/Badge";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { mockMascotasAdmin } from "../../data/admin/mockData";

export default function AdminMascotas() {
  const [mascotas, setMascotas] = useState(mockMascotasAdmin);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  const handleAction = (mascota, accion) => {
    setSelectedPet(mascota);
    setModalAction(accion);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedPet) return;
    setMascotas((prev) =>
      prev.map((m) =>
        m.id === selectedPet.id
          ? { ...m, estado: modalAction === "hide" ? "oculto" : "visible" }
          : m
      )
    );
    setModalOpen(false);
    setSelectedPet(null);
    setModalAction(null);
  };

  const columnas = [
    { key: "nombre", titulo: "Nombre", tipo: "avatar", nombreAvatar: (f) => f.nombre, ordenable: true },
    { key: "especie", titulo: "Especie", ordenable: true },
    { key: "raza", titulo: "Raza", ordenable: true },
    { key: "edad", titulo: "Edad", ordenable: true },
    { key: "refugio", titulo: "Refugio", ordenable: true },
    { key: "estado", titulo: "Estado", tipo: "badge", ordenable: true },
    {
      key: "reportes",
      titulo: "Reportes",
      ordenable: true,
      className: "text-center",
      render: (valor) => (
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${valor > 0 ? "text-red-500" : "text-gray-500"}`}>
          <Flag size={13} /> {valor}
        </span>
      ),
    },
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
          <button
            onClick={(e) => { e.stopPropagation(); handleAction(fila, fila.estado === "oculto" ? "restore" : "hide"); }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
            title={fila.estado === "oculto" ? "Restaurar" : "Ocultar"}
          >
            {fila.estado === "oculto" ? <RotateCcw size={15} /> : <EyeOff size={15} />}
          </button>
          {fila.reportes > 0 && (
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Revisar reportes">
              <Flag size={15} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Gestión de Mascotas</h1>
        <p className="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">
          Supervisa las mascotas publicadas por los refugios
        </p>
      </div>

      <DataTable
        columnas={columnas}
        datos={mascotas}
        placeholder="Buscar mascotas..."
        emptyMessage="No se encontraron mascotas"
      />

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        titulo={modalAction === "hide" ? "Ocultar Mascota" : "Restaurar Mascota"}
        descripcion={
          modalAction === "hide"
            ? `¿Estás seguro de ocultar a "${selectedPet?.nombre}"? No será visible en la plataforma.`
            : `¿Estás seguro de restaurar a "${selectedPet?.nombre}"? Volverá a ser visible.`
        }
        variant={modalAction === "hide" ? "warning" : "success"}
        confirmText={modalAction === "hide" ? "Ocultar" : "Restaurar"}
        icon={modalAction === "hide" ? EyeOff : RotateCcw}
      />
    </div>
  );
}
