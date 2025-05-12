// Importa NextResponse desde 'next/server', que se usa para crear respuestas HTTP desde funciones de servidor en Next.js.
import { NextResponse } from "next/server";

// Importa el modelo User desde la carpeta models.
// Este modelo representa el esquema de la colección de usuarios en MongoDB.
import User from "@/models/user";

// Importa la función connectDB, encargada de conectar con la base de datos MongoDB.
import { connectDB } from '@/libs/mongodb'

// Importa bcryptjs, una librería para encriptar contraseñas antes de guardarlas en la base de datos.
import bcrypt from "bcryptjs";

// Esta función se ejecuta cuando el servidor recibe una solicitud HTTP POST (por ejemplo, al registrar un usuario).
export async function POST(request: Request) {

    // 1. Extrae los campos fullname, email y password del cuerpo de la solicitud.
    const { fullname, email, password } = await request.json();

    // 2. Muestra los valores en consola (esto es útil solo para desarrollo).
    console.log(fullname, email, password);

    // 3. Valida que la contraseña no esté vacía y que tenga al menos 6 caracteres.
    // Si no se cumple, se responde con error 400 y un mensaje.
    if (!password || password.length < 6)
        return NextResponse.json(
            {
                message: "Password must be at least 6 characters", // Mensaje de error por contraseña insegura
            },
            {
                status: 400, // Código HTTP 400 = solicitud incorrecta
            }
        );

    try {
        // 4. Establece la conexión con la base de datos MongoDB.
        await connectDB();

        // 5. Verifica si ya hay un usuario registrado con ese mismo email.
        const userFound = await User.findOne({ email });

        // 6. Si ya existe, responde con error 409 (conflicto de datos).
        if (userFound) return NextResponse.json(
            {
                message: "Email already exists" // Ya hay un usuario con ese correo
            },
            {
                status: 409 // Código HTTP 409 = conflicto
            }
        );

        // 7. Encripta la contraseña del usuario con bcrypt (12 rondas = buena seguridad).
        const hashedPassword = await bcrypt.hash(password, 12);

        // 8. Crea un nuevo objeto del modelo User con los datos del formulario.
        // Nota: Se guarda la contraseña encriptada, no en texto plano.
        const user = new User({
            email,
            fullname,
            password: hashedPassword,
        });

        // 9. Guarda el usuario en la base de datos y espera a que termine el proceso.
        const savedUser = await user.save();




        // 10. Imprime el usuario guardado (opcional, para desarrollo).


        // 11. Devuelve como respuesta el usuario guardado en formato JSON

        return NextResponse.json({
            _id: savedUser._id,
            email: savedUser.email,
            fullname: savedUser.fullname,
        });


    } catch (error) {
        // 12. Si ocurre un error durante el proceso, se captura y se muestra en consola.
        console.log(error);

        // 13. Verifica si el error es una instancia válida del objeto Error.
        if (error instanceof Error) {
            // 14. Devuelve un mensaje personalizado con el mensaje del error capturado.
            return NextResponse.json(
                {
                    message: error.message, // Mensaje del error que ocurrió
                },
                {
                    status: 400, // Código HTTP 400 = solicitud inválida
                }
            );
        }
    }
}
