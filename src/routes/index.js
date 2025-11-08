import express from "express";
import authRoutes from "./auth.routes.js";
import simulacionRoutes from "./simulacion.routes.js";
import ocrRoutes from "./ocr.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/simulacion", simulacionRoutes);
router.use("/ocr", ocrRoutes);
export default router;
