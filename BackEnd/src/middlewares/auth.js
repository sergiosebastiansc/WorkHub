const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;  // obtiene token desde la request

    if(!authHeader || !authHeader.startsWith('Bearer ')) {  //verifica que exista el header y tenga formato bearer token
        return res.status(401).json({
            msg: "Token de autenticación requerido"
        })
    } 
    
    const token = authHeader.split(' ')[1]; //divide el bearer token y toma el token

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY); //valida que token sea correcto y decodifica contenido

        // pasar información del usuario al siguiente middleware o controlador
        req.user = payload;
        // darle el paso al siguiente middleware
        next();

    } catch (error) {
        error.message = "Token inválido o expirado."
        next(error)
    }
};


module.exports = auth;