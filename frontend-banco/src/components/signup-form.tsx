import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        name: `${nombre} ${apellidos}`,
        rut,
        email: "", // puedes dejarlo vacío si tu API no lo requiere
        password,
      });

      navigate("/login"); // redirige al login después del registro
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6 max-w-sm mx-auto mt-10", className)}
      {...props}
    >
      <FieldGroup>
        {/* --- Título --- */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Regístrate para comenzar a usar tu cuenta
          </p>
        </div>

        {/* --- Campo Nombre --- */}
        <Field>
          <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Juan"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Field>

        {/* --- Campo Apellidos --- */}
        <Field>
          <FieldLabel htmlFor="apellidos">Apellidos</FieldLabel>
          <Input
            id="apellidos"
            name="apellidos"
            type="text"
            placeholder="Ej: Pérez González"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </Field>

        {/* --- Campo RUT --- */}
        <Field>
          <FieldLabel htmlFor="rut">RUT</FieldLabel>
          <Input
            id="rut"
            name="rut"
            type="text"
            placeholder="12345678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
          <FieldDescription>Ejemplo: 12345678-9</FieldDescription>
        </Field>

        {/* --- Campo Contraseña --- */}
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Crea una contraseña segura"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FieldDescription>
            Usa al menos 8 caracteres (mayúsculas, minúsculas, simbolo y número)
          </FieldDescription>
        </Field>

        {/* --- Mensaje de error --- */}
        {error && (
          <p className="text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        {/* --- Botón de registro --- */}
        <Field>
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </Field>

        {/* --- Link a login --- */}
        <FieldDescription className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="underline underline-offset-4 text-yellow-600 hover:text-yellow-700"
          >
            Inicia sesión
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
