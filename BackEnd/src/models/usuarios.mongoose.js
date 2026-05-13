const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true, //eliminar espacios al inicio y al final
    },
    email: {
      type: String,
      required: true,
      unique: true, //no puede repetirse
      lowercase: true, //guardar en minusculas
      trim: true, 
      match: [/^\S+@\S+\.\S+$/, "El formato del email no es válido"],
    },
    password: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    empresa: {
      type: String,
      trim: true,
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"], //solo se admiten como usuario o admin
      default: "usuario", //usuario por defecto
    },
  },
  {
    timestamps: true, //agrega en el JSON cuando se crea y actualiza el usuario
  }
);

//middleware pre save
 usuarioSchema.pre("save", async function () {
    if(!this.isModified('password')) return; //si no cambia no hace nada, si cambia la encripta
    this.password = await bcrypt.hash(this.password, 10); //encripta la contraseña
 });


 const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);

async function crearNuevoUsuario(usuario) {

    const nuevoUsuario = new Usuario(usuario); //crea instancia del modelo
    return await nuevoUsuario.save(); //guarda en la base de datos

}

async function encontrarUsuarioPorEmail(email) { //busca usuario por email
    return await Usuario.findOne({email: email})

}

// Busca todos los usuarios en la base de datos
async function encontrarTodosLosUsuarios() {
    return await Usuario.find();
}

// Actualiza un usuario usando su ID
async function actualizarUsuario(id, datos) {
    // { new: true } sirve para que te devuelva el usuario ya cambiado
    return await Usuario.findByIdAndUpdate(id, datos, { new: true });
}

// Elimina un usuario por su ID
async function eliminarUsuario(id) {
    return await Usuario.findByIdAndDelete(id);
}

module.exports = {
    crearNuevoUsuario,
    encontrarUsuarioPorEmail,
    encontrarTodosLosUsuarios,
    actualizarUsuario,
    eliminarUsuario
};