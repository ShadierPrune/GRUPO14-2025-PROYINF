import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.get("/scoring-check", (req, res) => {
  res.sendFile(path.resolve("scoring-frontend/index.html"));
});

router.get("/ocr", (req, res) => {
  res.sendFile(path.resolve("ocr-service/formulario.html"));
});

export default router;
