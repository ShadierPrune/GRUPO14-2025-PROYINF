import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use((req, res, next) => {
  console.log("➡️ Petición recibida en api principal:", req.method, req.url);
  next();
});

app.use(express.json());
app.use("/api", routes);

export default app;
