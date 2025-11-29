// src/services/ocr.service.js
import axios from "axios";
import FormData from "form-data";

const OCR_SERVICE_URL =
  process.env.OCR_SERVICE_URL || "http://ocr-service:4000";

export const procesarImagenOCR = async (file) => {
  const form = new FormData();

  form.append("imagenCedula", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  const response = await axios.post(`${OCR_SERVICE_URL}/process`, form, {
    headers: form.getHeaders(),
  });

  return response.data.resultado;
};
