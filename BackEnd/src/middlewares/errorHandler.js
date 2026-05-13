// middleware para manejo personalizado de errores
const errorHandler = (err, req, res, next) => {

    res.status(err.status || 500).json({
        msg: err.message || "Error interno del servidor."
    })

}






module.exports = errorHandler