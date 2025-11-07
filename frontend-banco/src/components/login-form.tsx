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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(rut, password);
      navigate("/"); // redirige al home si el login es exitoso
    } catch (err: any) {
      setError(err.message || "RUT o contraseña incorrectos.");
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
          <h1 className="text-2xl font-bold text-gray-900">Inicia sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tu RUT y contraseña para acceder a tu cuenta
          </p>
        </div>

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

        {/* --- Campo contraseña --- */}
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FieldDescription>
            Debe tener por lo menos una mayuscula, numero y simbolo
          </FieldDescription>
        </Field>

        {/* --- Mensaje de error --- */}
        {error && (
          <p className="text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        {/* --- Botón login --- */}
        <Field>
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </Field>

        {/* --- Link registro --- */}
        <FieldDescription className="text-center">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="underline underline-offset-4 text-yellow-600 hover:text-yellow-700"
          >
            Regístrate
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
