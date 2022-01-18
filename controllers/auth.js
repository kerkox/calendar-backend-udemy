const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    console.log("usuario: ", usuario);
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }
    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    
    res.status(500).json({
      ok:false,
      error:"Internal Server Error"
    })
    console.log("Ocurrio un error al guardar el usuario")
    console.log(error)
  }
};

const loginUsuario = async (req, res = response) => {

  try {

    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    console.log("usuario: ",usuario);
     if (!usuario) {
       return res.status(400).json({
         ok: false,
         msg: "El usuario no existe con ese email",
       });
     }

     // confirmar los passwords
     const validPassword = bcrypt.compareSync(password, usuario.password);
     if(!validPassword) {
       return res.status(400).json({
         ok:false,
         msg:"Password incorrecto"
       })
     }

    // Generar el JWT    
    const token = await  generarJWT(usuario.id, usuario.name);
    
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch(error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
    });
    console.log("Ocurrio un error al guardar el usuario");
    console.log(error);
  }
};

const revalidarToken = async (req, res = response) => {

  const {uid, name }= req;

  // generar un nuevo JWT y retnornalo en la peticion

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    msg: "renew",
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
