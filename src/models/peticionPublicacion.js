const mongoose = require('mongoose');

const peticionPublicacionSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    idEvento: String,
    titulo: String,
    descripcion: String,
    inicio: Date,
    fin: Date,
    imagen: String,
    botonGmail:Boolean
    publicadoFacebook: Boolean
});

const PeticionPublicacion = mongoose.model('PeticionPublicacion', peticionPublicacionSchema);

module.exports = PeticionPublicacion;