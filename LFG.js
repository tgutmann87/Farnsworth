var lfgStarted = false; //Flag signifying whether LFG is being used
var lfgTimer; //setTimeout variable
var lfgGame = "General"; //Game for desired group
var lfgMembers = []; //Array of User id
var lfgUsernames = []; //Array of Usernames

module.exports = {
	Start: function(message, client)
	{
		console.log(lfgStarted);
		if(!lfgStarted)
		{
			var userList = "";
			//Saving current channel ID for future messages
			var temp = message.channel.id;
			
			//Initializing group arrays
			lfgMembers = [message.author.id];
			lfgUsernames = [message.author.username];
			
			//Clips game from the initial start command
			lfgGame = message.content.slice(5, message.content.length);
			
			message.channel.send("<@" + lfgMembers[0] + "> has started the Group Finder for " + lfgGame + "\nPlease use !JoinUp to queue up.");
			
			//Sets bot to group finding
			lfgStarted = true;
			
			//Starts LFG Timer till timeout
			lfgTimer = client.setTimeout(function() {
				for(i = 0; i < lfgUsernames.length; i++)
				{
					userList += lfgUsernames[i] + "\n" ;
				}
				//Message to chat
				client.channels.get(temp).send("LFG has ended <@" + lfgMembers[0] + ">");
				//Displays Group
				client.channels.get(message.channel.id).send({embed: {
					color: 3447003,
					author: {
					  name: "Farnsworth Group Finder\n",
					  icon_url: client.user.avatarURL
					},
					
					title: lfgGame + " Group Queue",
					
					fields: [
						{
							name: "Current Members: ",
							value: userList
						}
					]
					}
				})
				//Resets timer
				clearTimeout(lfgTimer);
				//Resets LFG started flag
				lfgStarted = false;
				lfgMembers = [];
			}, 1000*60*3); //Millisecond countdown (ms*sec*min)

		}
		else
		{
			//Message stating that LFG has already started
			message.channel.send("<@" + lfgMembers[0] + "> has already started LFG. Pleae use !JoinUp");
		}
	},

	Join: function(message, client)
	{
		var userList = "";
		
		if(!lfgStarted)
		{
			message.channel.send("LFG not activated! \nPlease use !LFG to start group finder");
		}
		else
		{
			//Places user to last group spot
			lfgMembers.push(message.author.id);
			lfgUsernames.push(message.author.username);
			
			for(i = 0; i < lfgUsernames.length; i++)
			{
				userList += lfgUsernames[i] + "\n" ;
			}
			
			//Lists all users in the group
			client.channels.get(message.channel.id).send({embed: {
				color: 3447003,
				author: {
				  name: "Farnsworth Group Finder\n",
				  icon_url: client.user.avatarURL
				},
				
				title: lfgGame + " Group Queue",
				
				fields: [
					{
						name: "Current Members: ",
						value: userList
					}
				]
				}
			})
		}
		
	}
};