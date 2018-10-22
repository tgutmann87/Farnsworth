module.exports = {
	Whoami: function(message, client)
	{
		message.channel.send("User: " + message.author.username);
		message.channel.send("User ID: " + message.author.id);
		var date = new Date(message.author.createdTimestamp)
		message.channel.send("Created On: " + date.toString());
		message.channel.send("Bot: " + message.author.bot);
		message.channel.send("Tag: " + message.author.tag);
	}
}