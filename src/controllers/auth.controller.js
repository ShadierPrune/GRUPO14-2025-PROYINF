// controllers/auth.controller.js
import { callAuthAPI } from "../services/auth.service.js";

export const loginProxy = (req, res) => callAuthAPI(req, res, "/login", "POST");
export const registerProxy = (req, res) =>
  callAuthAPI(req, res, "/register", "POST");
export const logoutProxy = (req, res) =>
  callAuthAPI(req, res, "/logout", "POST");
export const protectedProxy = (req, res) =>
  callAuthAPI(req, res, "/protected", "GET");
