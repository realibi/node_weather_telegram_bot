const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = '5594344103:AAEsjXT-pMoR6MbHQADSrej1gAYcnf1SPkQ';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const cityName = msg.text;

    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {q: cityName, units: 'metric'},
        headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': 'a99b73ccfemsh7595b311e7b21d8p17c8ddjsn40ff5748c5ee'
        }
    };

    const response = await axios.request(options);

    bot.sendMessage(chatId, `В ${msg.text} сейчас ${Math.round(response.data.main.temp)} градусов.`);
});
