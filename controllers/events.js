const { response } = require("express")
const Evento = require("../models/Evento")

const getEventos = async (req, res = response) => {

	try {
		const eventos = await Evento.find().populate('user', 'name');
	
		return res.json({
			ok: true,
			eventos
		})

	}catch(error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg:"Hable con el adminstrador"
		})
	}
}

const crearEvento = async (req, res = response) => {

	const evento = new Evento(req.body);

	try {

		evento.user = req.uid;
		const eventoGuardado = await evento.save();
		return res.json({
		  ok: true,
		  evento: eventoGuardado,
		});
	}catch (error) {
		console.log(error);
		return res.status(500).json({
			ok:false,
			msg: "Hable con el administrador"
		})
	}
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