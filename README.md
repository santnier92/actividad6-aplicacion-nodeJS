Aplicación de Autenticación con Next.js y MongoDB
---
Hola, mi nombre es Santiago Nieto. Esta es la presentación de mi aplicación desarrollada con Next.js, encargada de gestionar la autenticación de usuarios conectándose a una base de datos en MongoDB Atlas. El proyecto fue desplegado en Vercel y contiene todo el backend necesario para el registro y login de personas.

🧱 Estructura del Proyecto
Durante las primeras clases creamos la estructura base del proyecto y definimos las rutas principales:

/login: Página de autenticación de usuarios.

/signup: Página de registro de nuevos usuarios.

/api/hello: Ruta básica de prueba.

📁 Archivos y Funcionalidades Clave
1. mongodb.ts
Este archivo se encarga de manejar la conexión a MongoDB.

Utiliza variables de entorno (almacenadas en .env.local) para obtener la URI de conexión.

Define una función asíncrona que verifica si ya hay una conexión activa. Si no la hay, establece una nueva.

Utiliza try...catch para manejar errores de conexión y rechazar la promesa si algo falla.

2. user.ts
Define el modelo de usuario mediante Mongoose:

Usa Schema, model y models para crear el esquema y evitar errores por recarga del modelo.

Campos definidos:

email: tipo String, único, obligatorio, y con formato validado.

password: obligatorio y oculto por defecto en las consultas.

fullname: obligatorio, entre 3 y 50 caracteres, con mensajes personalizados.

3. route.ts
Contiene la lógica para el registro de usuarios:

Se define una ruta /api/signup usando POST.

Se validan los campos enviados (fullname, email, password).

Se devuelve una respuesta en formato JSON con errores si el password no cumple con los requisitos (mínimo 6 caracteres).

Se responde con código HTTP 400 en caso de error de validación.

🚀 Despliegue
La aplicación fue desplegada exitosamente en Vercel, conectada a MongoDB Atlas. Puedes acceder al proyecto en los siguientes enlaces:

🔗 GitHub: Repositorio del proyecto

🌐 Vercel: Aplicación desplegada

📦 Tecnologías Utilizadas
Next.js

TypeScript

MongoDB Atlas

Mongoose

Vercel

GitHub

✅ Estado del Proyecto
✔️ Aplicación funcionando con autenticación y conexión a MongoDB.

✔️ Validaciones implementadas en el backend.

✔️ Despliegue completado en Vercel.
