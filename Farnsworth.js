const Discord = require("discord.js");
const Ping = require("./ping");
const LFG = require("./lfg");
const Roles = require("./roles");
const client = new Discord.Client();

var lfgTimer; //setTimeout variable
var lfgMembers = []; //Array of User id

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("Good News Everyone!");
  //client.user.setActivity("Go Fuck Yourselves!!!");
});

client.on("message", (message) => {
	var commands = message.content.split(' ');
	
	//!ping: Basic test ping command
	if (message.content.startsWith("!ping")) {
		Ping.ping(message);
	}
	//!Roll <integer>: Rolls a x sided die
	else if(message.content.startsWith("!Roll")) {
		message.channel.send(Math.floor((Math.random() * parseInt(commands[1]) + 1)));
	}
	//!WhoAmI: Displays some user account information
	else if(message.content.startsWith("!WhoAmI"))
	{
		message.channel.send("User: " + message.author.username);
		message.channel.send("User ID: " + message.author.id);
		var date = new Date(message.author.createdTimestamp)
		message.channel.send("Created On: " + date.toString());
		message.channel.send("Bot: " + message.author.bot);
		message.channel.send("Tag: " + message.author.tag);
	}
	//!LFG <integer>: Starts looking for group with max of x people
	else if(message.content.startsWith("!LFG"))
	{	
		LFG.Start(message, client);
	}
	//!JoinUp Allows user to join current LFG
	else if(message.content.startsWith("!JoinUp"))
	{
		LFG.Join(message, client);
	}
	//!Subscribe Allows user to join game based roles
	else if(message.content.startsWith("!Subscribe"))
	{
		Roles.Subscribe(message, client, commands[1]);
	}
	//!Unsubscribe Allows user to leave game based roles
	else if(message.content.startsWith("!Unsubscribe"))
	{
		Roles.Unsubscribe(message, client, commands[1]);
	}
	
});

client.login("NDQwNjc2MDMwNDc1MTQxMTMz.DclLHw.D9YkxUOe2uEIqwkWf_0sTfxTnT0");