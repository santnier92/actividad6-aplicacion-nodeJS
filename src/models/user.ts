import { Schema, model, models } from "mongoose";


//definicion del schema del usuario userSchema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
            "Email is not valid"
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },

    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [3, "fullname must be at last 3 characteres"],
        maxLength: [50, "fullname must be at most 3 characteres"]
    }
});

//creacion segura del modelo

//validamos si el modelo User ya esta registrado en mongoose.models

const User = models.User || model('User', userSchema);

//exportar el modelo ya construido
export default User;