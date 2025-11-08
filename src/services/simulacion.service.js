// services/simulacion.service.js
import axios from "axios";

// Dirección del microservicio (definida en tu .env o docker-compose)
const SIMULACION_URL =
  process.env.SIMULACION_URL || "http://api-simulacion:4002";

export async function callSimulacionAPI(req, res, path, method = "POST") {
  try {
    const url = `${SIMULACION_URL}${path}`;

    const config = {
      method,
      url,
      data: req.body,
      validateStatus: () => true, // permite reenviar errores sin romper
    };

    const response = await axios(config);

    // Devuelve la respuesta tal cual la entrega api-simulacion
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      `❌ Error al comunicar con api-simulacion (${path}):`,
      error.message
    );
    res.status(500).json({
      error: "Error comunicando con el microservicio de simulación",
    });
  }
}
