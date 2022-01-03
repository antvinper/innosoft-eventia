let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000/api/v1';

let idPeticionPublicacion;

describe('Crear peticion de publicacion: ', () => {
    it('deberia crear una peticion de publicacion', (done) => {
    chai.request(url)
      .post('/peticionesPublicacion')
      .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
      .send({
        idEvento: "Test",
        titulo: "Peticion de publicacion de prueba",
        descripcion: "Aula A0.13 Speaker: Test",
        inicio: new Date("2021-11-24T21:15:13"),
        fin: Date.now(),
      })
      .end(function(err,res) {
        console.log(res.body)
        idPeticionPublicacion = res.body._id
        expect(res).to.have.status(200);
        done();
      });
    });
});

describe('Obtener peticion de publicacion: ', () => {
  it('deberia obtener una peticion de publicacion', (done) => {
  chai.request(url)
    .get('/peticionesPublicacion/' + idPeticionPublicacion)
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Actualizar peticion de publicacion: ', () => {
  it('deberia actualizar una peticion de publicacion', (done) => {
  chai.request(url)
    .put('/peticionesPublicacion/' + idPeticionPublicacion)
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .send({
      idEvento: "Test",
      titulo: "Peticion de publicacion de prueba actualizada",
      descripcion: "Aula A0.13 Speaker: Test actualizado",
      inicio: new Date("2021-11-24T21:15:14"),
      fin: Date.now(),
    })
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Eliminar peticion de publicacion: ', () => {
  it('deberia eliminar una peticion de publicacion', (done) => {
  chai.request(url)
    .delete('/peticionesPublicacion/' + idPeticionPublicacion)
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});