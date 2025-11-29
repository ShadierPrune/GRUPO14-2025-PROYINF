// src/controllers/ocr.controller.js

import { procesarImagenOCR } from "../services/ocr.service.js";
import path from "path";

export const mostrarFormularioOCR = (req, res) => {
  res.sendFile(path.resolve("src/ocr/formulario.html"));
};

export const procesarImagenProxy = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se envió ninguna imagen" });
    }

    const resultado = await procesarImagenOCR(req.file);

    res.json({
      mensaje: "Procesado por OCR",
      resultado,
    });
  } catch (error) {
    console.error("Error en controller OCR:", error);
    res.status(500).json({ error: "Error interno procesando OCR" });
  }
};
