let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const dotenv = require("dotenv");
const Telegraf = require("telegraf");
const TelegramBot = require('telegraf/telegram')
dotenv.config({ path: require('find-config')('.env') })

const CHATID = process.env.CHATID
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const TELEGRAM_USERBOT = process.env.TELEGRAM_USERBOT

chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Despliegue de bot de usuario: ', () => {
    it('despliega el bot de usuario de Telegram', () => {
      const bot1 = new Telegraf(TELEGRAM_USERBOT);
      expect(typeof(bot1)).to.equal("object");
      bot1.stop();
    });
});

describe('Despliegue de bot de chat: ', () => {
  it('despliega el bot de chat de Telegram', () => {
    const bot1 = new Telegraf(TELEGRAM_TOKEN);
    expect(typeof(bot1)).to.equal("object");
    bot1.stop();
  });
});

describe('El bot de chat escribe un mensaje: ', () => {
  it('tiene que mandar un mensaje', (done) => {
    const InnoSofterBot = new TelegramBot(TELEGRAM_TOKEN, { polling: false })
    InnoSofterBot.sendMessage(CHATID,"¡Oops! Parece que mis desarrolladores están probándome...").then(function(result){
      message_id = result.message_id;
      expect(result.text).to.equal("¡Oops! Parece que mis desarrolladores están probándome...")
      done();
    })
  });
});

describe('El bot de chat escribe una encuesta: ', () => {
  it('tiene que mandar una encuesta', (done) => {
    const InnoSofterBot = new TelegramBot(TELEGRAM_TOKEN, { polling: false })
    InnoSofterBot.sendPoll(CHATID, "¿Esto es una prueba?", ["Sí","Sí"], is_anonymous=true).then(function(result){
      poll_id = result.message_id;      
      expect(result.poll.question).to.equal("¿Esto es una prueba?")
      done();
    })
  });
  after(function(){
    const InnoSofterBot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });
    InnoSofterBot.deleteMessage(CHATID,message_id);
    InnoSofterBot.deleteMessage(CHATID,poll_id);
  });
});
