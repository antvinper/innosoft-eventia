let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const dotenv = require("dotenv");
dotenv.config({ path: require('find-config')('.env') })


var FB_API_PAGE_TOKEN = process.env.VUE_APP_FB_API_PAGE_TOKEN
var FB_PAGE_ID = process.env.VUE_APP_FB_PAGE_ID


chai.use(chaiHttp);
const url = `https://graph.facebook.com/${FB_PAGE_ID}/`;

var idPublish1;
var idPublish2;

describe('Publicar en Facebook SIN imagen: ', () => {
    
    it('deberia publicar en Facebook SIN imagen', (done) => {
      chai.request(url)
        .post(`feed`)
        .send({message:'Esto es un test sin imagen',access_token:FB_API_PAGE_TOKEN})
        .end(function(error,response) {
          idPublish1 = response.text.match('\\d+_\\d+')[0]
          console.log('Respuesta: ', idPublish1)
          console.log('Estado: ', response.status)

          if(error){
            console.log('Error: ', error)
          }
          
          expect(response.status).to.be.equal(200);
          done();
        });
    });
});

describe('Publicar en Facebook CON imagen: ', () => {
    
    it('deberia publicar en Facebook CON imagen', (done) => {
      chai.request(url)
        .post(`photos`)
        .send({url:'http://aquadentalclinic.co.ke/wp-content/uploads/2019/09/canstockphoto22402523-arcos-creator.com_-1024x1024.jpg',
               message:'Esto es un test con imagen',
               access_token:FB_API_PAGE_TOKEN})
        .end(function(error,response) {
          
          idPublish2 = response.text.match('\\d+_\\d+')[0]
          console.log('Respuesta: ', response)
          console.log('Estado: ', response.status)

          if(error){
            console.log('Error: ', error)
          }
          
          expect(response.status).to.be.equal(200);
          done();
        });
      
      after(function(){
        
        console.log("Eliminando la publicación sin imagen")
        chai.request('https://graph.facebook.com/')
          .del(idPublish1)
          .send({'access_token':FB_API_PAGE_TOKEN})
          .then(response => {
              console.log('Publicación sin imagen eliminada con éxito', response.status);
          }).catch(error => {
              console.log(error.response);
          });

        console.log("Eliminando la publicación con imagen")
        chai.request('https://graph.facebook.com/')
          .del(idPublish2)
          .send({'access_token':FB_API_PAGE_TOKEN})
          .then(response => {
              console.log('Publicación con imagen eliminada con éxito', response.status);
          }).catch(error => {
              console.log(error.response);
          });

      })
    });
});