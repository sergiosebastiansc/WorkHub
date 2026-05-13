const express = require("express");
const { obtenerEspacios, crearEspacios, editarEspacio, eliminarEspacio } = require("../controllers/espacios.controllers");
const auth = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/checkRoles");
const router = express.Router();

router.get("/", obtenerEspacios);


router.post("/", auth, checkAdmin, crearEspacios); 
router.put("/:id", auth, checkAdmin, editarEspacio);
router.delete("/:id", auth, checkAdmin, eliminarEspacio);

module.exports = router;
