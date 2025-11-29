import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // 👈 importa tu contexto

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // 👈 accedemos al contexto

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* 🔹 Logo / Marca */}
        <div className="flex items-center gap-2">
          <a href="/" className="text-2xl font-extrabold text-slate-900">
            Crédito<span className="text-yellow-500">Bank</span>
          </a>
        </div>

        {/* 🔹 Navegación principal */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-yellow-600 transition">
            Inicio
          </a>
          <a href="/simulador" className="hover:text-yellow-600 transition">
            Simulador
          </a>
          {isAuthenticated && (
            <a href="/form" className="hover:text-yellow-600 transition">
              Solicitudes
            </a>
          )}
        </nav>

        {/* 🔹 Acciones de usuario */}
        <div className="flex items-center gap-3 relative">
          {/* 🟡 Si el usuario está autenticado */}
          {isAuthenticated ? (
            <>
              {/* Avatar simple */}
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                title="Mi cuenta"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>

              {/* Menú desplegable */}
              {open && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg text-sm animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">
                      {user?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            // 🟣 Si no está autenticado → mostrar botones
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-yellow-600"
              >
                Iniciar sesión
              </a>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                asChild
              >
                <a href="/register">Registrarse</a>
              </Button>
            </div>
          )}

          {/* Menú hamburguesa móvil */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            title="Menú"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
