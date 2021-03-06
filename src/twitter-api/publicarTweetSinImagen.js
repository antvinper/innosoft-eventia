var Twit = require('twit')
const dotenv = require("dotenv");
dotenv.config({ path: require('find-config')('.env') })

var T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

if(process.argv.length >= 5){
    var titulo = "";
    for (let i=2; i<process.argv.length-2; i++){
        titulo += process.argv[i] + " ";
    };
    var l = process.argv.length;
    var texto = "El evento " + titulo + "se realizará el día " + process.argv[l-2] + " a las " + process.argv[l-1] + " horas. ¡Os esperamos!";

    T.post('statuses/update', { status: texto }, function(err, data, response) {
        console.log(data.id_str)
    })
}else{
    console.log('No se ha pasado el parámetro por consola correctamente, utilice la siguiente sintaxis:\n node publicarTweetSinImagen.js CuerpoDelTweet FechaInicioEvento');
}
