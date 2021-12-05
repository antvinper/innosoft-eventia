const axios = require('axios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PeticionPublicacion = require('../models/peticionPublicacion');

const idOrganizacion = "675651623573"
const tokenAplicacion = "52ZZGQNNA4JSYNMUEQTY"

router.get('/', async(req, res) => {
    try {
        const peticionesPublicacionExistentes = await PeticionPublicacion.find()

        axios.get("https://www.eventbriteapi.com/v3/organizations/675651623573/events?token=52ZZGQNNA4JSYNMUEQTY")
        .then((response) => {
            const eventos = response.data.events;
            console.log("Peticiones publicacion existentes: ", peticionesPublicacionExistentes[0])
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
                    estado: null
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
        // const peticionPublicacionDB = await PeticionPublicacion.find();
        // res.json(peticionPublicacionDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

module.exports = router;