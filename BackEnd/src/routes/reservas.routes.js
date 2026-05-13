const express = require("express");
const { obtenerReservas, crearReserva, actualizarReserva, borrarReserva, obtenerReservasPorUsuarioId } = require("../controllers/reservas.controllers");
const validateReserva = require("../middlewares/validateReserva");
const validarConflicto = require("../middlewares/validarConflicto");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", obtenerReservas);
router.get("/usuario/:usuarioId", obtenerReservasPorUsuarioId);
router.post("/", auth, validateReserva, validarConflicto, crearReserva);
router.put("/:id", auth, actualizarReserva);
router.delete("/:id", auth, borrarReserva);
 

module.exports = router
