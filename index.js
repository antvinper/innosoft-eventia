const dbConnect = require("./db");
const app = require("./server.js");
const tele_bot = require("./bot_launch/innosofter_user_bot")

const PORT = process.env.PORT || 3000;

dbConnect().then(
  async () => {
    const server = await app.listen(PORT, () => {
      console.log("Connection successfully established.");
    });
  },
  (err) => {
    console.log("Connection error: " + err);
  }
);

tele_bot.lauchTelegramUserBot();