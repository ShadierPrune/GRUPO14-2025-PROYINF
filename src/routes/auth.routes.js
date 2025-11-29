// routes/auth.routes.js
import express from "express";
import {
  loginProxy,
  registerProxy,
  logoutProxy,
  protectedProxy,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginProxy);
router.post("/register", registerProxy);
router.post("/logout", logoutProxy);
router.get("/protected", protectedProxy);

export default router;
