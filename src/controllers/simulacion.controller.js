// controllers/simulacion.controller.js
import { callSimulacionAPI } from "../services/simulacion.service.js";

export const crearSimulacionProxy = (req, res) =>
  callSimulacionAPI(req, res, "/api/v1/simulacion", "POST");
