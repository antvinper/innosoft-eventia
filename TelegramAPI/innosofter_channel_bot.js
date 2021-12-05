function launchTelegramChannelBot (){
  const TelegramBot = require('telegraf/telegram')

  const {TOKEN} = process.env
  const InnoSofterBot = new TelegramBot(TOKEN, { polling: true })

  return InnoSofterBot;
}

function sendEvent (InnoSofterBot, event, chatid){
  var eventMessage = "¡Muy buenas InnoSofters! Hoy vamos a celebrar el siguiente evento: " + event.eventName + "\n - Duración: " + event.eventDuration + " \n - Fecha: " + event.eventDate
  InnoSofterBot.sendMessage(chatid,eventMessage)
}

function sendEventPoll (InnoSofterBot, chatid, eventPoll){
  InnoSofterBot.sendPoll(chatid, eventPoll.question, eventPoll.options, is_anonymous=true)
}

function listAllEvents (InnoSofterBot, chatid, eventsList){
  var eventsString = "¡Muy buenas InnoSofters! En el día de hoy vamos a celebrar los siguientes eventos:\n"

  for (var i = 0; i < eventsList.length; i++){
    eventsString = eventsString + "- " + eventsList[i] + "\n"
  }
  InnoSofterBot.sendMessage(chatid,eventsString)  
}

require("dotenv").config()
const InnoSofterBot = launchTelegramChannelBot()
const {CHATID} = process.env

let event = {eventName: "Los viernes de la jungla.", eventDate: "10/12/2021", eventDuration: "2 días"}
//sendEvent(InnoSofterBot, event, CHATID)
let eventPoll = {question: "¿Qué te esta pareciendo el evento?", options: ["Estupendo","Maravilloso","Fantástico"]}
//sendEventPoll(InnoSofterBot, CHATID, eventPoll)
var eventsList = ["Comida con los abuelos", "Comida con mis padres", "Comida con la novia"]
//listAllEvents(InnoSofterBot, CHATID, eventsList)

