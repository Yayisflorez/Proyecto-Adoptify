import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import {
  X,
  Send,
  Image as ImageIcon,
  Hash,
  MapPin,
  Link as LinkIcon,
  Sparkles,
  ChevronDown,
  AlertCircle,
  Lightbulb,
  Clock,
  Eye,
  Shield,
  User,
} from "lucide-react";

const postTypes = [
  { id: "story", label: "Historia", icon: "📖", desc: "Comparte tu historia de adopción" },
  { id: "question", label: "Pregunta", icon: "❓", desc: "Haz una pregunta a la comunidad" },
  { id: "tip", label: "Consejo", icon: "💡", desc: "Comparte un consejo útil" },
  { id: "photo", label: "Foto", icon: "📸", desc: "Comparte una foto de tu mascota" },
];

const shelterPostTypes = [
  { id: "adoption_day", label: "Jornada de Adopción", icon: "🐾", desc: "Anuncia una jornada de adopción" },
  { id: "campaign", label: "Campaña", icon: "📢", desc: "Campaña de esterilización o vacunación" },
  { id: "donation", label: "Donación", icon: "🎁", desc: "Solicitud de donación" },
  { id: "event", label: "Evento", icon: "📅", desc: "Anuncia un evento especial" },
  { id: "special_case", label: "Caso Especial", icon: "🆘", desc: "Caso que requiere atención urgente" },
];

const categories = [
  "Cuidado",
  "Entrenamiento",
  "Salud",
  "Nutrición",
  "Historias",
  "Consejos",
  "Adopción",
  "Eventos",
  "Campañas",
  "Donaciones",
];

const suggestedTags = [
  "AdopciónResponsable", "CuidadosBásicos", "PerrosFelices", "GatosAdorables", "SaludAnimal",
  "EntrenamientoCanino", "Alimentación", "RescateAnimal", "Esterilización", "Vacunación",
];

export default function CreatePostModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";
  const isShelter = user?.accountType === "shelter";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [postType, setPostType] = useState("");
  const [showPostTypes, setShowPostTypes] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  if (!isOpen) return null;

  const availablePostTypes = isShelter
    ? [...postTypes, ...shelterPostTypes]
    : postTypes;

  const addTag = (tag) => {
    const cleanTag = tag.trim().replace(/^#/, "");
    if (cleanTag && !tags.includes(cleanTag) && tags.length < 10) {
      setTags([...tags, cleanTag]);
    }
    setTagInput("");
    setShowTagSuggestions(false);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const getFilteredTagSuggestions = () => {
    if (!tagInput.trim()) return [];
    const search = tagInput.toLowerCase().replace(/^#/, "");
    return suggestedTags.filter(
      (tag) => tag.toLowerCase().includes(search) && !tags.includes(tag)
    );
  };

  const selectedPostType = availablePostTypes.find((t) => t.id === postType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-overlay">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDark ? "bg-dark-card border border-dark-border" : "bg-white"
        } animate-modal-content`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${
          isDark ? "border-dark-border" : "border-gray-100"
        }`}>
          <div>
            <h2 className={`text-xl font-bold font-display ${
              isDark ? "text-dark-text" : "text-gray-900"
            }`}>
              Crear Publicación
            </h2>
            <p className={`text-sm mt-0.5 ${
              isDark ? "text-dark-text-secondary" : "text-gray-500"
            }`}>
              {isShelter ? "Publica como refugio" : "Comparte con la comunidad"}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all ${
              isDark
                ? "text-dark-text-secondary hover:text-dark-text hover:bg-white/5"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Post Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Tipo de publicación
            </label>
            <div className="relative">
              <button
                onClick={() => setShowPostTypes(!showPostTypes)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isDark
                    ? "bg-[#15151f] border border-dark-border text-dark-text hover:border-rose-500/30"
                    : "bg-gray-50 border border-gray-200 text-gray-700 hover:border-rose-300"
                }`}
              >
                {selectedPostType ? (
                  <>
                    <span className="text-lg">{selectedPostType.icon}</span>
                    <div className="text-left">
                      <p className="font-medium">{selectedPostType.label}</p>
                      <p className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-gray-500"}`}>
                        {selectedPostType.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <span className={isDark ? "text-dark-text-secondary" : "text-gray-400"}>
                    Selecciona un tipo de publicación
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showPostTypes ? "rotate-180" : ""} ${
                  isDark ? "text-dark-text-secondary" : "text-gray-400"
                }`} />
              </button>

              {showPostTypes && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl z-10 overflow-hidden ${
                  isDark ? "bg-dark-card border border-dark-border" : "bg-white border border-gray-100"
                }`}>
                  {availablePostTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => { setPostType(type.id); setShowPostTypes(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                        postType === type.id
                          ? isDark
                            ? "bg-rose-500/10 text-rose-300"
                            : "bg-rose-50 text-rose-700"
                          : isDark
                          ? "text-dark-text-secondary hover:bg-white/5"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{type.label}</p>
                        <p className={`text-xs ${isDark ? "text-dark-text-secondary" : "text-gray-500"}`}>
                          {type.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe un título descriptivo..."
              className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                isDark
                  ? "bg-[#15151f] border border-dark-border text-dark-text placeholder-dark-text-secondary"
                  : "bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400"
              }`}
            />
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Categoría *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${
                isDark
                  ? "bg-[#15151f] border border-dark-border text-dark-text"
                  : "bg-gray-50 border border-gray-200 text-gray-700"
              }`}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Contenido *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              placeholder="Comparte tu experiencia, pregunta o consejo..."
              className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none ${
                isDark
                  ? "bg-[#15151f] border border-dark-border text-dark-text placeholder-dark-text-secondary"
                  : "bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400"
              }`}
            />
            {/* AI Similar Posts Detection - AI Ready */}
            {content.length > 50 && (
              <div className={`mt-2 p-3 rounded-xl ${
                isDark
                  ? "bg-violet-500/10 border border-violet-500/20"
                  : "bg-violet-50 border border-violet-100"
              }`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-4 h-4 mt-0.5 ${
                    isDark ? "text-violet-300" : "text-violet-600"
                  }`} />
                  <div>
                    <p className={`text-xs font-medium ${
                      isDark ? "text-violet-300" : "text-violet-700"
                    }`}>
                      Publicaciones similares encontradas
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      isDark ? "text-dark-text-secondary" : "text-gray-500"
                    }`}>
                      Puede que tu pregunta ya haya sido respondida. Revisa estas publicaciones relacionadas antes de publicar.
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? "bg-violet-500/15 text-violet-300" : "bg-violet-100 text-violet-600"
                      }`}>
                        ¿Cómo ayudar a mi perro con ansiedad?
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isDark ? "bg-violet-500/15 text-violet-300" : "bg-violet-100 text-violet-600"
                      }`}>
                        Consejos para cachorros
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Etiquetas
              <span className={`text-xs ml-2 ${isDark ? "text-dark-text-secondary" : "text-gray-400"}`}>
                ({tags.length}/10)
              </span>
            </label>
            <div className="relative">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                isDark
                  ? "bg-[#15151f] border border-dark-border"
                  : "bg-gray-50 border border-gray-200"
              }`}>
                <Hash className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-gray-400"}`} />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag(tagInput);
                    }
                  }}
                  placeholder="Añade etiquetas (Enter para añadir)"
                  className={`flex-1 bg-transparent text-sm focus:outline-none ${
                    isDark
                      ? "text-dark-text placeholder-dark-text-secondary"
                      : "text-gray-700 placeholder-gray-400"
                  }`}
                />
                {/* AI Tag Suggestion - AI Ready */}
                <button
                  onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isDark
                      ? "text-violet-400 hover:bg-violet-500/15"
                      : "text-violet-500 hover:bg-violet-50"
                  }`}
                  title="Sugerir etiquetas con IA"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Suggestions */}
              {showTagSuggestions && tagInput.trim() && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl z-10 overflow-hidden ${
                  isDark ? "bg-dark-card border border-dark-border" : "bg-white border border-gray-100"
                }`}>
                  {getFilteredTagSuggestions().length > 0 ? (
                    getFilteredTagSuggestions().slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-all ${
                          isDark
                            ? "text-dark-text-secondary hover:bg-white/5"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Hash className="w-3 h-3" />
                        {tag}
                      </button>
                    ))
                  ) : (
                    <p className={`px-4 py-2.5 text-sm ${
                      isDark ? "text-dark-text-secondary" : "text-gray-500"
                    }`}>
                      Sin sugerencias
                    </p>
                  )}
                </div>
              )}

              {/* AI Tag Suggestions Panel */}
              {showAiSuggestions && (
                <div className={`mt-2 p-3 rounded-xl ${
                  isDark
                    ? "bg-violet-500/10 border border-violet-500/20"
                    : "bg-violet-50 border border-violet-100"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${isDark ? "text-violet-300" : "text-violet-600"}`} />
                    <span className={`text-xs font-medium ${isDark ? "text-violet-300" : "text-violet-700"}`}>
                      Etiquetas sugeridas por IA
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["AnsiedadCanina", "CuidadoEmocional", "ConsejosVeterinarios", "PerrosFelices"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => addTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                            tags.includes(tag)
                              ? "bg-rose-500 text-white"
                              : isDark
                              ? "bg-white/5 text-dark-text-secondary hover:bg-rose-500/20 hover:text-rose-300"
                              : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-700"
                          }`}
                        >
                          #{tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Added Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm ${
                      isDark
                        ? "bg-rose-500/15 text-rose-300"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-rose-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Imágenes
              <span className={`text-xs ml-2 ${isDark ? "text-dark-text-secondary" : "text-gray-400"}`}>
                (Máx. 5)
              </span>
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                isDark
                  ? "border-dark-border hover:border-rose-500/30 bg-transparent"
                  : "border-gray-200 hover:border-rose-300 bg-gray-50/50"
              }`}
            >
              <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${
                isDark ? "text-dark-text-secondary" : "text-gray-400"
              }`} />
              <p className={`text-sm font-medium ${
                isDark ? "text-dark-text" : "text-gray-700"
              }`}>
                Arrastra tus imágenes aquí
              </p>
              <p className={`text-xs mt-1 ${
                isDark ? "text-dark-text-secondary" : "text-gray-500"
              }`}>
                o haz clic para seleccionar archivos
              </p>
            </div>
          </div>

          {/* Location - Optional */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? "text-dark-text" : "text-gray-700"
            }`}>
              Ubicación
              <span className={`text-xs ml-2 ${isDark ? "text-dark-text-secondary" : "text-gray-400"}`}>
                (opcional)
              </span>
            </label>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
              isDark
                ? "bg-[#15151f] border border-dark-border"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <MapPin className={`w-4 h-4 ${isDark ? "text-dark-text-secondary" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Ciudad o ubicación"
                className={`flex-1 bg-transparent text-sm focus:outline-none ${
                  isDark
                    ? "text-dark-text placeholder-dark-text-secondary"
                    : "text-gray-700 placeholder-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-5 border-t ${
          isDark ? "border-dark-border" : "border-gray-100"
        }`}>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-xs ${
              isDark ? "text-dark-text-secondary" : "text-gray-500"
            }`}>
              <Eye className="w-3 h-3" />
              Visible para todos
            </div>
            {isShelter && (
              <div className={`flex items-center gap-1 text-xs ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}>
                <Shield className="w-3 h-3" />
                Publicando como Refugio
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isDark
                  ? "text-dark-text-secondary hover:text-dark-text hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Cancelar
            </button>
            <button
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg ${
                title && content && category
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                  : "bg-gray-300 cursor-not-allowed dark:bg-dark-border"
              }`}
              disabled={!title || !content || !category}
            >
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
