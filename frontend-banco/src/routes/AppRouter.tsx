import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Simulador from "../pages/Simulador";
import Contrato from "../pages/Contrato";
import Form from "../pages/Form";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      {/* rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/simulador" element={<Simulador />} />

      {/* rutas protegidas */}
      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contrato"
        element={
          <ProtectedRoute>
            <Contrato
              onBack={function (): void {
                throw new Error("Function not implemented.");
              }}
              onSubmit={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
