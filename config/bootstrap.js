/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  path = require('path');
  fs = require('fs');
  CronJob = require('cron').CronJob;
  variables = sails.config.variables;
  chats = [];
  externalIp = '';

  const TelegramBot = require('node-telegram-bot-api');

  // replace the value below with the Telegram token you receive from @BotFather
  const token = variables.telegramBot;
  
  // Create a bot that uses 'polling' to fetch new updates
  bot = new TelegramBot(token, {polling: true});
  
  // Matches "/echo [whatever]"
  bot.onText(/\/start/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    chatId = msg.chat.id;
    // var resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, 'Enter password');
  });
  
  bot.onText(new RegExp(variables.passFromTelegram), (msg) => {
    chatId = msg.chat.id;
    var message = 'You successfully authorized' + ((externalIp) ? ('\r\nYour external ip: ' + ip) : '')
    bot.sendMessage(chatId, message);
    chats.push(chatId);
  })


  process.on('uncaughtException', function (error) {
    console.log('error');
  });

  cb();
};
