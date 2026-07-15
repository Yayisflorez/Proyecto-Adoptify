import React, { useState } from "react";
import { MessageSquare, Heart, ThumbsUp, MessageCircle, Share2, Plus, Search, ChevronDown, User, Clock, Send, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ShelterForum() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" });
  const [searchTerm, setSearchTerm] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1, title: "Tips para la adopción responsable", content: "Comparto algunas recomendaciones importantes para quienes están considerando adoptar una mascota...", category: "consejos", author: user?.name || "Refugio", authorRole: "refugio", likes: 24, comments: 8, time: "hace 2 horas", liked: false,
    },
    {
      id: 2, title: "Presentación: Nuevos cachorros en el refugio", content: "¡Tenemos nuevos huéspedes! Llegaron 3 cachorritos que están listos para encontrar un hogar...", category: "novedades", author: user?.name || "Refugio", authorRole: "refugio", likes: 45, comments: 12, time: "hace 5 horas", liked: true,
    },
    {
      id: 3, title: "¿Cómo preparar tu hogar para un gato?", content: "Si estás pensando en adoptar un gato, aquí te cuento los aspectos básicos que debes considerar...", category: "consejos", author: user?.name || "Refugio", authorRole: "refugio", likes: 18, comments: 5, time: "hace 1 día", liked: false,
    },
    {
      id: 4, title: "Gracias por las donaciones recibidas", content: "Queremos agradecer a todos los que donaron alimentos y accesorios para nuestros animalitos...", category: "agradecimientos", author: user?.name || "Refugio", authorRole: "refugio", likes: 67, comments: 15, time: "hace 2 días", liked: false,
    },
  ]);

  const categories = [
    { id: "general", label: "General", color: "bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400" },
    { id: "consejos", label: "Consejos", color: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
    { id: "novedades", label: "Novedades", color: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400" },
    { id: "agradecimientos", label: "Agradecimientos", color: "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400" },
  ];

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryStyle = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.color : categories[0].color;
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      ...newPost,
      author: user?.name || "Refugio",
      authorRole: "refugio",
      likes: 0,
      comments: 0,
      time: "justo ahora",
      liked: false,
    };
    setPosts([newPostObj, ...posts]);
    setShowCreateModal(false);
    setNewPost({ title: "", content: "", category: "general" });
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400 rounded-full text-sm font-medium mb-3">
              <MessageSquare className="w-4 h-4" />
              <span>Foro del Refugio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-display">Foro</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary mt-1">Comparte información y mantente en contacto con la comunidad</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-200 dark:shadow-violet-500/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Publicación
          </button>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar en el foro..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white" />
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-dark-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {post.author.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 dark:text-dark-text-secondary">{post.author}</span>
                        {post.authorRole === "refugio" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium">
                            <Building2 className="w-3 h-3" />
                            Refugio
                          </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-dark-text-secondary">•</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(post.category)}`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-dark-text-secondary">•</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-dark-text-secondary">
                          <Clock className="w-3 h-3" />
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-dark-border">
                    <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-sm transition-all ${post.liked ? 'text-violet-600 dark:text-violet-400' : 'text-gray-500 dark:text-dark-text-secondary hover:text-violet-600 dark:hover:text-violet-400'}`}>
                      <ThumbsUp className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-text-secondary hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl max-w-lg w-full p-6 animate-modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-violet-500" />
                Nueva Publicación
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input type="text" required value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-violet-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white" placeholder="Título de la publicación" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                <select value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-violet-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contenido</label>
                <textarea rows={5} required value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:ring-2 focus:ring-violet-500 bg-white dark:bg-dark-bg text-gray-900 dark:text-white resize-none" placeholder="Escribe tu publicación..." />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
