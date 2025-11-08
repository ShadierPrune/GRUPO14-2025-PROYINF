// services/ocr.service.js
import axios from "axios";

const OCR_URL = process.env.OCR_URL || "http://api-ocr:3000";

export async function callOcrAPI(req, res, path, method = "POST") {
  try {
    const url = `${OCR_URL}${path}`;
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    // Convertimos el buffer a base64, como hace tu microservicio
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;
    const encodedImage = fileBuffer.toString("base64");

    // Llamada HTTP al microservicio OCR
    const response = await axios.post(
      url,
      {
        imagenCedula: encodedImage,
        mimeType,
      },
      { validateStatus: () => true }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      `❌ Error al comunicar con api-ocr (${path}):`,
      error.message
    );
    res.status(500).json({
      error: "Error comunicando con el microservicio de OCR",
    });
  }
}
