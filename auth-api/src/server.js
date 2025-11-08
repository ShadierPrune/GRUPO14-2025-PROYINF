import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.AUTH_PORT || 4000;

app.listen(PORT, () => {
  console.log("API auth corriendo en puerto: ", PORT);
});
