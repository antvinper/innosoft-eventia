const dbConnect = require("./db");
const app = require("./server.js");
const tele_bot = require("./src/bot_launch/innosofter_user_bot")

const PORT = process.env.PORT || 3000;

dbConnect().then(
  async () => {
    const server = await app.listen(PORT, () => {
      console.log("Connection successfully established.");
    });
    tele_bot.lauchTelegramUserBot();
  },
  (err) => {
    console.log("Connection error: " + err);
  }
);