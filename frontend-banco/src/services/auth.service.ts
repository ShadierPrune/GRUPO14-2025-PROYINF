const API_URL = "http://localhost:4000/auth";

export async function loginService(rut: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // cookies
    body: JSON.stringify({ rut, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return await res.json(); // { user, token? }
}

export async function registerService(data: {
  name: string;
  rut: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrar");
  }

  return await res.json();
}

export async function checkSessionService() {
  const res = await fetch(`${API_URL}/protected`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Sesión no válida");
  return await res.json();
}

export async function logoutService() {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
