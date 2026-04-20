// // import dotenv from 'dotenv';

// import dotenv from 'dotenv';
// dotenv.config();

// import { Bot } from "grammy";

// const token = process.env.BOT_TOKEN;
// console.log("token:", token);

// const bot = new Bot(token);

// // Log all incoming updates
// bot.use(async (ctx, next) => {
//     console.log(
//         `Received update from ${ctx.from?.username || 'unknown'}: ${ctx.message?.text || 'non-text'
//         }`
//     );
//     await next();
// });

// bot.command("start", (ctx) => {
//     ctx.reply("welcome!");
// });

// bot.command("pin", (ctx) => ctx.reply("Pinning message..."));

// export default bot;

import { createHmac } from "crypto";

const SECRET = "1234567890testsupertest";

function anonId(tgId) {
    return createHmac("sha256", SECRET)
        .update(tgId)
        .digest("hex")
        .slice(0, 10);
}

console.log(anonId("8305698493"), "8f3a91c2b7");
// 🔥 Example output:
// 7327233582 → 