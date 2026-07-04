import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Adoptify Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Conectando corazones solitarios con patitas que necesitan un hogar. Adopta con responsabilidad y amor.
            </p>
            <div className="flex space-x-4">
              {/* Twitter/X SVG */}
              <a href="#" aria-label="Twitter" className="hover:text-rose-400 transition-colors p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram SVG */}
              <a href="#" aria-label="Instagram" className="hover:text-rose-400 transition-colors p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Github SVG */}
              <a href="#" aria-label="Github" className="hover:text-rose-400 transition-colors p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/pets" className="hover:text-white transition-colors">Buscar Mascotas</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Cómo Funciona</Link>
              </li>
              <li>
                <Link to="/volunteers" className="hover:text-white transition-colors">Ser Voluntario</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Calle de las Patitas 123, Ciudad Mascota</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-rose-500 shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-rose-500 shrink-0" />
                <span>contacto@adoptify.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Boletín</h3>
            <p className="text-sm text-gray-400 mb-4">
              Suscríbete para recibir historias de éxito y alertas de nuevas mascotas en adopción.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Unirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Adoptify. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300">Privacidad</a>
            <a href="#" className="hover:text-gray-300">Términos</a>
            <a href="#" className="hover:text-gray-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
