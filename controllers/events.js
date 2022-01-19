const { response } = require("express")

const getEventos = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'GetEventos'
    })
}

const crearEvento = (req, res = response) => {

    //Verificar 
    console.log(req.body);
    return res.json({
        ok: true,
        msg: 'Crear evento'
    })
}

const actualizarEvento = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Actualizar evento'
    })
}

const eliminarEvento = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Borrar Evento'
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}