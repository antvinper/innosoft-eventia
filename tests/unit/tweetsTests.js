let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const Twit = require("twit");
const dotenv = require("dotenv");
dotenv.config({ path: require('find-config')('.env') })

var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

var idTweet1;
var idTweet2;

describe('Publicar tweet SIN imagen: ', () => {
    it('deberia publicar un tweet SIN imagen', (done) => {
    chai.request(url)
      .post('/tweet')
      .send({
        command: "node ./src/twitter-api/publicarTweetSinImagen.js Test 1 Automatizado 01/01/2023 0:00:00"
      })
      .end(function(err,res) {
        idTweet1 = res.body.result.replace(/(\r\n|\n|\r)/gm,"")
        console.log("ID 1", idTweet1)

        expect(res.body.success).to.be.true;
        done();
      });
    });
});

describe('Publicar tweet CON imagen: ', () => {
    it('deberia publicar un tweet CON imagen', (done) => {
    chai.request(url)
      .post('/tweet')
      .send({
        command: "node ./src/twitter-api/publicarTweetConImagen.js Test 2 Automatizado 01/01/2023 0:00:00 https://institucional.us.es/innosoft/wp-content/uploads/2018/10/logo_2_negro-e1540204473260.png"
      })
      .end(function(err,res) {
        idTweet2 = res.body.result.replace(/(\r\n|\n|\r)/gm,"")
        console.log("ID 2", idTweet2)

        expect(res.body.success).to.be.true;
        done();
      });
      
      after(function(){
        console.log("Eliminando el tweet sin imagen")
        T.post('statuses/destroy/:id', { id: idTweet1}, function (err, data, response) {
            console.log("Tweet sin imagen eliminado con éxito")
        });

        console.log("Eliminando el tweet con imagen")
        T.post('statuses/destroy/:id', { id: idTweet2}, function (err, data, response) {
            console.log("Tweet con imagen eliminado con éxito")
        });
      })
    });
});