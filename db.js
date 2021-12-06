const mongoose = require("mongoose");
var PeticionPublicacion = require("./src/models/peticionPublicacion");

const DB_URL = "mongodb+srv://admin:admin@innosofteventia.a1j4z.mongodb.net/innosoftEventia?retryWrites=true&w=majority"

const dbConnect = function () {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error: "));
  return mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  });
};

var pruebaPublicacion = new PeticionPublicacion({
    _id: new mongoose.Types.ObjectId(),
    idEvento: "123456789000",
    titulo: "Antonio biñuela",
    descripcion: "Felipe se ha chinao por la cara :(",
    inicio: new Date("2021-11-24T21:15:13"),
    fin: Date.now(),
    imagen: "https://i.ytimg.com/vi/LlWzJbuYslA/hqdefault.jpg",
    estado: "Pendiente"
});

// pruebaPublicacion.save(function(err) {
//   if (err) throw err;

//   console.log("Peticion de publicacion guardada exitosamente: ");
//   console.log(pruebaPublicacion)
// });

module.exports = dbConnect;