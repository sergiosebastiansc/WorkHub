const { connect } = require("../database/mongoose");
const { getAllEspacios } = require("../models/espacios.models");
const { obtenerUnEspacioPorId } = require("../models/espacios.mongoose");


const validateReserva = async (req, res, next) => {

    const { usuario, espacio, fecha, horaInicio, horaFin } = req.body;
    // validar que todos los campos sean obligatorios
     if (!usuario || !espacio || !fecha || !horaInicio || !horaFin ) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios."
        })
    }

    try {
        await connect();
        const espacioExiste = await obtenerUnEspacioPorId(espacio) // validar id del espacio
    
        if(!espacioExiste) {
            return res.status(404).json({
                msg: "El espacio seleccionado no existe."
            })
        }
       
    } catch (error) {
        return next(error);
        
    }

     next();
}

    

module.exports = validateReserva;