var groups = ["PUBG", "ESO", "CS:GO", "Siege"];

module.exports = {
	Subscribe: function(message, client, arg)
	{
		for(var i = 0; i < groups.length; i++)
		{
			if(arg == groups[i])
			{
				message.member.addRole(message.guild.roles.find("name", groups[i])).catch(console.error);
				message.channel.send("You have now been added to " + message.guild.roles.find("name", groups[i]).toString());
			}
		}
	},
	
	Unsubscribe: function(message, client, arg)
	{
		for(var i = 0; i < groups.length; i++)
		{
			if(arg == groups[i])
			{
				message.member.removeRole(message.guild.roles.find("name", groups[i])).catch(console.error);
				message.channel.send("You have now been removed from " + message.guild.roles.find("name", groups[i]).toString());
			}
		}
	}

}