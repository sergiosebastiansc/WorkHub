const express = require('express');
const { 
    registrar, 
    login, 
    obtenerUsuarios, 
    editar, 
    eliminar 
} = require('../controllers/usuarios.controllers'); 
const auth = require('../middlewares/auth');
const { checkUser } = require('../middlewares/checkRoles');
const router = express.Router();

router.post('/registro', registrar); 
router.post('/login', login); 
router.get('/', obtenerUsuarios); 
router.put('/:id', editar); 
router.delete('/:id', eliminar); 

module.exports = router;