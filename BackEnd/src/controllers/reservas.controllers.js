const { connect } = require("../database/mongoose");
const { obtenerTodasLasReservas, crearUnaNuevaReserva, obtenerReservasPorUsuario, encontrarReservaPrevia, actualizarUnaReserva, eliminarUnaReserva} = require("../models/reservas.mongoose")

const { actualizarEspacio } = require("../models/espacios.mongoose");

const obtenerReservas = async (req, res) => {
    try {
        await connect();
        const reservas = await obtenerTodasLasReservas();
        res.status(200).json(reservas) 
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            msg: "Error de servidor."
        })
    }
};

const crearReserva = async (req, res, next) => {
    const { espacio, fecha, horaInicio, horaFin } = req.body;

    try {
        await connect();        
        
        const nuevaReserva = {
            usuario: req.user.id, 
            espacio,
            fecha,
            horaInicio,
            horaFin
        };
    
        const reservaCreada = await crearUnaNuevaReserva(nuevaReserva);

        await actualizarEspacio(espacio, { disponibilidad: false });
    
        res.status(201).json(reservaCreada);
    } catch (error) {
        next(error);       
    }
};

const obtenerReservasPorUsuarioId = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        await connect();
        const reservas = await obtenerReservasPorUsuario(usuarioId);
        res.status(200).json(reservas);
    } catch (error) {
        next(error);
    }
};

const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        await connect();
        const actualizada = await actualizarUnaReserva(id, req.body);

        if (!actualizada) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.status(200).json({ message: "Reserva Actualizada", data: actualizada });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const borrarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        await connect();
        const eliminado = await eliminarUnaReserva(id);

        if (!eliminado) {
            return res.status(404).json({ message: "No se pudo eliminar: ID inexistente" });
        }

        res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};



module.exports = {
    obtenerReservas,
    crearReserva,
    obtenerReservasPorUsuarioId,
    actualizarReserva,
    borrarReserva

}
