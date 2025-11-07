import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // o "@/hooks/useAuth"
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
