'use client';

import axios from "axios";
import { FormEvent, useState } from 'react';

function RegisterPage() {
  // Estado para mostrar mensajes de éxito o error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)

    const formData = new FormData(e.currentTarget); // Obtener los datos del formulario
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validación: Contraseñas deben coincidir
    if (password !== confirmPassword) {
      setError("❌ Las contraseñas no coinciden.");
      setMessage("");
      return;
    }

    try {
      // Llamada a la API para registrar el usuario
      const res = await axios.post("/api/auth/singup", {
        email: formData.get("email"),
        password: password,
        fullname: formData.get("fullname"),
      });

      console.log(res);
      setMessage("✅ Usuario registrado exitosamente."); // Mostrar mensaje de éxito
      setError(""); // Limpiar error anterior
    } catch (err) {
      console.log(err);
      setError("❌ Ocurrió un error al registrar el usuario."); // Mostrar mensaje de error
      setMessage(""); // Limpiar mensaje de éxito
    }
  };

  return (
    // Contenedor principal centrado con fondo degradado
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4">
      {/* Caja blanca con sombra para el formulario */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crear Cuenta</h1>

        {/* Mensaje de éxito */}
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 border border-green-300 rounded p-3 text-center">
            {message}
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-3 text-center">
            {error}
          </div>
        )}

        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Campo: Nombre completo */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Juan Pérez"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Campo: Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Campo: Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
