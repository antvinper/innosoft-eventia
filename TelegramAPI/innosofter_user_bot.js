function lauchTelegramUserBot() {
    const { Telegraf } = require("telegraf")

    telegramUserBotCommands = require("./commands/innosofter_user_bot.js")

    const { TELEGRAM_TOKEN } = process.env
    const bot = new Telegraf(TELEGRAM_TOKEN)

    bot.start(telegramUserBotCommands.startCommand)
    bot.help(telegramUserBotCommands.helpCommand)
    bot.command("about", telegramUserBotCommands.aboutCommand)
    bot.on("sticker", (ctx) => ctx.reply("(╬ ಠ益ಠ)"))

    bot.launch()

    return bot
}

require("dotenv").config({path: "../.env"})
lauchTelegramUserBot()