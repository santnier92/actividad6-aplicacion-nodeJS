'use client';

import axios from "axios";
import { FormEvent, useState } from 'react';

function RegisterPage() {
  // Estado para mostrar mensajes de éxito o error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });

      console.log(res);
      setMessage("✅ Usuario registrado exitosamente.");
      setError(""); // Limpiar mensaje de error si existía
    } catch (err) {
      console.log(err);
      setError("❌ Ocurrió un error al registrar el usuario.");
      setMessage(""); // Limpiar mensaje de éxito si existía
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-md">
      {/* Mensajes dinámicos */}
      {message && (
        <div className="mb-4 text-green-400 font-medium text-center bg-green-800/30 py-2 px-4 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 text-red-400 font-medium text-center bg-red-800/30 py-2 px-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-white mb-4">Signup</h1>

        <div>
          <label htmlFor="fullname" className="text-white block mb-1">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="John Doe"
            className="bg-zinc-800 text-white px-4 py-2 block w-full rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="text-white block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="someemail@mail.com"
            className="bg-zinc-800 text-white px-4 py-2 block w-full rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-white block mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******"
            className="bg-zinc-800 text-white px-4 py-2 block w-full rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-white block mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="******"
            className="bg-zinc-800 text-white px-4 py-2 block w-full rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-500 px-4 py-2 text-white rounded w-full hover:bg-indigo-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
