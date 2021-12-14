import React from "react";

const ComponenteNoAutorizado = ({ title, body }) => {
  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold text-6xl rounded-t px-4 py-2">
        {title ? (title):("Notificación")}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-yellow-100 px-4 py-3 text-gray-700">
        <p className="text-5xl text-justify">{body ? (body):("No estas autorizado para visualizar esta sesión, favor comunícate con un administrador o espera a que seas autorizado.")}</p>
      </div>
    </div>
  );
};

export default ComponenteNoAutorizado;