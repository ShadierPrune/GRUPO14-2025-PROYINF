import express from "express";
import {
  register,
  login,
  logout,
  protectedRoute,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ hola: "<h1>Hola mundo</h1>" });
});
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/protected", protectedRoute);
export default router;
