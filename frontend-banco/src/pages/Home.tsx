import Header from "@/components/header";
import React from "react";

// --- Iconos Sencillos para la UI (puedes reemplazarlos con una librería como lucide-react) ---
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const DocumentTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// --- Definición de Tipos (Más Flexible) ---
type ApplicationStatus = "en-revision" | "aprobado" | "rechazado";

type ActiveCredit = {
  amount: number;
  installments: number;
  paidInstallments: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
};

type CurrentApplication = {
  applicationDate: string;
  status: ApplicationStatus;
};

type UserData = {
  name: string;
  activeCredit?: ActiveCredit;
  currentApplication?: CurrentApplication;
};

// --- Datos de Ejemplo (Simulación de la API) ---
// Juega con estos datos: puedes quitar 'activeCredit' o 'currentApplication' para ver cómo reacciona la UI
const MOCK_USER_DATA: UserData = {
  name: "Ana Martínez",
  activeCredit: {
    amount: 5000000,
    installments: 36,
    paidInstallments: 4,
    nextPaymentDate: "05 de Noviembre, 2025",
    nextPaymentAmount: 171450,
  },
  currentApplication: {
    applicationDate: "18 de Octubre, 2025",
    status: "en-revision", // Prueba cambiando a 'en-revision' o 'rechazado'
  },
};

// --- Componente para mostrar el Estado de la Solicitud ---
const ApplicationStatusCard: React.FC<{ application: CurrentApplication }> = ({
  application,
}) => {
  const { status, applicationDate } = application;
  let statusInfo = { icon: <div />, title: "", description: "", cta: <div /> };

  switch (status) {
    case "en-revision":
      statusInfo = {
        icon: <ClockIcon />,
        title: "En revisión",
        description: `Recibimos tu solicitud el ${applicationDate}. Te notificaremos en 24-48 horas.`,
        cta: (
          <button
            disabled
            className="w-full mt-4 px-6 py-2.5 rounded-lg font-semibold text-gray-500 bg-gray-200 cursor-not-allowed text-sm"
          >
            Pendiente
          </button>
        ),
      };
      break;
    case "aprobado":
      statusInfo = {
        icon: <CheckCircleIcon />,
        title: "¡Solicitud Aprobada!",
        description:
          "¡Buenas noticias! Tu nueva solicitud de crédito fue aprobada. Firma el contrato para continuar.",
        cta: (
          <button className="w-full flex items-center justify-center mt-4 px-6 py-2.5 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all text-sm">
            <DocumentTextIcon />
            Firmar Contrato
          </button>
        ),
      };
      break;
    case "rechazado":
      statusInfo = {
        icon: <XCircleIcon />,
        title: "Solicitud Rechazada",
        description:
          "Lamentablemente, tu solicitud no pudo ser aprobada en este momento. Inténtalo más tarde.",
        cta: (
          <button
            disabled
            className="w-full mt-4 px-6 py-2.5 rounded-lg font-semibold text-gray-500 bg-gray-200 cursor-not-allowed text-sm"
          >
            Rechazada
          </button>
        ),
      };
      break;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center">
      <div className="flex-shrink-0 mr-5">{statusInfo.icon}</div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800">{statusInfo.title}</h3>
        <p className="text-sm text-gray-600">{statusInfo.description}</p>
      </div>
      <div className="ml-5 w-1/3">{statusInfo.cta}</div>
    </div>
  );
};

// --- Componente para Gestionar un Crédito Activo ---
const ActiveCreditCard: React.FC<{ credit: ActiveCredit }> = ({ credit }) => {
  const { installments, paidInstallments, nextPaymentDate, nextPaymentAmount } =
    credit;
  const progressPercentage = (paidInstallments / installments) * 100;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">
        Resumen de tu Crédito Activo
      </h2>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 font-semibold">
          <span className="text-yellow-600">Cuotas Pagadas</span>
          <span className="text-gray-500">
            {paidInstallments} de {installments}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">Tu próximo pago</p>
          <p className="text-2xl font-bold text-yellow-600 my-1">
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(nextPaymentAmount)}
          </p>
          <p className="text-sm text-gray-600">Vence el: {nextPaymentDate}</p>
        </div>
        <button className="w-full sm:w-auto mt-4 sm:mt-0 px-8 py-3 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all">
          Pagar Cuota
        </button>
      </div>
    </div>
  );
};

// --- Componente Principal Homepage ---
export default function Home() {
  const userData = MOCK_USER_DATA;

  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <div className="bg-slate-50 flex justify-center min-h-screen font-sans p-4 sm:p-6">
        <div className="w-full max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              ¡Hola, {userData.name}!
            </h1>
            <p className="text-gray-500 text-lg">
              Bienvenido/a a tu portal de cliente.
            </p>
          </header>

          <main className="space-y-8">
            {/* Sección de Crédito Activo: solo se muestra si existe */}
            {userData.activeCredit && (
              <ActiveCreditCard credit={userData.activeCredit} />
            )}

            {/* Sección de Solicitudes: solo se muestra si hay una solicitud actual */}
            {userData.currentApplication && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
                  Estado de tu Última Solicitud
                </h2>
                <ApplicationStatusCard
                  application={userData.currentApplication}
                />
              </div>
            )}

            {/* Sección de "Call to Action": se muestra si no hay una solicitud en curso */}
            {!userData.currentApplication && (
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  ¿Necesitas financiamiento?
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Comienza una nueva solicitud de crédito en pocos minutos y
                  obtén una respuesta rápida.
                </p>
                <div className="mt-6">
                  <button className="px-8 py-3 rounded-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-all">
                    Solicitar un Nuevo Crédito
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
