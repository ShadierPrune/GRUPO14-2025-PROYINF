import React, { useState } from "react";
import MyForm from "../components/Paso1_Form";
import Vivienda from "@/components/Paso_vivienda_form";
// --- Definición de tipos para las Props ---
type CheckIconProps = {
  className?: string;
};

// Extiende los atributos de un input HTML estándar
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

type Step = {
  id: number;
  name: string;
};

// --- Icono de Check para los pasos completados ---
// Puedes reemplazarlo con una librería como lucide-react si ya la usas
const CheckIcon: React.FC<CheckIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- Componente principal del Formulario por Pasos ---
export default function Form() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps: Step[] = [
    { id: 1, name: "Información Personal" },
    { id: 2, name: "Detalles del Crédito" },
    { id: 3, name: "Confirmación" },
  ];

  const handleNext = (): void => {
    // Aquí puedes agregar validaciones antes de pasar al siguiente paso
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lógica para enviar el formulario
      alert("Formulario Enviado!");
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Solicita tu Crédito
          </h1>
          <p className="text-gray-500 mt-2">
            Sigue los pasos para completar tu solicitud.
          </p>
        </div>

        {/* Indicador de Pasos (Stepper) */}
        <div className="flex justify-between items-center mb-12 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                    ${currentStep > step.id ? "bg-yellow-500 text-white" : ""}
                    ${
                      currentStep === step.id
                        ? "bg-yellow-500 text-white scale-110 ring-4 ring-yellow-100"
                        : ""
                    }
                    ${currentStep < step.id ? "bg-gray-200 text-gray-500" : ""}
                  `}
                >
                  {currentStep > step.id ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <p
                  className={`mt-3 text-sm font-semibold transition-colors duration-300 ${
                    currentStep >= step.id ? "text-yellow-600" : "text-gray-400"
                  }`}
                >
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-colors duration-300 ${
                    currentStep > step.id ? "bg-yellow-500" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Contenido del Formulario */}
        <div className="form-content min-h-[200px]">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <MyForm></MyForm>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <Vivienda></Vivienda>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center p-6 bg-yellow-50/50 rounded-lg border border-yellow-200 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800">
                Revisa tu Solicitud
              </h3>
              <p className="text-gray-600 mt-2">
                Estás a un paso de finalizar. Al hacer clic en "Finalizar",
                aceptas nuestros términos y condiciones.
              </p>
            </div>
          )}
        </div>

        {/* Botones de Navegación */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Atrás
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-2.5 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all focus:ring-4 focus:ring-yellow-200"
          >
            {currentStep === steps.length ? "Finalizar Solicitud" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Componente reutilizable para los campos de texto ---
const InputField: React.FC<InputFieldProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow"
        {...props}
      />
    </div>
  );
};
