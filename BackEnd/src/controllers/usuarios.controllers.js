const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { crearNuevoUsuario, encontrarUsuarioPorEmail, encontrarTodosLosUsuarios, actualizarUsuario, eliminarUsuario } = require("../models/usuarios.mongoose");
const { connect } = require('../database/mongoose');

const registrar = async (req, res, next) => {

    try {
        const { nombre, email, password, telefono, empresa } = req.body; 
        await connect();

        // consulta al modelo para crear el documento en la base de datos
        const usuario = await crearNuevoUsuario({ nombre, email, password, telefono, empresa })

        res.status(201).json({
            msg: "Usuario creado correctamente.",
            id: usuario._id
        })
        
    } catch (error) {
        next(error)
    }

}

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body; //valida datos
        await connect();
        const usuario = await encontrarUsuarioPorEmail(email);

        if(!usuario) {
            return res.status(401).json({msg: "Credenciales inválidas."})
        }

        const passwordValidate = await bcrypt.compare(password, usuario.password); //compara password ingresado vs hash guardado

        if(!passwordValidate) { //Validar password
            return res.status(401).json({msg: "Credenciales inválidas."})
        }

        // genera token de acceso

        const token = jwt.sign({id: usuario._id, email: usuario.email, rol: usuario.rol}, process.env.SECRET_KEY, {expiresIn: '8h'})


        // respuesta al cliente con su información de acceso
        res.status(200).json({
            msg: "Login correcto",
            token: token
        })
        
    } catch (error) {
        next(error)
    }

}

const obtenerUsuarios = async (req, res, next) => {
    try {
        await connect(); // Conectas
        const lista = await encontrarTodosLosUsuarios(); // Llamas a tu modelo
        res.status(200).json(lista); // Devuelves la lista
    } catch (error) {
        next(error);
    }
};

// Función esencial para Editar
const editar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await connect();
        const usuario = await actualizarUsuario(id, req.body);
        res.status(200).json({ msg: "Usuario actualizado", usuario });
    } catch (error) {
        next(error);
    }
};

// Función esencial para Eliminar
const eliminar = async (req, res, next) => {
    try {
        const { id } = req.params;
        await connect();
        await eliminarUsuario(id);
        res.status(200).json({ msg: "Usuario eliminado" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    registrar,
    login,
    obtenerUsuarios,
    editar,
    eliminar
};