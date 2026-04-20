import express from "express";
import { webhookCallback } from "grammy";
import bot from "./bot.js";

const app = express();

app.use(express.json());

app.use(new RegExp(`^/tg-bot-webhook:${process.env.BOT_TOKEN}$`), webhookCallback(bot, "express"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
