var Discord = require("discord.js");
var request = require("request")

var truths = "API for Truths";
var dares = "API FOR Dares";
// To get my API message me on discord and i'll give them to you.
var join = "To join press this url https://discordapp.com/oauth2/authorize?&client_id=174237165042008075&scope=bot and select your server !"
var help = "Truth and Dare is a popular game. How it's played is a player asks a Truth or a dare and gets from another person. To play it on the server call the bot with it's username and Truth next to it for Truth and Dare for a dare."


var mybot = new Discord.Client();

mybot.on("message", function(message) {
  // if message starts with "something"
  if(message.content.indexOf("<@CLIENTID> Truth") == 0){
    console.log("called");
    request(truths, function (error, response, body) {
      // Check for no error and a 200 okay response
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
        // Try to parse the json. If it errors it gets caught.
        var truthjson = JSON.parse(body);
        try {
        } catch (e) {
          console.error(e);
          return;
        }
        var randomtruth = truthjson[0]['Truth'];
        mybot.reply(message, randomtruth);
      } else {
        console.error(error);
        console.log(response);
      }
    });
    console.log("Replied");
  }
});


mybot.on("message", function(message) {

if(message.content.indexOf("<@CLIENTID> Dare") == 0){
  console.log("called");
  request(dares, function (error, response, body) {
    // Check for no error and a 200 okay response
    if (!error && response.statusCode == 200) {
      console.log(body); // Show the HTML for the Google homepage.
      // Try to parse the json. If it errors it gets caught.
      var darejson = JSON.parse(body);
      try {
      } catch (e) {
        console.error(e);
        return;
      }
      var randomdare = darejson[0]['Dare'];
      mybot.reply(message, randomdare);
    } else {
      console.error(error);
      console.log(response);
    }
  });
  console.log("Replied");
}
});

mybot.on("message", function(message) {



mybot.on("message", function(message) {
if(message.content.indexOf("<@CLIENTID> Join") == 0) {
        mybot.reply(message, join);
    }
});


mybot.on("message", function(message) {
if(message.content.indexOf("<@CLIENTID> Help") == 0) {
        mybot.reply(message, help);
    }
});

// Always use the error callback.
mybot.loginWithToken("*TOKEN*", function(error) {
  if (error) {
    console.error(error);
    return;
  }
});
