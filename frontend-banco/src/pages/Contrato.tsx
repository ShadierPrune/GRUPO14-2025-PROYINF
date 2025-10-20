import React, { useState } from "react";

// --- Props del Componente ---
// Estas funciones serían pasadas desde el componente principal (Form.tsx)
// para manejar la navegación y la finalización.
type ContractViewProps = {
  onBack: () => void; // Función para volver al paso anterior
  onSubmit: () => void; // Función para manejar el envío final
};

const Contrato: React.FC<ContractViewProps> = ({ onBack, onSubmit }) => {
  // Estado para controlar la aceptación de los términos
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);

  const handleFinalSubmit = () => {
    // Solo permite el envío si los términos han sido aceptados
    if (hasAccepted) {
      onSubmit();
    }
  };

  return (
    <div className="animate-fade-in">
      {/* --- 1. Resumen Destacado del Crédito --- */}
      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-left">
          Resumen Final del Crédito
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 text-left">
          <li className="flex justify-between">
            <span>Monto Solicitado:</span>
            <strong className="font-semibold text-gray-900">$5.000.000</strong>
          </li>
          <li className="flex justify-between">
            <span>Plazo:</span>
            <strong className="font-semibold text-gray-900">36 meses</strong>
          </li>
          <li className="flex justify-between">
            <span>Tasa de Interés Mensual:</span>
            <strong className="font-semibold text-gray-900">1.2%</strong>
          </li>
          <li className="flex justify-between pt-3 mt-3 border-t border-yellow-200">
            <span className="font-bold">Valor Cuota Mensual Aprox:</span>
            <strong className="font-bold text-gray-900">$171.450</strong>
          </li>
        </ul>
      </div>

      {/* --- 2. Documento del Contrato --- */}
      <div className="mb-8 text-left">
        <h4 className="font-semibold text-gray-800 mb-2">
          Contrato de Crédito de Consumo
        </h4>
        <div className="h-64 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-600 leading-relaxed">
          <p className="mb-2">
            <strong>CLÁUSULA PRIMERA: Partes.</strong> Comparecen, por una
            parte, BANCO XYZ, en adelante "El Banco", y por otra parte, [Nombre
            Completo del Cliente], RUT [RUT del Cliente], en adelante "El
            Cliente".
          </p>
          <p className="mb-2">
            <strong>CLÁUSULA SEGUNDA: Objeto.</strong> El Banco otorga al
            Cliente un crédito de consumo por la suma de $5.000.000 (cinco
            millones de pesos), que el Cliente se obliga a pagar en 36 cuotas
            mensuales, iguales y sucesivas de $171.450...
          </p>
          <p className="mb-2">
            <strong>CLÁUSULA TERCERA: Tasa de Interés.</strong> La tasa de
            interés para el presente crédito es de un 1.2% mensual, la cual se
            mantendrá fija durante toda la vigencia del crédito...
          </p>
          <p>[... El resto de las cláusulas del contrato irían aquí ...]</p>
          <p>
            <strong>CLÁUSULA VIGÉSIMA: Domicilio.</strong> Para todos los
            efectos legales, las partes fijan su domicilio en la ciudad de
            Santiago, y se someten a la jurisdicción de sus Tribunales
            Ordinarios de Justicia.
          </p>
        </div>
        <a
          href="/ruta/al/contrato.pdf"
          download
          className="block text-right mt-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
        >
          Descargar copia del contrato (PDF)
        </a>
      </div>

      {/* --- 3. Aceptación y Firma Digital --- */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label
          htmlFor="accept-terms"
          className="flex items-start cursor-pointer"
        >
          <input
            id="accept-terms"
            type="checkbox"
            checked={hasAccepted}
            onChange={(e) => setHasAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
          />
          <span className="ml-3 text-sm text-gray-700 text-left">
            Declaro que he leído, entiendo y{" "}
            <strong>acepto íntegramente</strong> los términos y condiciones del
            Contrato de Crédito. Al hacer clic en "Firmar y Finalizar", firmo
            electrónicamente este acuerdo.
          </span>
        </label>
      </div>

      {/* --- Botones de Navegación --- */}
      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
        >
          Atrás
        </button>
        <button
          onClick={handleFinalSubmit}
          disabled={!hasAccepted}
          className="px-8 py-2.5 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all focus:ring-4 focus:ring-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Firmar y Finalizar
        </button>
      </div>
    </div>
  );
};

export default Contrato;
