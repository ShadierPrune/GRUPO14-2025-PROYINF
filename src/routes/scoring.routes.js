import express from "express";
import { obtenerScoringPorRut } from "../../scoringService.js";

const router = express.Router();

router.get("/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const resultado = await obtenerScoringPorRut(rut);

    if (!resultado) {
      return res
        .status(404)
        .json({ error: "RUT no encontrado en el sistema financiero." });
    }

    res.json(resultado);
  } catch (err) {
    console.error("Error en API scoring:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
