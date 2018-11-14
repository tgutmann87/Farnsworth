var timerStart = false;
var timerLength = 1000*60*5;
var timerInterval = 1000*60*1;
var discordTimer;
var periodicMsg;
var timerReason = "Default";
var timerEndDate = new Date("12/20/2018 10:11:56 AM");
var currentTime = new Date();

module.exports = {
	Timer: function(message, client)
	{
		if(timerStart == false)
		{
			timerStart = true;
			discordTimer = client.setTimeout(timeout, timerLength);
			periodicMsg = client.setInterval();
		}
	}
}

function timeout()
{
	client.channels.get(message.channel.id).send({embed: {
	color: 3447003,
	author: {
	  name: "Farnsworth Countdown\n",
	  icon_url: client.user.avatarURL
	},
	
	title: "Countdown Complete!!!"
	
	}
	})
	
	clearTimeout(discordTimer);
	clearInterval(periodicMsg);
	timerStart(false);
}

function interval()
{
	client.channels.get(message.channel.id).send({embed: {
	color: 3447003,
	author: {
	  name: "Farnsworth Countdown\n",
	  icon_url: client.user.avatarURL
	},

	title: "Countdown until: ",

		fields: [
			{
				name: "Time Left: ",
				value: timerEndDate - currentTime;
			}
		]
	}
	})
}