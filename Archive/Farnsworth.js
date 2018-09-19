const Discord = require("discord.js");
const Ping = require("./Ping");
const LFG = require("./LFG");
const client = new Discord.Client();

var lfgStarted = false; //Flag signifying whether LFG is being used
var lfgTimer; //setTimeout variable
var lfgMembers; //Array of User id

client.on("ready", () => {
  console.log("I am ready!");
  //client.user.setGame("with my code");
  client.user.setActivity("Good News Everyone!");
});

client.on("message", (message) => {
	var commands = message.content.split(' ');
	
	//!ping: Basic test ping command
	if (message.content.startsWith("ping")) {
		Ping.ping(message);
	}
	//!Roll <integer>: Rolls a x sided die
	else if(message.content.startsWith("!Roll")) {
		message.channel.send(Math.floor((Math.random() * parseInt(commands[1]) + 1)));
	}
	//!WhoAmI: Displays some user account information
	else if(message.content.startsWith("!WhoAmI"))
	{
		message.channel.send("User:" + message.author.username);
		message.channel.send("User ID:" + message.author.id);
		var date = new Date(message.author.createdTimestamp)
		message.channel.send("Created On:" + date.toString());
		message.channel.send("Bot:" + message.author.bot);
		message.channel.send("Tag:" + message.author.tag);
	}
	//!LFG <integer>: Starts looking for group with max of x people
	else if(message.content.startsWith("!LFG"))
	{
		var temp;
		temp = message.channel.id;
		
		if(!lfgStarted)
		{
			LFG.Start(message, client);
			lfgMembers = [message.author.id];
			message.channel.send("LFG Has been started!!! Please use !JoinUp to queue up.");
			lfgStarted = true;
			
			//Starts LFG Timer till timeout
			lfgTimer = client.setTimeout(function() {
				//Message to chat
				client.channels.get(temp).send("LFG has ended\n <@" + lfgMembers[1] + "> Y");
				//Resets timer
				clearTimeout(lfgTimer);
				//Resets LFG started flag
				lfgStarted = false;
				lfgMembers = [];
			}, 60000); //Millisecond countdown
		}
		else
		{
			//Message stating that LFG has already started
			message.channel.send("<@" + lfgMembers[0] + "> has already started LFG. Pleae use !JoinUp");
		}
	}
	//Allows user to join current LFG
	else if(message.content.startsWith("!JoinUp"))
	{
		LFG.Join(message, client);
		//Places user to last group spot
		lfgMembers.push(message.author.id);
		
		//Lists all users in the group
		client.channels.get(message.channel.id).send("<@" + lfgMembers[0] + ">'s Group Members");
		for(i = 0; i < lfgMembers.length; i++)
		{
			client.channels.get(message.channel.id).send("Member " + (i+1) + " <@" + lfgMembers[i] + ">" );
		}
	}
	
});

function lfgTimeout(channel)
{
	console.log("LFG TIMEOUT");
	client.on("ready", () => {
		console.log("LFG TIMEOUT");
		client.user.send("LFG Timeout");
	});
}

client.login("NDQwNjc2MDMwNDc1MTQxMTMz.DclLHw.D9YkxUOe2uEIqwkWf_0sTfxTnT0");