// services/auth.service.js
import axios from "axios";

const AUTH_URL = process.env.AUTH_URL || "http://api-auth:4001";

export async function callAuthAPI(req, res, path, method = "GET") {
  try {
    const url = `${AUTH_URL}/auth${path}`;
    const config = {
      method,
      url,
      data: req.body,
      headers: { cookie: req.headers.cookie }, // si manejas sesiones o JWT en cookies
      validateStatus: () => true, // permite reenviar códigos de error del microservicio
    };

    const response = await axios(config);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      `❌ Error al comunicar con api-auth (${path}):`,
      error.message
    );
    res
      .status(500)
      .json({
        error: "Error comunicando con el microservicio de autenticación",
      });
  }
}
