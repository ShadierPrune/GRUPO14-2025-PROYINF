// src/repositories/user.repository.js
import DBlocal from "db-local";
import bcrypt from "bcrypt";
import { Validator } from "../utils/validators/auth.zod.js";

const { Schema } = new DBlocal({ path: "./bd" });

const User = Schema("User", {
  rut: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ rut, password }) {
    //Validar entrada con Zod
    const { rut: validRut, password: validPassword } = Validator.register({
      rut,
      password,
    });
    const user = User.findOne({ rut: validRut });
    if (user) throw new Error("Usuario ya existente");
    //Encriptar contraseña
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(validPassword, saltRounds);

    //Guardar usuario
    User.create({ rut: validRut, password: hash }).save();
    return { validRut };
  }

  static async login(data) {
    try {
      console.log("📥 Datos recibidos en login:", data);

      const { rut, password } = data;
      const user = await User.findOne({ rut });
      console.log("🔍 Usuario encontrado:", user ? user.rut : "no encontrado");

      if (!user) throw { status: 404, message: "Usuario no encontrado" };

      const match = await bcrypt.compare(password, user.password);
      console.log("🧩 Coincidencia contraseña:", match);

      if (!match) throw { status: 401, message: "Contraseña incorrecta" };

      const { password: _, ...publicUser } = user.toObject?.() ?? user;
      return publicUser;
    } catch (error) {
      console.error("❌ Error en UserRepository.login:", error);
      throw error;
    }
  }
}
