import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Simulador from "../pages/Simulador";
import Contrato from "../pages/Contrato";
import Form from "../pages/Form";

export function AppRouter() {
  return (
    <Routes>
      {/* rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/simulador" element={<Simulador />} />
      <Route path="/form" element={<Form />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/contrato"
        element={<Contrato onBack={() => {}} onSubmit={() => {}} />}
      />
    </Routes>
  );
}
