import jwt from "jsonwebtoken";

export const jwtHandler = (req, res, next) => {
  const token = req.cookies?.access_token; // si usas cookie
  // o también puedes permitir header:
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.split(" ")[1];
  const finalToken = token || headerToken;

  if (!finalToken) {
    return res.status(401).json({ message: "Token no encontrado" });
  }

  try {
    const data = jwt.verify(finalToken, process.env.SECRET_JWT_KEY);
    req.user = data; // guardas el usuario en el request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
