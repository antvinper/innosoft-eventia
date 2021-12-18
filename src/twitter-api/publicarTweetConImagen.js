const Twit = require("twit");
const fs = require("fs");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config({ path: require('find-config')('.env') })

var T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

if(process.argv.length >= 5){
  var titulo = "";
  for (let i=2; i<process.argv.length-3; i++){
      titulo += process.argv[i] + " ";
  };
  var l = process.argv.length;
  var texto = "El evento " + titulo + "se realizará el día " + process.argv[l-3] + " a las " + process.argv[l-2] + " horas. ¡Os esperamos!";
  var rutaImagen = process.argv[l-1];

  download(rutaImagen, 'imagen.jpg', function(){
    console.log('Imagen guardada correctamente.');
  });

  var b64content = fs.readFileSync('imagen.jpg', { encoding: 'base64' })
  
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    var mediaIdStr = data.media_id_string
    var altText = "Imagen del evento"
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  
    T.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        var params = { status: texto, media_ids: [mediaIdStr] }
  
        T.post('statuses/update', params, function (err, data, response) {
          console.log(data)
        })
      }
    })
  })
}else{
  console.log('No se han pasado los parámetros por consola correctamente, utilice la siguiente sintaxis:\n node publicarTweetSinImagen.js CuerpoDelTweet FechaInicioEvento ImagenAdjunta');
}