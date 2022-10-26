const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();

const { TELEGRAM_API_KEY, TELEGRAM_CHAT_ID } = process.env;

(async () => {
  if (!TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID)
    return "There is no telegram API key specified.";

  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const { message, status } = await response.json();
  console.log("Got response from the Dog CEO Image API");

  if (status !== "success") {
    console.log("There was an error getting a new dog image!");
  }

  const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });
  bot.sendPhoto(TELEGRAM_CHAT_ID, message);
  console.log("Successfully sent dog image!");

  if (process.env.HEALTHCHECKS_URL) await fetch(process.env.HEALTHCHECKS_URL);
  console.log("All done!");
  process.exit();
})();
