const mongoose = require('mongoose')
// Definir el schema
const espacioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, "El nombre del espacio es obligatorio"],
        trim: true 
    },
    ubicacion: { 
        type: String, 
        required: [true, "La ubicación es obligatoria"] 
    },
    precio: { 
        type: Number, 
        required: [true, "El precio es obligatorio"],
        min: [0, "El precio no puede ser negativo"]
    },
    capacidad: { 
        type: Number, 
        required: [true, "La capacidad es obligatoria"],
        min: [1, "La capacidad mínima debe ser 1"]
    },
    disponibilidad: { 
        type: Boolean, 
        default: true 
    }
})
const Espacio = mongoose.models.Espacio || mongoose.model('Espacio', espacioSchema) //crea coleccion espacios en mongodb

async function obtenerTodosLosEspacios() {
    return await Espacio.find({});
}

async function obtenerUnEspacioPorId(id) {
    return await Espacio.findById(id)
}

async function crearNuevoEspacio(datos) {
    const nuevoEspacio = new Espacio(datos);
    return await nuevoEspacio.save();
}

async function actualizarEspacio(id, datosNuevos) {
    // { new: true } sirve para que nos devuelva el objeto ya editado
    return await Espacio.findByIdAndUpdate(id, datosNuevos, { new: true });
}

async function eliminarEspacioPorId(id) {
    return await Espacio.findByIdAndDelete(id);
}



module.exports = {
    obtenerTodosLosEspacios,
    obtenerUnEspacioPorId,
    crearNuevoEspacio,
    actualizarEspacio,
    eliminarEspacioPorId 
};