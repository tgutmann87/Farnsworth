const Discord = require("discord.js");
const Ping = require("./ping");
const LFG = require("./lfg");
const Roles = require("./roles");
//const Steam = require("./SteamInterface");
const Auth = require("../Auth");
const Information = require("./information");
const Vote = require("./vote");
const Timer = require("./timer");
const client = new Discord.Client();

var commandToken = "!";

client.on("ready", () => {
  console.log("I am ready!");
  //console.log(Steam.userStats());
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
		Information.Whoami(message, client);
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
	//!vote-question Allows a user to set the question for a vote
	else if(commands[0] == commandToken + "vote-question")
	{
		
	}
	//!vote-answer-add Allows the user to add answers for the voting question
	else if(commands[0] == commandToken + "vote-answer-add")
	{
	}
	//!vote-start Allows the user to start the vote as long as the question and answers have been set
	else if(commands[0] == commandToken + "vote-start")
	{
	}
	else if(commands[0] == commandToken + "timer-start")
	{
	}
	
});

client.login(Auth.getDiscordAPI());