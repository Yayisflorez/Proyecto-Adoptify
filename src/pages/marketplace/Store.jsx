import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Filter, Heart, ShoppingCart, Star, ChevronDown, X, Minus, Plus, Trash2 } from "lucide-react";

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const categories = ["all", "Alimentos", "Accesorios", "Juguetes", "Salud", "Higiene"];

  const products = [
    {
      id: 1,
      name: "Collar Premium Ajustable",
      category: "Accesorios",
      price: 100.00,
      rating: 4.8,
      reviews: 124,
      description: "Collar de cuero sintético de alta calidad, ajustable y duradero",
      image: null
    },
    {
      id: 2,
      name: "Recipiente de Comida Anti-vuelco",
      category: "Alimentos",
      price: 45.00,
      rating: 4.6,
      reviews: 89,
      description: "Bowl de acero inoxidable con base antideslizante",
      image: null
    },
    {
      id: 3,
      name: "Juguete Interactivo Peluche",
      category: "Juguetes",
      price: 35.00,
      rating: 4.9,
      reviews: 156,
      description: "Peluche con sonido y relleno resistente para mordisquear",
      image: null
    },
    {
      id: 4,
      name: "Correa Retráctil 5m",
      category: "Accesorios",
      price: 55.00,
      rating: 4.7,
      reviews: 203,
      description: "Correa retráctil con freno de seguridad y agarre ergonómico",
      image: null
    },
    {
      id: 5,
      name: "Alimento Premium Perro Adulto",
      category: "Alimentos",
      price: 85.00,
      rating: 4.8,
      reviews: 312,
      description: "Alimento balanceado con proteínas de alta calidad",
      image: null
    },
    {
      id: 6,
      name: "Cama Ortopédica Grande",
      category: "Accesorios",
      price: 120.00,
      rating: 4.9,
      reviews: 87,
      description: "Cama con memoria foam para mayor confort de tu mascota",
      image: null
    },
    {
      id: 7,
      name: "Shampoo Hipoalergénico",
      category: "Higiene",
      price: 28.00,
      rating: 4.5,
      reviews: 145,
      description: "Shampoo suave para pieles sensibles, sin fragancias agresivas",
      image: null
    },
    {
      id: 8,
      name: "Kit de Cepillo y Peine",
      category: "Higiene",
      price: 32.00,
      rating: 4.6,
      reviews: 98,
      description: "Set de cepillo y peine para el cuidado del pelaje",
      image: null
    },
    {
      id: 9,
      name: "Suplemento Vitaminas",
      category: "Salud",
      price: 42.00,
      rating: 4.7,
      reviews: 67,
      description: "Multivitamínico para fortalecer el sistema inmunológico",
      image: null
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 font-display">
              Tienda Online
            </h1>
            <p className="text-xl text-gray-600">
              Todo lo que tu mascota necesita en un solo lugar
            </p>
          </div>
          <button className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
            <ShoppingCart className="w-5 h-5" />
            Carrito
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-rose-600 rounded-full text-sm font-bold flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
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
            Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> productos
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-rose-200 to-amber-200 flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-rose-400" />
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} 
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews} reseñas)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-600 font-display">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold rounded-full hover:from-rose-600 hover:to-amber-600 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
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

        {/* Cart Modal */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 font-display">Carrito</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-200 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-6 h-6 text-rose-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-rose-600 font-display">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Total</span>
                <span className="text-2xl font-bold text-rose-600 font-display">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all">
                <ShoppingCart className="w-5 h-5" />
                Proceder al pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
