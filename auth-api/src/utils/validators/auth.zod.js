// src/utils/validators/Validator.js
import { z } from "zod";

// ------------------ Funciones auxiliares ------------------
const limpiarRut = (rut) => rut.replace(/[.\s]/g, "").toUpperCase();

const calcularDV = (numeroSinDv) => {
  let suma = 0;
  let multiplicador = 2;
  for (let i = numeroSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(numeroSinDv[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return String(resto);
};

const formatearRut = (rutLimpio) => {
  const sinGuion = rutLimpio.replace("-", "");
  const cuerpo = sinGuion.slice(0, -1);
  const dv = sinGuion.slice(-1);
  return `${cuerpo}-${dv}`;
};

// ------------------ Esquemas base ------------------
const rutSchema = z
  .string()
  .nonempty("El RUT es requerido")
  .min(3, "RUT demasiado corto")
  .transform(limpiarRut)
  .refine((rut) => rut.includes("-"), {
    message:
      "El RUT debe incluir un guion antes del dígito verificador (ej: 12345678-9)",
  })
  .refine((rut) => /^[0-9]+-[0-9K]$/.test(rut), {
    message: "Formato de RUT inválido (usa 12345678-5 o 12345678-K)",
  })
  .refine(
    (rut) => {
      const [cuerpo, dv] = rut.split("-");
      if (!cuerpo || !dv) return false;
      if (!/^\d+$/.test(cuerpo)) return false;
      const dvOk = calcularDV(cuerpo);
      return dv === dvOk;
    },
    { message: "RUT inválido: dígito verificador no coincide" }
  )
  .transform((rut) => formatearRut(rut));

const passwordSchema = z
  .string()
  .nonempty("La contraseña es requerida")
  .min(8, "Debe tener al menos 8 caracteres")
  .max(64, "No debe superar 64 caracteres")
  .refine((v) => /[a-z]/.test(v), { message: "Debe incluir una minúscula" })
  .refine((v) => /[A-Z]/.test(v), { message: "Debe incluir una mayúscula" })
  .refine((v) => /\d/.test(v), { message: "Debe incluir un número" })
  .refine((v) => /[^A-Za-z0-9]/.test(v), {
    message: "Debe incluir un símbolo",
  });

// ------------------ Clase de validación ------------------
export class Validator {
  static rut(rut) {
    const parsed = rutSchema.safeParse(rut);
    if (parsed.success) return parsed.data;
    throw new Error(parsed.error.issues.map((i) => i.message).join(" | "));
  }

  static password(password) {
    const parsed = passwordSchema.safeParse(password);
    if (parsed.success) return parsed.data;
    throw new Error(parsed.error.issues.map((i) => i.message).join(" | "));
  }

  static register(data) {
    const schema = z.object({ rut: rutSchema, password: passwordSchema });
    const parsed = schema.safeParse(data);
    if (parsed.success) return parsed.data;
    throw new Error(parsed.error.issues.map((i) => i.message).join(" | "));
  }

  static login(data) {
    const schema = z.object({
      rut: rutSchema,
      password: z.string().nonempty("La contraseña es requerida"),
    });
    const parsed = schema.safeParse(data);
    if (parsed.success) return parsed.data;
    throw new Error(parsed.error.issues.map((i) => i.message).join(" | "));
  }
}
