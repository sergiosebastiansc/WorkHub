 const mongoose = require('mongoose')

 const reservaSchema = new mongoose.Schema({ //creacion schema
    "espacio": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Espacio'},
    "usuario": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario'},
    "fecha": {type: String, required: true},
    "horaInicio": {type: String, required: true},
    "horaFin": {type: String, required: true},
 })

const Reserva = mongoose.models.Reserva || mongoose.model('Reserva', reservaSchema); //crea la colección reservas en MongoDB.

 async function obtenerTodasLasReservas(){   //obtener todas las reservas
    return await Reserva.find({}).populate('espacio',{ //Reemplaza el ID por el objeto completo
      ubicacion: 0,
      disponibilidad: 0,//cero es no incluir este campo
      id: 0,
      capacidad: 0,
      _id: 0
    }).populate('usuario', {
      password: 0,
      _id: 0,
      __v: 0,
      rol: 0
    });
 }

 async function crearUnaNuevaReserva(reserva) {
    const nuevaReserva = new Reserva(reserva);

    return await nuevaReserva.save(); //guarda en la base de datos
 }

 // validar conflictos si hay reservas repetidas
 async function encontrarReservaPrevia(espacio, fecha, horaInicio, horaFin) {
   return await Reserva.findOne({
      espacio: espacio,
      fecha: fecha,
      horaInicio: {$lt: horaFin},
      horaFin: {$gt: horaInicio}
   })

 }


 // obtener reservas por id de usuario especifico
 async function obtenerReservasPorUsuario(usuarioId) {
    return await Reserva.find({ usuario: usuarioId }).populate('espacio', {
      ubicacion: 0,
      disponibilidad: 0,
      capacidad: 0,
      _id: 0
    });
 }

 async function actualizarUnaReserva(id, datosActualizados) {
   return await Reserva.findByIdAndUpdate(id, datosActualizados, { new: true });
}
async function eliminarUnaReserva(id) {
   return await Reserva.findByIdAndDelete(id);
}
 module.exports = {
    obtenerTodasLasReservas,
    crearUnaNuevaReserva,
    encontrarReservaPrevia,
    obtenerReservasPorUsuario,
    actualizarUnaReserva,
    eliminarUnaReserva
 

 }