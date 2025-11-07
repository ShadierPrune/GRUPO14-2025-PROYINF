import { createContext, useContext, useEffect, useState } from "react";
import {
  loginService,
  registerService,
  checkSessionService,
  logoutService,
} from "@/services/auth.service"; // ✅ CAMBIO AQUÍ

export interface User {
  id: string;
  name: string;
  email: string;
  rut: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (rut: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    rut: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const data = await checkSessionService();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (rut: string, password: string) => {
    const data = await loginService(rut, password);
    setUser(data.user);
  };

  const register = async (data: {
    name: string;
    rut: string;
    email: string;
    password: string;
  }) => {
    const res = await registerService(data);
    setUser(res.user);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        checkSession,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ✅ Exporta el hook directamente desde aquí si quieres:
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  return context;
}
