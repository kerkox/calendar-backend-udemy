/*
Rutas de Usuarios / AUthg
host + /api/auth
*/
const { Router } = require("express");
const { body } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/new",
  [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("email", "El email es obligatorio").isEmail(),
    body("password", "El password debe de ser 6 caracteres").isLength({ min: 6}),
    validarCampos
  ],
  crearUsuario
  );

router.post(
  "/",
  [
    body("email", "El email es obligatorio").isEmail(),
    body("password", "El password debe de ser 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", [validarJWT], revalidarToken);

module.exports = router;
