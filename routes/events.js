/**
 * Event Routes
 * /api/events
 */
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { body } = require("express-validator");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(validarJWT)

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
  '/', 
  [
    body('title','el titulo es obligatorio').not().isEmpty(),
    body('start', 'la fecha de inicio es requerida').custom(isDate),
    body('end', 'La fehca de fin es requerida').custom(isDate),
    validarCampos
  ]
  ,crearEvento
  );

//actualizar evento
router.put('/:id', actualizarEvento)

// Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;