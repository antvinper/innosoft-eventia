const axios = require('axios');
const moment = require('moment');

module.exports = (ctx) => {

    axios.get("http://localhost:3000/api/v1/peticionesPublicacion/")
        .then(response => {
            let events = "¡InnoSofter tengo buenas noticias! Puedes apuntarte a los siguientes eventos:\n"
            const lenEvents = events.length
            for(const element in response.data){
                const date1 = new Date(response.data[element].inicio)
                if (Date.now() >= date1){ //cambiar
                    const inicio = new Date(response.data[element].inicio)
                    const fin = new Date(response.data[element].fin)
                    const duracion = (fin - inicio) / (1000)
                    events = events + " - " + response.data[element].titulo + ", " + moment(response.data[element].inicio).locale("es").format('LLL')
                    + " con una duración de " + duracion + "\n"
                }
            }

            if (lenEvents == events.length){
                events = "¡Vaya! Parece que todavía no se han añadido nuevos eventos."
            }

            var options = {
                 reply_markup: JSON.stringify({
                      inline_keyboard: [
                          [{
                          text: "h",
                          callback_data: "help"
                          }]
                      ],
                }),
            };
            console.log('response', moment('2017-06-10T16:08:00').format('DD/MM/YYYY'))
            ctx.reply("events",options)
        }).catch(error => {
            console.log(error);
        });
    
}