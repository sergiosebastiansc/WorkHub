const { connect } = require("../database/mongoose");
const { 
    obtenerTodosLosEspacios, 
    crearNuevoEspacio, 
    actualizarEspacio,
    eliminarEspacioPorId 
} = require("../models/espacios.mongoose"); 

const obtenerEspacios = async (req, res) => {
    try {
        await connect();             
        const espacios = await obtenerTodosLosEspacios(); 
        res.status(200).json(espacios);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Error de servidor." });
    }
};

const crearEspacios = async (req, res, next) => {
    const { nombre, capacidad, precio, ubicacion, disponibilidad } = req.body;

    try {        
        await connect(); 
        const nuevoEspacio = {
            nombre,
            capacidad,
            precio,
            ubicacion,
            disponibilidad
        };
    
        const espacioCreado = await crearNuevoEspacio(nuevoEspacio);
        res.status(201).json(espacioCreado);
    } catch (error) {
        next(error);       
    }
};

// actualizar
const editarEspacio = async (req, res, next) => {
    const { id } = req.params; 
    const datosNuevos = req.body; 

    try {
        await connect();
        const actualizado = await actualizarEspacio(id, datosNuevos);
        
        if (!actualizado) {
            return res.status(404).json({ msg: "No se encontró el espacio para editar" });
        }
        
        res.status(200).json(actualizado);
    } catch (error) {
        next(error);
    }
};

// 
const eliminarEspacio = async (req, res, next) => {
    const { id } = req.params; 

    try {
        await connect();
        const borrado = await eliminarEspacioPorId(id);
        
        if (!borrado) {
            return res.status(404).json({ msg: "No se pudo eliminar: el espacio no existe." });
        }
        
        res.status(200).json({ msg: "Espacio eliminado correctamente", espacio: borrado });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerEspacios,
    crearEspacios,
    editarEspacio,
    eliminarEspacio
};
