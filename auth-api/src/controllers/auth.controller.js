import { UserRepository } from "../models/user-repository.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const { rut, password } = req.body;

    if (!rut || !password) {
      throw { status: 400, message: "Faltan campos obligatorios" };
    }

    const id = await UserRepository.create({ rut, password });

    res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log("🎯 Entró al controlador login");
  try {
    const user = await UserRepository.login(req.body);
    const token = jwt.sign(
      { _id: user._id, rut: user.rut }, // 👈 Payload personalizado
      process.env.SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false, // true en producción con HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      user: { rut: user.rut },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token").json({ message: "Logout succesful" });
};

export const protectedRoute = (req, res) => {
  // si el middleware jwtHandler lo verificó, req.user ya existe
  if (!req.user) {
    return res
      .status(403)
      .json({ message: "Acceso denegado: token no válido o ausente" });
  }

  res.status(200).json({
    message: "Acceso concedido",
    user: req.user,
  });
};
