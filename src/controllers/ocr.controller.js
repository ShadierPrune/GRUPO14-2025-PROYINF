// controllers/ocr.controller.js
import { callOcrAPI } from "../services/ocr.service.js";

export const procesarImagenProxy = (req, res) =>
  callOcrAPI(req, res, "/upload", "POST");
