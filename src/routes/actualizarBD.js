const axios = require('axios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("dotenv").config()

const PeticionPublicacion = require('../models/peticionPublicacion');

const ID_ORGANIZACION = process.env.ID_ORGANIZACION
const TOKEN_APLICACION = process.env.TOKEN_APLICACION

router.put('/', async(req, res) => {
    try {
        const peticionesPublicacionExistentes = await PeticionPublicacion.find()

        axios.get("https://www.eventbriteapi.com/v3/organizations/" + ID_ORGANIZACION + "/events?token=" + TOKEN_APLICACION)
        .then((response) => {
            console.log("Response: ", response.data)
            const eventos = response.data.events;
            let peticionesPublicacionNuevas = eventos.filter(e => !(peticionesPublicacionExistentes.map(p => p.idEvento)).includes(e.id))
            console.log("Peticiones publicacion nuevas: ", peticionesPublicacionNuevas[0])
            let añadirBD = []
            for (let evento of peticionesPublicacionNuevas) {
                let peticionPublicacion = {
                    _id: new mongoose.Types.ObjectId(),
                    idEvento: evento.id,
                    titulo: evento.name.text,
                    descripcion: evento.description.text,
                    inicio: new Date(evento.start.local),
                    fin: new Date(evento.end.local),
                    imagen: evento.logo ? evento.logo.original.url : '',
                    botonGmail: false,
                    publicadoFacebook: false,
                    publicadoTwitter: false,
                    publicadoTelegram: false
                }
                añadirBD.push(peticionPublicacion)
            }
            console.log("Añadir BD: ", añadirBD[0])
            añadirBD.map(e => PeticionPublicacion.create(e).catch(err => console.log(err)));
            res.json(añadirBD);
        })
        .catch((e)=>{
            console.log('error' + e);
        })
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

module.exports = router;