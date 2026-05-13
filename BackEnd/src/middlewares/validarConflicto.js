const { connect } = require("../database/mongoose");
const { encontrarReservaPrevia } = require("../models/reservas.mongoose");


const validarConflicto = async (req, res, next) => {

  const { espacio, fecha, horaInicio, horaFin } = req.body;
   try {
    await connect();  
  const hayConflicto = await encontrarReservaPrevia(espacio, fecha, horaInicio, horaFin);
  console.log(hayConflicto)
 

  if(hayConflicto){
    return res.status(400).json({
        msg: "Ya existe una reserva creada para ese horario y oficina seleccionados."
    })
  }

  next();
  } catch (error) {
    next(error)
  }

}


module.exports = validarConflicto