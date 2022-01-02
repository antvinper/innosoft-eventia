const axios = require('axios');
const moment = require('moment');

module.exports = (ctx) => {

    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: "Ayuda",
                    callback_data: "help"
                }],
            ],
        }),
    };
    let msg = "¡Soy InnoHelper, uno de los bots oficiales de Eventia!\nPor favor, pulsa el siguiente botón para saber como interactuar conmigo."
    ctx.reply(msg,options)
    
}