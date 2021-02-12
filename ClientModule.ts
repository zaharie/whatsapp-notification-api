import server from "./config/server";
import Bot from "./models/Bot";
export const bot = new Bot();
export const initBot = () => {
    bot.init();
};
