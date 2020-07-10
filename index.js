const TelegramBot = require('node-telegram-bot-api');
const token = require('./token/token')
const dialogFlow = require('./dialogflow')
const youTube = require('./youtube')


const bot = new TelegramBot(token.token, { polling: true}); // se for por em producao usar web hook

bot.on('message', async function(msg) {
  const chatId = msg.chat.id;

  const dfResponse = await dialogFlow.sendMessage(chatId.toString(),  msg.text);

  let responseText = dfResponse.text;

  if (dfResponse.intent === "Músicas específicas"){
      console.log(dfResponse.fields.musico.stringValue)

    responseText = await youTube.searchVideoURL(responseText, dfResponse.fields.musico.stringValue)
  }
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, responseText);
});