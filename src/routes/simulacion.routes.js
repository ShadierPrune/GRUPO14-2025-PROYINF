import express from "express";
import { crearSimulacionProxy } from "../controllers/simulacion.controller.js";

const router = express.Router();

// Esta ruta recibirá POST /api/v1/simulacion
router.post("/", crearSimulacionProxy);

export default router;
