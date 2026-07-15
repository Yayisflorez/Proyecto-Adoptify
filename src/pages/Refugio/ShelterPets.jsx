import React, { useState } from "react";
import {
  PawPrint, Plus, Search, Dog, Cat, Calendar, Heart, Edit3, Trash2,
  ChevronDown, X, AlertCircle, CheckCircle, Clock, Ruler, Syringe,
  Image, Upload, Info, Tag, Weight, Scissors,
  Sparkles, Camera
} from "lucide-react";

export default function ShelterPets() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todas");

  const [pets, setPets] = useState([
    { id: 1, name: "Max", type: "Perro", breed: "Golden Retriever", age: "2 años", size: "Grande", gender: "Macho", status: "disponible", description: "Max es un perro muy cariñoso y juguetón. Le encanta correr y jugar con la pelota.", image: null, vaccinated: true, sterilized: true, entryDate: "10 Ene 2026" },
    { id: 2, name: "Luna", type: "Gato", breed: "Siamés", age: "1 año", size: "Pequeño", gender: "Hembra", status: "disponible", description: "Luna es una gata muy tranquila y cariñosa. Le encanta dormir al sol.", image: null, vaccinated: true, sterilized: false, entryDate: "5 Feb 2026" },
    { id: 3, name: "Rocky", type: "Perro", breed: "Pastor Alemán", age: "3 años", size: "Grande", gender: "Macho", status: "en proceso", description: "Rocky es un perro leal y protector. Ideal para familias con jardín.", image: null, vaccinated: true, sterilized: true, entryDate: "20 Mar 2026" },
    { id: 4, name: "Mimi", type: "Gato", breed: "Persa", age: "4 años", size: "Mediano", gender: "Hembra", status: "adoptado", description: "Mimi es una gata elegante y cariñosa. Se lleva bien con otros gatos.", image: null, vaccinated: true, sterilized: true, entryDate: "15 Abr 2026" },
    { id: 5, name: "Thor", type: "Perro", breed: "Husky", age: "1 año", size: "Mediano", gender: "Macho", status: "disponible", description: "Thor es un cachorro lleno de energía. Necesita espacio para correr.", image: null, vaccinated: false, sterilized: false, entryDate: "1 Jun 2026" },
  ]);

  const emptyPet = {
    name: "", type: "Perro", breed: "", age: "", size: "Mediano",
    gender: "Macho", status: "disponible", description: "",
    vaccinated: false, sterilized: false, images: []
  };

  const [newPet, setNewPet] = useState({ ...emptyPet });
  const [editPet, setEditPet] = useState(null);

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "todas" || pet.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const config = {
      "disponible": { color: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400", icon: CheckCircle },
      "en proceso": { color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock },
      "adoptado": { color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: Heart },
    };
    const c = config[status] || config["disponible"];
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const handleImageUpload = (petData, setPetData, e) => {
    const files = Array.from(e.target.files);
    const remaining = 3 - (petData.images?.length || 0);
    const toAdd = files.slice(0, remaining);
    toAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newImg = { id: Date.now() + Math.random(), src: ev.target.result, file };
        setPetData(prev => ({ ...prev, images: [...(prev.images || []), newImg] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (petData, setPetData, imgId) => {
    setPetData(prev => ({
      ...prev, images: (prev.images || []).filter(img => img.id !== imgId)
    }));
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const newId = pets.length + 1;
    setPets([...pets, {
      ...newPet, id: newId, image: null,
      entryDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    }]);
    setShowAddModal(false);
    setNewPet({ ...emptyPet });
  };

  const handleEditPet = (e) => {
    e.preventDefault();
    setPets(pets.map(p => p.id === editPet.id ? { ...p, ...editPet } : p));
    setShowEditModal(null);
    setEditPet(null);
  };

  const handleDeletePet = () => {
    setPets(pets.filter(p => p.id !== showDeleteModal));
    setShowDeleteModal(null);
  };

  const openEditModal = (pet) => {
    setEditPet({ ...pet, images: pet.images || [] });
    setShowEditModal(pet.id);
  };

  // ===== IMAGE UPLOAD SECTION COMPONENT =====
  const ImageUploadSection = ({ images, onUpload, onRemove, label = "Fotos" }) => {
    const inputRef = React.useRef(null);
    const count = images?.length || 0;
    const remaining = 3 - count;

    return (
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
          <Camera className="w-4 h-4 text-rose-500" />
          {label} <span className="text-xs text-gray-400">({count}/3)</span>
        </label>
        <div className="flex gap-2">
          {(images || []).map((img, index) => (
            <div key={img.id} className="relative group w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-border border border-gray-200 dark:border-dark-border flex-shrink-0">
              <img src={img.src} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button type="button" onClick={() => onRemove(img.id)}
                  className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <span className="absolute bottom-0.5 right-1 text-[9px] font-medium bg-black/50 text-white px-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
          {remaining > 0 && (
            <button type="button" onClick={() => inputRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-border hover:border-rose-400 dark:hover:border-rose-500 flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-rose-50/50 dark:hover:bg-rose-500/5 flex-shrink-0">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-[9px] text-gray-400 font-medium">Subir</span>
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
      </div>
    );
  };

  // ===== FORM SECTION COMPONENT =====
  const FormSection = ({ icon: Icon, title, children, color = "text-rose-500" }) => (
    <div className="col-span-3">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-dark-border">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {children}
      </div>
    </div>
  );

  const FormField = ({ label, children, span = "col-span-1" }) => (
    <div className={span}>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );

  // ===== PET FORM =====
  const PetForm = ({ petData, setPetData, onSubmit, onCancel, title, isEdit }) => {
    const handleImageUploadFor = (e) => {
      const files = Array.from(e.target.files);
      const remaining = 3 - (petData.images?.length || 0);
      const toAdd = files.slice(0, remaining);
      toAdd.forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const newImg = { id: Date.now() + Math.random(), src: ev.target.result, file };
          setPetData(prev => ({ ...prev, images: [...(prev.images || []), newImg] }));
        };
        reader.readAsDataURL(file);
      });
    };

    const handleRemoveImage = (imgId) => {
      setPetData(prev => ({
        ...prev, images: (prev.images || []).filter(img => img.id !== imgId)
      }));
    };

    const InputClass = "w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-all";
    const SelectClass = "w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white appearance-none cursor-pointer";

    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          {/* === INFORMACIÓN BÁSICA === */}
          <FormSection icon={Info} title="Información Básica" color="text-blue-500">
            <FormField label="Nombre" span="col-span-3">
              <input type="text" required value={petData.name} onChange={(e) => setPetData({...petData, name: e.target.value})}
                className={InputClass} placeholder="Nombre de la mascota" />
            </FormField>
            <FormField label="Tipo">
              <div className="relative">
                <select value={petData.type} onChange={(e) => setPetData({...petData, type: e.target.value})} className={SelectClass}>
                  <option>Perro</option>
                  <option>Gato</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>
            <FormField label="Raza">
              <input type="text" required value={petData.breed} onChange={(e) => setPetData({...petData, breed: e.target.value})}
                className={InputClass} placeholder="Ej: Golden Retriever" />
            </FormField>
            <FormField label="Edad">
              <input type="text" required value={petData.age} onChange={(e) => setPetData({...petData, age: e.target.value})}
                className={InputClass} placeholder="Ej: 2 años" />
            </FormField>
          </FormSection>

          {/* === CARACTERÍSTICAS FÍSICAS === */}
          <FormSection icon={Tag} title="Características Físicas" color="text-amber-500">
            <FormField label="Sexo">
              <div className="relative">
                <select value={petData.gender} onChange={(e) => setPetData({...petData, gender: e.target.value})} className={SelectClass}>
                  <option>Macho</option>
                  <option>Hembra</option>
                </select>
                <Heart className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>
            <FormField label="Tamaño">
              <div className="relative">
                <select value={petData.size} onChange={(e) => setPetData({...petData, size: e.target.value})} className={SelectClass}>
                  <option>Pequeño</option>
                  <option>Mediano</option>
                  <option>Grande</option>
                </select>
                <Ruler className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>
            <FormField label="Estado">
              <div className="relative">
                <select value={petData.status} onChange={(e) => setPetData({...petData, status: e.target.value})} className={SelectClass}>
                  <option value="disponible">Disponible</option>
                  <option value="en proceso">En proceso</option>
                  <option value="adoptado">Adoptado</option>
                </select>
                <Heart className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>
          </FormSection>

          {/* === SALUD === */}
          <FormSection icon={Syringe} title="Salud" color="text-emerald-500">
            <FormField label="Vacunado" span="col-span-1">
              <label className="flex items-center gap-2 h-[38px] px-3 border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg transition-all">
                <input type="checkbox" checked={petData.vaccinated} onChange={(e) => setPetData({...petData, vaccinated: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                <span className={`text-sm font-medium ${petData.vaccinated ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {petData.vaccinated ? 'Sí' : 'No'}
                </span>
              </label>
            </FormField>
            <FormField label="Esterilizado" span="col-span-1">
              <label className="flex items-center gap-2 h-[38px] px-3 border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg transition-all">
                <input type="checkbox" checked={petData.sterilized} onChange={(e) => setPetData({...petData, sterilized: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span className={`text-sm font-medium ${petData.sterilized ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {petData.sterilized ? 'Sí' : 'No'}
                </span>
              </label>
            </FormField>
            <FormField label=" " span="col-span-1">
              <div className="h-[38px] flex items-center">
                {petData.vaccinated && petData.sterilized && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    <CheckCircle className="w-3 h-3" />
                    Completo
                  </span>
                )}
              </div>
            </FormField>
          </FormSection>

          {/* === DESCRIPCIÓN === */}
          <div className="col-span-3">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-dark-border">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Descripción</span>
            </div>
            <textarea rows={2} value={petData.description} onChange={(e) => setPetData({...petData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white resize-none"
              placeholder="Describe la personalidad y características de la mascota..." />
          </div>

          {/* === FOTOS === */}
          <ImageUploadSection
            images={petData.images}
            onUpload={handleImageUploadFor}
            onRemove={handleRemoveImage}
            label="Fotos de la Mascota"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-dark-border">
          <button type="submit"
            className="flex-1 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all hover:shadow-lg hover:shadow-rose-200 dark:hover:shadow-rose-500/20 flex items-center justify-center gap-2 text-sm">
            {isEdit ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {title}
          </button>
          <button type="button" onClick={onCancel}
            className="px-6 py-2.5 text-gray-600 dark:text-gray-400 font-medium rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-all text-sm">
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 rounded-full text-sm font-medium mb-3">
              <PawPrint className="w-4 h-4" />
              <span>Gestión de Mascotas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-display">Mis Mascotas</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mt-1">Registra y administra las mascotas de tu refugio</p>
          </div>
          <button onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 dark:shadow-rose-500/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />
            Agregar Mascota
          </button>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Buscar por nombre o raza..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white" />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-rose-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
              <option value="todas">Todas</option>
              <option value="Perro">Perros</option>
              <option value="Gato">Gatos</option>
            </select>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <PawPrint className="w-16 h-16 text-gray-300 dark:text-dark-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No hay mascotas registradas</h3>
            <p className="text-gray-500 dark:text-dark-text-secondary mb-6">Comienza registrando tu primera mascota</p>
            <button onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
              <Plus className="w-5 h-5 mr-2" /> Agregar Mascota
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="group bg-white dark:bg-dark-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 dark:border-dark-border overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-500/20 dark:to-amber-500/20 flex items-center justify-center">
                  {pet.type === "Perro" ? (
                    <Dog className="w-20 h-20 text-rose-400/60 dark:text-rose-400/40" />
                  ) : (
                    <Cat className="w-20 h-20 text-amber-400/60 dark:text-amber-400/40" />
                  )}
                  <div className="absolute top-3 right-3">{getStatusBadge(pet.status)}</div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/80 dark:bg-dark-bg/80 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                      {pet.type === "Perro" ? <Dog className="w-3 h-3" /> : <Cat className="w-3 h-3" />}
                      {pet.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">{pet.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3">{pet.breed}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-lg">
                      <Calendar className="w-3 h-3" /> {pet.age}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-lg">
                      <Ruler className="w-3 h-3" /> {pet.size}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-border px-2 py-1 rounded-lg">
                      {pet.gender === "Macho" ? "♂" : "♀"} {pet.gender}
                    </span>
                  </div>
                  {pet.vaccinated && (
                    <span className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg mr-1">
                      <Syringe className="w-3 h-3" /> Vacunado
                    </span>
                  )}
                  {pet.sterilized && (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
                      Esterilizado
                    </span>
                  )}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <button onClick={() => openEditModal(pet)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button onClick={() => setShowDeleteModal(pet.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 animate-modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-500/20 dark:to-amber-500/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                Nueva Mascota
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <PetForm petData={newPet} setPetData={setNewPet} onSubmit={handleAddPet}
              onCancel={() => setShowAddModal(false)} title="Registrar Mascota" isEdit={false} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editPet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => { setShowEditModal(null); setEditPet(null); }}>
          <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 animate-modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                Editar {editPet.name}
              </h2>
              <button onClick={() => { setShowEditModal(null); setEditPet(null); }} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <PetForm petData={editPet} setPetData={setEditPet} onSubmit={handleEditPet}
              onCancel={() => { setShowEditModal(null); setEditPet(null); }} title="Guardar Cambios" isEdit={true} />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => setShowDeleteModal(null)}>
          <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-md w-full p-6 animate-modal-content text-center" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-2">¿Eliminar mascota?</h2>
            <p className="text-gray-500 dark:text-dark-text-secondary mb-6">Esta acción no se puede deshacer. La mascota será eliminada permanentemente.</p>
            <div className="flex gap-3">
              <button onClick={handleDeletePet} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all">Eliminar</button>
              <button onClick={() => setShowDeleteModal(null)} className="flex-1 py-3 text-gray-600 dark:text-gray-400 font-medium rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-all">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
