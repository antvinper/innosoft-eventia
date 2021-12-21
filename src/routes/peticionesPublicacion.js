const axios = require('axios');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const PeticionPublicacion = require('../models/peticionPublicacion');

router.get('/', async(req, res) => {
    try {
        const peticionPublicacionDB = await PeticionPublicacion.find();
        res.json(peticionPublicacionDB);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

router.get('/:id', async(req, res) => {
const _id = req.params.id;
    try {
        const peticionPublicacionDB = await PeticionPublicacion.findOne({_id});
        res.json(peticionPublicacionDB);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

router.post('/', async(req, res) => {
    const body = req.body;  
    try {
    console.log("Creando una nueva peticionPublicacion")
    body._id = new mongoose.Types.ObjectId()
    const peticionPublicacionDB = await PeticionPublicacion.create(body);
    res.status(200).json(peticionPublicacionDB); 
    } catch (error) {
    return res.status(500).json({
        mensaje: 'An error has occurred',
        error
    })
    }
});

router.put('/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;  
    try {
        console.log("Actualizando una peticionPublicacion")

        const peticionPublicacionDB = await PeticionPublicacion.findByIdAndUpdate(_id, body);

        res.status(200).json(peticionPublicacionDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

router.delete('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const peticionPublicacionDB = await PeticionPublicacion.findByIdAndDelete(_id);
        res.status(200).json(peticionPublicacionDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

module.exports = router;