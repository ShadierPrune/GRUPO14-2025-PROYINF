import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Calendar,
  Percent,
  Info,
  TrendingUp,
  History,
} from "lucide-react";
import Header from "@/components/header";

const formatCurrencyCLP = (value: number) => {
  if (isNaN(value) || value === null) return "$0";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Simulador() {
  const navigate = useNavigate(); // ✅ Debe estar aquí arriba
  const [monto, setMonto] = useState(5000000);
  const [plazo, setPlazo] = useState(24);
  const [taza, setTaza] = useState(1.5);
  const [savedSimulations, setSavedSimulations] = useState<Simulation[]>([]);

  type Simulation = {
    id: number;
    monto: number;
    plazo: number;
    taza: number;
  };

  const hoy = new Date();
  const mes = hoy.getMonth() + 1;
  const ano = hoy.getFullYear();

  // ✅ sin useNavigate adentro
  function finPago(mes: number, ano: number, plazo: number): string {
    const mesesTotales = mes + plazo;
    const anosExtras = Math.floor(mesesTotales / 12);
    const mesesQueQuedan = mesesTotales % 12;
    const anoActualizado = ano + anosExtras;
    const mesActualizado = mesesQueQuedan === 0 ? 12 : mesesQueQuedan;
    return `${mesActualizado.toString().padStart(2, "0")}/${anoActualizado}`;
  }

  const FechaFin = finPago(mes, ano, plazo);

  // --- cálculos ---
  const tasaInteresEfectiva = taza / 100;
  const cuota =
    tasaInteresEfectiva > 0
      ? (monto *
          (tasaInteresEfectiva * Math.pow(1 + tasaInteresEfectiva, plazo))) /
        (Math.pow(1 + tasaInteresEfectiva, plazo) - 1)
      : monto / plazo;

  const totalPagado = cuota * plazo;
  const intereses = totalPagado - monto;

  const handleSaveSimulation = () => {
    const newSimulation: Simulation = { id: Date.now(), monto, plazo, taza };
    setSavedSimulations([...savedSimulations, newSimulation]);
  };

  const handleLoadSimulation = (simulation: Simulation) => {
    setMonto(simulation.monto);
    setPlazo(simulation.plazo);
    setTaza(simulation.taza);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-10 border border-gray-200">
          <header className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Simula tu Crédito de Consumo
            </h1>
            <p className="text-gray-600 mt-2 text-md">
              Guarda tus simulaciones para tener un historial.
            </p>
          </header>

          <main className="grid md:grid-cols-2 md:gap-12 items-stretch">
            <section className="flex flex-col justify-between space-y-8">
              <div className="space-y-8">
                {/* Monto */}
                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    Monto del Crédito:{" "}
                    <span className="font-semibold">
                      ${monto.toLocaleString()}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg p-3 bg-gray-100 rounded-lg text-gray-600">
                      CLP
                    </span>
                    <Input
                      type="number"
                      value={monto}
                      onChange={(e) => setMonto(Number(e.target.value) || 0)}
                      placeholder="Ej: 3000000"
                    />
                  </div>
                  <Slider
                    className="w-64"
                    min={500000}
                    max={5000000}
                    value={[monto]}
                    onValueChange={(value) => setMonto(value[0])}
                  />
                </div>

                {/* Plazo */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                    Plazo en Meses:
                    <span className="font-bold text-gray-800">{plazo}</span>
                  </label>
                  <Slider
                    className="w-64"
                    min={6}
                    max={60}
                    value={[plazo]}
                    onValueChange={(value) => setPlazo(value[0])}
                  />
                </div>

                {/* Tasa */}
                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-1">
                    <Percent className="w-5 h-5 text-yellow-600" />
                    Tasa de Interés Mensual
                  </label>
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold text-gray-800">
                      {taza.toFixed(2)}%
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      ({(taza * 12).toFixed(1)}% anual aprox.)
                    </span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleSaveSimulation}
                  >
                    + Guardar Simulación
                  </Button>
                </div>
              </div>
            </section>

            {/* Resumen */}
            <aside className="mt-10 md:mt-0 bg-yellow-50 rounded-2xl p-6 flex flex-col justify-between shadow-inner">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-yellow-600" />
                  Resumen de tu Crédito
                </h2>
                <div className="space-y-4 my-6">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-gray-600">Total en intereses:</span>
                    <span className="font-semibold text-base text-gray-800">
                      {formatCurrencyCLP(intereses)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-gray-600">Monto total a pagar:</span>
                    <span className="font-semibold text-base text-gray-800">
                      {formatCurrencyCLP(totalPagado)}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Tu pago mensual estimado:
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-yellow-600 my-1 tracking-tighter">
                    {formatCurrencyCLP(cuota)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Última cuota estimada: {FechaFin}
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="mt-6"
                onClick={() => {
                  localStorage.setItem("fromSimulador", "true");
                  navigate("/form");
                }}
              >
                ¡Quiero este crédito!
              </Button>
            </aside>
          </main>

          {savedSimulations.length > 0 && (
            <section className="mt-12 pt-6 border-t-2 border-dashed">
              <h2 className="text-xl font-bold text-gray-700 text-center mb-4 flex items-center justify-center gap-2">
                <History className="text-gray-500" />
                Mi Historial de Simulaciones
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {savedSimulations.map((sim, index) => (
                  <Button
                    key={sim.id}
                    onClick={() => handleLoadSimulation(sim)}
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-semibold"
                  >
                    Simulación {index + 1}
                  </Button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
