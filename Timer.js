var timerStart = false;
var timerLength = 1000*60*5;
var timerInterval = 1000*60*.5;
var discordTimer;
var periodicMsg;
var timerReason = "Default";
var timerEndDate = new Date("12/20/2018 10:11:56 AM");
var currentTime = new Date();


module.exports = {
	StartTimer: function(message, client)
	{
		if(timerStart == false)
		{
			timerStart = true;
			discordTimer = client.setTimeout(() => timeout(message, client), timerLength);
			periodicMsg = client.setInterval(() => interval(message, client), timerInterval);
		}
	}
}

function timeout(message, client)
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
	timerStart = false;
}

function interval(message, client)
{
	currentTime = new Date();
	
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
				value: timeConvert(timerEndDate - currentTime)
			}
		]
	}
	})
}

function timeConvert(time)
{
  var ms = time % 1000;
  time = (time - ms) / 1000;
  var secs = time % 60;
  time = (time - secs) / 60;
  var mins = time % 60;
  time = (time - mins) /60;
  var hrs = time % 60;
  time = (time - hrs) / 24;
  var days = time % 24;
 
  return days + " Days " + hrs + ':' + mins + ':' + secs + '.' + ms;
}