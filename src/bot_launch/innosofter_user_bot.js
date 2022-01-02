require("dotenv").config({path: "../.env"})
const axios = require('axios');
const express = require('express');
const router = express.Router();

function lauchTelegramUserBot() {
    const { Telegraf } = require("telegraf")

    telegramUserBotCommands = require("./commands/innosofter_user_bot.js")

    const { TELEGRAM_USERBOT } = process.env
    const bot = new Telegraf(TELEGRAM_USERBOT)

    bot.start(telegramUserBotCommands.startCommand)
    bot.help(telegramUserBotCommands.helpCommand)
    bot.command("about", telegramUserBotCommands.aboutCommand)
    bot.command("getEvents", telegramUserBotCommands.getEventsCommand)
    bot.command("commands", telegramUserBotCommands.commandsCommand)
    bot.action("help", telegramUserBotCommands.helpCommand)
    bot.action("start", telegramUserBotCommands.startCommand)
    bot.action("getEvents", telegramUserBotCommands.getEventsCommand)
    bot.action("about", telegramUserBotCommands.aboutCommand)
    bot.action("disturb", (ctx) => ctx.reply("(╬ ಠ益ಠ)"))

    bot.launch()

    return true
}

module.exports = {lauchTelegramUserBot}