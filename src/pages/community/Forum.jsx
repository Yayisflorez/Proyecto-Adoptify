import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Search, Plus, ThumbsUp, MessageCircle, Share2, User, Clock, Filter, ChevronDown, Heart, Bookmark, Send, X } from "lucide-react";

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const categories = ["all", "Cuidado", "Entrenamiento", "Salud", "Nutrición", "Historias", "Consejos"];

  const posts = [
    {
      id: 1,
      title: "¿Cómo ayudar a mi perro con ansiedad por separación?",
      author: "María García",
      authorAvatar: null,
      category: "Cuidado",
      content: "Mi perro Max de 2 años tiene mucha ansiedad cuando me voy a trabajar. He intentado varias cosas pero nada parece funcionar. ¿Alguien tiene consejos?",
      likes: 45,
      replies: 23,
      views: 312,
      time: "hace 2 horas",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Mejor alimento para cachorros de raza grande",
      author: "Carlos Rodríguez",
      authorAvatar: null,
      category: "Nutrición",
      content: "Acabo de adoptar un Golden Retriever de 3 meses y quiero asegurarme de darle la mejor nutrición. ¿Qué marcas recomiendan?",
      likes: 32,
      replies: 15,
      views: 189,
      time: "hace 5 horas",
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 3,
      title: "Experiencia con adopción de gatos adultos",
      author: "Ana López",
      authorAvatar: null,
      category: "Historias",
      content: "Comparto mi experiencia adoptando a Luna, una gata de 4 años. Ha sido maravilloso ver cómo se ha adaptado a su nuevo hogar.",
      likes: 67,
      replies: 31,
      views: 456,
      time: "hace 1 día",
      isLiked: false,
      isBookmarked: true
    },
    {
      id: 4,
      title: "Tips para entrenar a un cachorro Beagle",
      author: "Pedro Martínez",
      authorAvatar: null,
      category: "Entrenamiento",
      content: "Los Beagles son muy inteligentes pero también tercos. Comparto algunos tips que me funcionaron con mi Rocky.",
      likes: 89,
      replies: 42,
      views: 623,
      time: "hace 2 días",
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 5,
      title: "Signos de que mi mascota necesita ir al veterinario",
      author: "Laura Sánchez",
      authorAvatar: null,
      category: "Salud",
      content: "¿Cuáles son las señales de alerta que debo tener en cuenta para saber si mi mascota necesita atención veterinaria urgente?",
      likes: 54,
      replies: 28,
      views: 389,
      time: "hace 3 días",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 6,
      title: "Mi gato no quiere usar la caja de arena",
      author: "Diego Torres",
      authorAvatar: null,
      category: "Consejos",
      content: "Mi gato de 6 meses ha dejado de usar su caja de arena. He limpiado la caja, cambiado la arena, pero sigue haciéndolo fuera. ¿Qué puedo hacer?",
      likes: 38,
      replies: 19,
      views: 267,
      time: "hace 4 días",
      isLiked: false,
      isBookmarked: false
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id) => {
    // Simular toggle de like
  };

  const toggleBookmark = (id) => {
    // Simular toggle de bookmark
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 font-display">
              Comunidad
            </h1>
            <p className="text-xl text-gray-600">
              Comparte experiencias, haz preguntas y conecta con otros amantes de los animales
            </p>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nueva Publicación
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en el foro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
            >
              <Filter className="w-4 h-4" />
              Categorías
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "Todas" : category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-gray-900">{filteredPosts.length}</span> publicaciones
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-display hover:text-rose-600 cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 text-sm ${
                          post.isLiked ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? "fill-rose-500" : ""}`} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies}
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500">
                        <MessageSquare className="w-4 h-4" />
                        {post.views}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-lg ${
                          post.isBookmarked ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-amber-500" : ""}`} />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron publicaciones</h3>
            <p className="text-gray-600 mb-4">Intenta con otros filtros o términos de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-display">Nueva Publicación</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Escribe un título descriptivo..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500">
                  {categories.filter(cat => cat !== "all").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  placeholder="Comparte tu experiencia, pregunta o consejo..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
                  <Send className="w-4 h-4" />
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
