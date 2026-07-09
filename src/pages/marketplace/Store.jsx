import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  ChevronDown,
  X,
  Sparkles,
  Package,
  Tag,
  ArrowRight,
  Award,
  CheckCircle,
  ArrowLeft,
  Store as StoreIcon,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import {
  products as allProducts,
  categoryIcons,
  categoryColors,
  categories,
  shelters,
  getShelterById,
  getProductsByShelter,
} from "../../data/products";

export default function Store() {
  const { shelterId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const { addToCart, cartCount } = useCart();
  const { storeFavorites, toggleStoreFavorite, isStoreFavorite } = useFavorites();

  const shelter = shelterId ? getShelterById(shelterId) : null;

  // Base products: if shelterId is present, filter by shelter
  const baseProducts = shelter ? getProductsByShelter(shelterId) : allProducts;

  const filteredProducts = baseProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const ShelterIcon = shelter?.icon || StoreIcon;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 dark:from-rose-500/5 dark:via-amber-500/5 dark:to-rose-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {shelter && (
            <Link
              to={`/shelter/${shelter.id}`}
              className="inline-flex items-center gap-2 text-gray-400 dark:text-dark-text-secondary hover:text-rose-500 dark:hover:text-rose-400 mb-6 transition-all duration-200 group text-sm font-medium"
            >
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center justify-center group-hover:border-rose-300 dark:group-hover:border-rose-700 group-hover:shadow-md group-hover:-translate-x-0.5 transition-all duration-200">
                <ArrowLeft className="w-4 h-4" />
              </div>
              Volver al Refugio
            </Link>
          )}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              {shelter ? (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/10 to-amber-500/10 dark:from-rose-900/20 dark:to-amber-900/20 text-rose-600 dark:text-rose-400 rounded-full text-sm font-semibold mb-4 border border-rose-200/50 dark:border-rose-800/30">
                    <StoreIcon className="w-4 h-4" />
                    Tienda del Refugio
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text mb-4 font-display leading-tight">
                    Tienda{" "}
                    <span
                      className={`bg-gradient-to-r ${shelter.color} bg-clip-text text-transparent`}
                    >
                      {shelter.name}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-6 max-w-xl">
                    {shelter.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                    <Link
                      to="/store"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary border-2 border-gray-200 dark:border-dark-border font-semibold rounded-xl hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 transition-all"
                    >
                      <StoreIcon className="w-5 h-5" />
                      Ver Tienda General
                    </Link>
                    <Link
                      to="/cart"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-500/20"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ver Carrito
                      {cartCount > 0 && (
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-semibold mb-4">
                    <Sparkles className="w-4 h-4" />
                    ¡Envío gratis en compras mayores a $50!
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-dark-text mb-4 font-display leading-tight">
                    Tienda{" "}
                    <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                      Adoptify
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary mb-6 max-w-xl">
                    Todo lo que tu mascota necesita para ser feliz. Productos de alta
                    calidad con amor y cuidado.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                    <Link
                      to="/cart"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-500/20"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ver Carrito
                      {cartCount > 0 && (
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-dark-text-secondary">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>Envío rápido</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>Calidad premium</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="hidden lg:flex items-center justify-center w-72 h-72">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-64 h-64 bg-gradient-to-br from-rose-200 via-amber-100 to-rose-200 dark:from-rose-900/40 dark:via-amber-900/20 dark:to-rose-900/40 rounded-full flex items-center justify-center">
                  {shelter ? (
                    <ShelterIcon className="w-32 h-32 text-rose-400/60 dark:text-rose-500/40" />
                  ) : (
                    <ShoppingBag className="w-32 h-32 text-rose-400/60 dark:text-rose-500/40" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-36 py-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm dark:text-dark-text dark:placeholder-dark-text-secondary"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Categorías</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Shelter Pills - show when in general store */}
          {!shelter && showFilters && (
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg dark:shadow-dark-border/20 p-6 border border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <StoreIcon className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                  Tiendas de Refugios
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {shelters.map((s) => {
                  const SIcon = s.icon || StoreIcon;
                  return (
                    <Link
                      key={s.id}
                      to={`/shelter-store/${s.id}`}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl hover:bg-gradient-to-br hover:from-rose-50 hover:to-amber-50 dark:hover:from-rose-900/10 dark:hover:to-amber-900/10 border border-gray-100 dark:border-dark-border hover:border-rose-200 dark:hover:border-rose-800 transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center flex-shrink-0`}>
                        <SIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {s.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-dark-text-secondary truncate">
                          {s.location}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Pills */}
          {showFilters && (
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg dark:shadow-dark-border/20 p-6 border border-gray-100 dark:border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
                  Categorías
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || Sparkles;
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-500/20"
                          : "bg-gray-50 dark:bg-dark-bg text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-border border border-gray-100 dark:border-dark-border"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-white" : "text-gray-400 dark:text-dark-text-secondary"
                        }`}
                      />
                      <span className="text-xs font-semibold">
                        {category === "all" ? "Todas" : category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results info */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              Mostrando{" "}
              <span className="font-semibold text-gray-900 dark:text-dark-text">
                {filteredProducts.length}
              </span>{" "}
              productos
              {shelter && (
                <span className="text-gray-400 dark:text-dark-text-secondary">
                  {" "}de {shelter.name}
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 dark:text-dark-text-secondary">
                {storeFavorites.length} favoritos
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const CatIcon = categoryIcons[product.category] || Package;
            const catColor = categoryColors[product.category] || "from-gray-400 to-gray-500";
            const isFav = isStoreFavorite(product.id);
            const justAdded = addedToCart[product.id];
            const isPremium = product.quality === "Premium";

            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-dark-card rounded-2xl shadow-lg dark:shadow-dark-border/20 overflow-hidden hover:shadow-xl dark:hover:shadow-dark-border/40 transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 dark:border-dark-border"
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-60 dark:opacity-40`}
                    />
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)'
                      }} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/30 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <CatIcon className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${catColor} text-white text-xs font-semibold rounded-full shadow-lg`}
                      >
                        <CatIcon className="w-3 h-3" />
                        {product.category}
                      </span>
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-3 right-12">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-full shadow-lg ${
                          isPremium
                            ? "bg-amber-400/90 text-amber-900"
                            : "bg-emerald-400/90 text-emerald-900"
                        }`}
                      >
                        {isPremium ? (
                          <Award className="w-2.5 h-2.5" />
                        ) : (
                          <CheckCircle className="w-2.5 h-2.5" />
                        )}
                        {product.quality}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleStoreFavorite(product);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isFav
                          ? "bg-rose-500 text-white scale-110"
                          : "bg-white/90 dark:bg-dark-card/90 text-gray-400 hover:bg-white dark:hover:bg-dark-card opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? "fill-white" : ""
                        }`}
                      />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3">
                      <div className="px-3 py-1.5 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-xl shadow-lg">
                        <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-display">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                  {/* Name */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-1.5 font-display line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating & Reviews Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-200 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-dark-text">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-dark-text-secondary">
                        ({product.reviews})
                      </span>
                    </div>
                    {/* Stock indicator */}
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      product.stock > 10
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                    }`}>
                      {product.stock > 10 ? "En stock" : `Quedan ${product.stock}`}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={justAdded}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        justAdded
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-200/50"
                          : "bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:from-rose-600 hover:to-amber-600 shadow-md shadow-rose-200/50 dark:shadow-rose-500/20 active:scale-[0.97]"
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            <path className="opacity-50" fill="currentColor" d="M16 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4z" />
                          </svg>
                          ¡Agregado!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Carrito
                        </>
                      )}
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary border-2 border-gray-200 dark:border-dark-border hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-all active:scale-[0.97]"
                    >
                      Ver más
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/product:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-rose-400 dark:text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
              {shelter
                ? `Este refugio aún no tiene productos en esta categoría.`
                : `Intenta con otros filtros o términos de búsqueda. ¡Tenemos muchos
              productos para tu mascota!`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-500/20"
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
