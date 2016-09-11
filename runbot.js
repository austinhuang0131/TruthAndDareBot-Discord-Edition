var Discord = require("discord.js@8.1.0")
var request = require("request")
var fs = require('fs')
var bot = new Discord.Client({
  autoReconnect: true
})

// var token = 'TOKEN HERE'; 
var token = process.env['token'];


var truths = "TRUTHS API";
var dares = "DARES API";


var join = "To invite this bot click https://discordapp.com/oauth2/authorize?&client_id=174237165042008075&scope=bot and select your server !"
var help = "Truth and Dare is a popular game. How it's played is a player asks a Truth or a dare and gets from another person. To play it on the server call the bot with it's username and Truth next to it for Truth and Dare for a dare."
var info = "The TruthAndDareBot is made by @UnknownDeveloper that power this bot. The bot is licensed under the MIT License. For More information visit the GitHub page at this page https://github.com/TheRealUnknownDeveloper/TruthAndDareBot-Discord-Edition/"

bot.on("ready", function(msg) {
  console.log("Woop! Bot logged in under the name of " + bot.user.name + " and the user ID of " + bot.user.id)
})
bot.on("message", function(msg) {
  // if message starts with "something"
  msg.content = msg.content.toLowerCase()
  if (msg.content.indexOf("<@" + bot.user.id + "> truth") == 0) {
    console.log("called");
    request(truths, function(error, response, body) {
      // Check for no error and a 200 okay response
      if (!error && response.statusCode == 200) {
        console.log(body); 
        // Try to parse the json. If it errors it gets caught.
        var truthjson = JSON.parse(body);
        var randomtruth = truthjson[0]['Truth'];
        bot.reply(msg, randomtruth);
      } else {
        console.error(error);
        console.log(response);
      }
    });
  }
  if (msg.content.indexOf("<@" + bot.user.id + "> dare") == 0) {
    console.log("called");
    request(dares, function(error, response, body) {
      // Check for no error and a 200 okay response
      if (!error && response.statusCode == 200) {
        console.log(body); 
        // Try to parse the json. If it errors it gets caught.
        var darejson = JSON.parse(body);
        var randomdare = darejson[0]['Dare'];
        bot.reply(msg, randomdare);
      } else {
        console.error(error);
        console.log(response);
      }
    });
  }
  if (msg.content.indexOf("<@" + bot.user.id + "> join") == 0) {
    bot.reply(msg, join);
  }
  if (msg.content.indexOf("<@" + bot.user.id + "> info") == 0) {
    bot.reply(msg, info);
  }
  if (message.content.indexOf("<@" + bot.user.id + "> help") == 0) {
    bot.reply(message, help);
  }
});
bot.loginWithToken(token);
