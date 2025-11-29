import express from "express";
import multer from "multer";
import { procesarImagenProxy } from "../controllers/ocr.controller.js";

const router = express.Router();

// Multer usa almacenamiento en memoria (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta POST /api/v1/ocr/upload
router.post("/upload", upload.single("imagenCedula"), procesarImagenProxy);

export default router;
