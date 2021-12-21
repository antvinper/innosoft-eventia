const mongoose = require('mongoose');

let estadosValidos = {
    values: [null, "Pendiente", "Aceptado", "Rechazado"],
    message: '{VALUE} no es un estado valido'
}

const peticionPublicacionSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    idEvento: String,
    titulo: String,
    descripcion: String,
    inicio: Date,
    fin: Date,
    imagen: String,
    estado: {
        type: String,
        default: null,
        enum: estadosValidos,
    },
    publicadoFacebook: Boolean
});

const PeticionPublicacion = mongoose.model('PeticionPublicacion', peticionPublicacionSchema);

module.exports = PeticionPublicacion;