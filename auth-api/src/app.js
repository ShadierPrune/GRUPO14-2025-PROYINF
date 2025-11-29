import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { jwtHandler } from "./middlewares/jwt.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // ✅ ambos puertos permitidos
    credentials: true, // ✅ importante si usas cookies o sesiones
  })
);

app.use((req, res, next) => {
  console.log("➡️ Petición recibida:", req.method, req.url);
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/auth", routes);
app.use(jwtHandler);

app.use(errorHandler);

export default app;
