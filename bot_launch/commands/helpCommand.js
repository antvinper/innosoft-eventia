module.exports = (ctx) => {
  let msg = "Puedes interactuar conmigo usando botones como los que ves abajo ⬇️ o usando los siguientes comandos:\n -/start Manda el mensaje de bienvenida." + 
  "\n -/help Muestra el mensaje actual de ayuda.\n -/commands Muestra todos los ccomandos actuales en formato de botón.\n " +
  "-/getEvents Envía todos los futuros eventos de las Jornadas InnoSoft desde Eventbrite.\n -/about Habla del origen del bot y sus creadores."

  var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: "Molestar",
                callback_data: "disturb"
            }],
        ],
    }),
  };

  ctx.reply(msg, options)
}