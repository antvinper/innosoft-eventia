const dotenv = require("dotenv");
dotenv.config({ path: require('find-config')('.env') })
const TelegramBot = require('telegraf/telegram')
const {CHATID} = process.env
const {TELEGRAM_TOKEN} = process.env
const InnoSofterBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

let titulo = ""
for (i=7; i < process.argv.length; i++){
  titulo = titulo + " " + process.argv[i]
}
let msg = "¡Buenas InnoSofters,  se ha publicado un nuevo evento!\n" + titulo + ", Inicio: " + process.argv[3] + " " + process.argv[4] + ", Fin: " 
+ process.argv[5] + " " + process.argv[6] + ".\nPara más información consulta el siguiente enlace: https://www.eventbrite.es/e/" + process.argv[2] + "."
InnoSofterBot.sendMessage(CHATID,msg)
setTimeout(function(){
InnoSofterBot.sendPoll(CHATID, "¿Tienes pensado asistir al evento?", ["Sí","Ojalá"], is_anonymous=true)
}, 1000)

