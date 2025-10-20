import React from "react";
import { ChevronDownIcon, UserCircleIcon } from "lucide-react";

const Header: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-yellow-500">
              MiBanco
            </a>
          </div>

          {/* Navegación Principal */}
          <nav className="hidden md:flex md:space-x-8">
            <a
              href="#"
              className="font-semibold text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Mis Créditos
            </a>
            <a
              href="#"
              className="font-semibold text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Solicitar Nuevo
            </a>
            <a
              href="#"
              className="font-semibold text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Ayuda
            </a>
          </nav>

          {/* Menú de Usuario */}
          <div className="flex items-center">
            <button className="flex items-center group">
              <UserCircleIcon
                className="h-7 w-7 text-gray-500 group-hover:text-yellow-600"
                strokeWidth={2}
              />
              <span className="hidden sm:inline ml-2 font-semibold text-gray-700 group-hover:text-yellow-700">
                {userName}
              </span>
              <ChevronDownIcon
                className="h-4 w-4 text-gray-400 group-hover:text-gray-600 ml-1"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
