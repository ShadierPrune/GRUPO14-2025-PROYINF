import { createContext, useContext, useState } from "react";

interface Simulation {
  monto: number;
  plazo: number;
  taza: number;
}

interface SimuladorContextType {
  simulacion: Simulation | null;
  setSimulacion: (data: Simulation) => void;
}

const SimuladorContext = createContext<SimuladorContextType>({
  simulacion: null,
  setSimulacion: () => {},
});

export function SimuladorProvider({ children }: { children: React.ReactNode }) {
  const [simulacion, setSimulacion] = useState<Simulation | null>(null);
  return (
    <SimuladorContext.Provider value={{ simulacion, setSimulacion }}>
      {children}
    </SimuladorContext.Provider>
  );
}

export const useSimulador = () => useContext(SimuladorContext);
