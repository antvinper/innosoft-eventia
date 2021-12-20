let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

let idPeticionPublicacion;

describe('Crear peticion de publicacion: ', () => {
    it('deberia crear una peticion de publicacion', (done) => {
    chai.request(url)
      .post('/peticionesPublicacion')
      .send({
        idEvento: "Test",
        titulo: "Peticion de publicacion de prueba",
        descripcion: "Aula A0.13 Speaker: Test",
        inicio: new Date("2021-11-24T21:15:13"),
        fin: Date.now(),
        estado: "Pendiente"
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
    .send({
      idEvento: "Test",
      titulo: "Peticion de publicacion de prueba actualizada",
      descripcion: "Aula A0.13 Speaker: Test actualizado",
      inicio: new Date("2021-11-24T21:15:14"),
      fin: Date.now(),
      estado: "Publicado"
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
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});