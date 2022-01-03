module.exports = (ctx) => {
  let msg = "¡Pulsa algún botón!"

  var options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: "Bienvenida",
                callback_data: "start"
            }],
            [{
              text: "Ayuda",
              callback_data: "help"
            }],
            [{
              text: "Eventos",
              callback_data: "getEvents"
            }],
            [{
              text: "Sobre nosotros",
              callback_data: "about"
            }],
        ],
    }),
  };

  ctx.reply(msg, options)
}