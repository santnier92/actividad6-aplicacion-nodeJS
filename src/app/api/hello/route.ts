//importar NextResponse desde next server, para poder manejar HTTP en API routes
import { NextResponse } from "next/server";

//definir una funcion exportada llamada GET, que se va a ejecutar cuando se haga
//una solicitud HTTP GET.

export function GET(){
    //retornamos una respuesta en formato json
    return NextResponse.json({message: "Hola desde la API hello"})
}