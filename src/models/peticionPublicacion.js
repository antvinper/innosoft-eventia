const mongoose = require('mongoose');
const peticionPublicacionSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    idEvento: String,
    titulo: String,
    descripcion: String,
    inicio: Date,
    fin: Date,
    imagen: String,
    estado: String,
    publicadoFacebook: Boolean
});

const PeticionPublicacion = mongoose.model('PeticionPublicacion', peticionPublicacionSchema);

module.exports = PeticionPublicacion;