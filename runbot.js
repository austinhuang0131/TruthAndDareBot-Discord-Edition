
var Discord = require("discord.js")
var request = require("request")
var http = require('http')
var open = require('open')
var fs = require('fs')
var bot = new Discord.Client()

var truths = "API for Truths";
var dares = "API FOR Dares";
// To get my API message me on discord or Reddit and i'll give them to you.
var join = "To join press this url https://discordapp.com/oauth2/authorize?&client_id=174237165042008075&scope=bot and select your server !"
var help = "Truth and Dare is a popular game. How it's played is a player asks a Truth or a dare and gets from another person. To play it on the server call the bot with it's username and Truth next to it for Truth and Dare for a dare."
var info = "The TruthAndDareBot is made by @UnknownDeveloper and the API's that power this bot. The bot and the API's are licensed under the MIT License. For More information visit the GitHub page at this page https://github.com/TheRealUnknownDeveloper/TruthAndDareBot-Discord-Edition/"

bot.on("ready", function(msg){
  console.log("Woop! Bot logged in under the name of "+bot.user.name+" and the user ID of "+bot.user.id)
  fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.write('<h4 id="text2">Connected under the name of: ' + bot.user.name + ' '+ 'and the user id of ' + bot.user.id +  '</h1>');
        response.end();
    }).listen(8080, '127.0.0.1');
    open('http://127.0.0.1:8080')
});
})

bot.on("message", function(msg) {
  // if message starts with "something"
  msg.content = msg.content.toLowerCase()
  if(msg.content.indexOf("<@CLIENTID> truth") == 0){
    console.log("called");
    request(truths, function (error, response, body) {
      // Check for no error and a 200 okay response
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
        // Try to parse the json. If it errors it gets caught.
        var truthjson = JSON.parse(body);
        var randomtruth = truthjson[0]['Truth'];
        bot.reply(msg, randomtruth);
      } else {
        console.error(error);
        console.log(response);
      }
    });
    console.log("Replied");
  }

if(msg.content.indexOf("<@CLIENTID> dare") == 0){
  console.log("called");
  request(dares, function (error, response, body) {
    // Check for no error and a 200 okay response
    if (!error && response.statusCode == 200) {
      console.log(body); // Show the HTML for the Google homepage.
      // Try to parse the json. If it errors it gets caught.
      var darejson = JSON.parse(body);
      var randomdare = darejson[0]['Dare'];
      bot.reply(msg, randomdare);
    } else {
      console.error(error);
      console.log(response);
    }
  });
  console.log("Replied");
}
if(msg.content.indexOf("<@CLIENTID> join") == 0) {
        bot.reply(msg, join);
}

if(msg.content.indexOf("<@CLIENTID> info") == 0) {
        bot.reply(msg, info);
}

if(message.content.indexOf("<@CLIENTID> help") == 0) {
        bot.reply(message, help);
}

});

bot.loginWithToken("Token");
