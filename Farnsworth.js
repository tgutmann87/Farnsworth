const Discord = require("discord.js");
const Ping = require("./ping");
const LFG = require("./lfg");
const Roles = require("./roles");
const Auth = require("../Auth");
const client = new Discord.Client();

var commandToken = "!";

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("Good News Everyone!");
  //client.user.setActivity("Go Fuck Yourselves!!!");
});

client.on("message", (message) => {
	var commands = message.content.split(' ');
	commands[0] = commands[0].toLowerCase();
	
	//!ping: Basic test ping command
	if (commands[0] == commandToken + "ping") {
		Ping.ping(message);
	}
	//!Roll <integer>: Rolls a x sided die
	else if(commands[0] == commandToken + "roll") {
		message.channel.send("<@" + message.author.id + "> Rolled a: " + Math.floor((Math.random() * parseInt(commands[1]) + 1)));
	}
	//!WhoAmI: Displays some user account information
	else if(commands[0] == commandToken + "whoami")
	{
		message.channel.send("User: " + message.author.username);
		message.channel.send("User ID: " + message.author.id);
		var date = new Date(message.author.createdTimestamp)
		message.channel.send("Created On: " + date.toString());
		message.channel.send("Bot: " + message.author.bot);
		message.channel.send("Tag: " + message.author.tag);
	}
	//!LFG <integer>: Starts looking for group with max of x people
	else if(commands[0] == commandToken + "lfg")
	{	
		LFG.Start(message, client);
	}
	//!JoinUp Allows user to join current LFG
	else if(commands[0] == commandToken + "joinup")
	{
		LFG.Join(message, client);
	}
	//!Subscribe Allows user to join game based roles
	else if(commands[0] == commandToken + "subscribe")
	{
		Roles.Subscribe(message, client, commands[1]);
	}
	//!Unsubscribe Allows user to leave game based roles
	else if(commands[0] == commandToken + "unsubscribe")
	{
		Roles.Unsubscribe(message, client, commands[1]);
	}
	
});

client.login(Auth.getDiscordAPI());